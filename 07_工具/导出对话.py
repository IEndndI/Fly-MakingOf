# 把 Claude Code 的原始对话记录（.jsonl）转成好读的 Markdown。
# 只保留「Endnd 说的话」和「AI 的回复」；工具调用只记一行「用了哪些工具」，工具输出、系统提示、思考过程全部去掉。
# 隐私：本机路径换成 ~，邮箱 / 手机号 / IP / 密钥自动打码。每段 AI 回复标上实际用的模型（Claude Opus / Sonnet / DeepSeek）。
# 输出到 _原始对话/（不上传；在这里删掉不要的段落，再把整理好的放进 05_对话节选/）。
#
# 用法：python 导出对话.py

import json, os, re, glob
from collections import Counter

ROOT = os.path.expanduser("~/.claude/projects")
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "_原始对话")

# 只导出和《飞》有关的会话：(文件夹前缀, 会话 id 前缀, 说明)
SESSIONS = [
    ("E--unity-DEMO1",             "a9b6576a", "Unity 学习与音频系统（国庆开工前）"),
    ("E--unity-DEMO1",             "c284df80", "连接 Unity MCP"),
    ("E--claudes-workspace",       "28156d6f", "《飞》UI 动态设计（动态分镜诞生）"),
    ("E--claudes-workspace",       "782214a6", "《飞》UI 动态设计（补）"),
    ("E--unity",                   "9db5af49", "Unity MCP 连接与文档"),
    ("E--unity",                   "c8a8d6cc", "Unity MCP 连接与文档（续）"),
    ("E--unity",                   "5e1f5ab9", "Unity MCP 连接与文档（续 2）"),
    ("E--unity-DEMO1",             "8855dea2", "新会话"),
    ("E--unity",                   "6a2e09ea", "移植进 Unity · 第一段"),
    ("C--Users-Administrator-AppData-Roaming-Claude-scratch", "08dc1ebd", "创作声明页重做"),
    ("E--unity",                   "79818576", "移植进 Unity · 第二段"),
    ("E--unity-DEMO1",             "8dc9a4ad", "DeepSeek 接手的一段"),
    ("E--unity",                   "81e0dec2", "移植进 Unity · 第三段"),
    ("E--unity--claude-Fly",       "9df8ad47", "宣传 PV 制作"),
    ("E--unity",                   "639a4b5b", "v1.0 收尾与发布"),
    ("E--unity",                   "4aa8e3c3", "v1.1、发布与过程公开"),
]

# 个人隐私词放在同目录的 隐私词.txt（不上传）：每行「要替换的词<Tab>替换成什么」
PRIVATE = []
_pw = os.path.join(os.path.dirname(os.path.abspath(__file__)), "隐私词.txt")
if os.path.exists(_pw):
    for _l in open(_pw, encoding="utf8"):
        if "\t" in _l and not _l.startswith("#"):
            PRIVATE.append(tuple(_l.rstrip("\n").split("\t", 1)))

MODEL_NAME = {"claude-opus-5-5": "Claude Opus 5.5", "claude-sonnet-5-5": "Claude Sonnet 5.5", "deepseek-flash": "DeepSeek"}

def clean(s):
    s = re.sub(r"<system-reminder>.*?</system-reminder>", "", s, flags=re.S)                    # 系统提示
    s = re.sub(r"<(command-[a-z]+|local-command-[a-z]+)>.*?</\1>", "", s, flags=re.S)            # 斜杠命令的内部信息
    s = re.sub(r"</?pasted_content[^>]*>", "", s)
    s = re.sub(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}", "[邮箱已隐去]", s)
    s = re.sub(r"(?<!\d)(\+?\d{1,3}[ -]?)?1[3-9]\d{9}(?!\d)", "[手机号已隐去]", s)              # 国内手机号
    s = re.sub(r"\+\d{2,3}[ -]?\d{8,12}", "[电话已隐去]", s)                                    # 带国际区号的号码
    s = re.sub(r"(?<![\d.])(?:\d{1,3}\.){3}\d{1,3}(?![\d.])", "[IP已隐去]", s)
    s = re.sub(r"(gh[pousr]_[A-Za-z0-9]{20,}|sk-[A-Za-z0-9_-]{20,}|Bearer\s+[A-Za-z0-9._-]{20,})", "[密钥已隐去]", s)
    for word, mask in PRIVATE:                                                                # 自己的隐私词（地点、端口等），见 隐私词.txt
        s = s.replace(word, mask)
    s = re.sub(r"[Cc]:[\\/]+Users[\\/]+[^\\/\s\"']+", "~", s)
    return s.strip()

def texts(content, role):
    if isinstance(content, str):
        return [clean(content)], []
    out, tools = [], []
    for b in content or []:
        t = b.get("type")
        if t == "text":
            out.append(clean(b.get("text", "")))
        elif t == "tool_use":
            tools.append(b.get("name", "?").replace("mcp__UnityMCP__", "Unity:").replace("mcp__Claude_Browser__", "浏览器:"))
        elif t == "image" and role == "user":
            out.append("〔图片〕")
    return [x for x in out if x], tools

def convert(path):
    turns, first_ts = [], None          # [role, [文字], Counter(工具), 模型]
    for line in open(path, encoding="utf8"):
        try:
            d = json.loads(line)
        except Exception:
            continue
        if d.get("type") not in ("user", "assistant") or d.get("isSidechain") or d.get("isMeta"):
            continue
        msg = d.get("message") or {}
        role = msg.get("role")
        ts, tl = texts(msg.get("content"), role)
        model = MODEL_NAME.get(msg.get("model"), "") if role == "assistant" else ""
        if role == "user":
            ts = [t for t in ts if not (t.startswith("<task-notification>") or "[SYSTEM NOTIFICATION" in t or t.startswith("[Request interrupted"))]   # 系统自动通知不是人说的
            if not ts:
                continue
            if any(t.startswith("This session is being continued") for t in ts):
                ts = ["〔上一段对话太长，这里自动压缩成了摘要，略〕"]
            first_ts = first_ts or d.get("timestamp")
        if not ts and not tl:
            continue
        if turns and turns[-1][0] == role and (role == "user" or not model or turns[-1][3] == model):
            turns[-1][1].extend(ts); turns[-1][2].update(tl)
            if model: turns[-1][3] = model
        else:
            turns.append([role, ts, Counter(tl), model])
    return first_ts, turns

# 去重：续接的会话会把前面的内容整段带进来；在前面的文件里已经出现过的段落跳过
SEEN = set()

def dedupe(turns):
    out = []
    for t in turns:
        key = (t[0], "\n".join(t[1]))
        if len(key[1]) > 12 and key in SEEN:
            continue
        SEEN.add(key); out.append(t)
    return out

def write(i, label, first_ts, turns):
    day = (first_ts or "0000-00-00")[:10]
    models = sorted({m for r, _, _, m in turns if m})
    name = os.path.join(OUT, f"{i:02d}_{day}_{label}.md")
    with open(name, "w", encoding="utf8") as f:
        f.write(f"# {label}\n\n日期：{day}　｜　模型：{'、'.join(models) or '—'}\n\n")
        f.write("> 由 Claude Code 原始记录转换：只保留双方的文字，工具输出已去掉；隐私信息已自动打码。\n\n")
        for role, ts, tl, model in turns:
            f.write("## Endnd\n\n" if role == "user" else f"## {model or 'AI'}\n\n")
            if ts:
                f.write("\n\n".join(ts) + "\n\n")
            if tl:
                f.write("〔用了工具：" + "、".join(f"{k} ×{v}" if v > 1 else k for k, v in tl.most_common()) + "〕\n\n")
    return name

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for i, (folder, sid, label) in enumerate(SESSIONS, 1):
        hits = [p for d in glob.glob(os.path.join(ROOT, folder + "*")) for p in glob.glob(os.path.join(d, sid + "*.jsonl"))]
        if not hits:
            print("找不到：", folder, sid); continue
        ts, turns = convert(hits[0])
        turns = dedupe(turns)
        if turns:
            print(os.path.basename(write(i, label, ts, turns)), len(turns), "段")
