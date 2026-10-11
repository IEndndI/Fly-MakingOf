"""飞 Fly 分镜的本地服务器：
- GET  照常提供分镜网页（index.html、sprites.js ...）
- POST /save?path=BG/room_base.png  把请求体（PNG）写进 Unity 项目的 Sprites/Fly 目录
- POST /save?path=Audio/bgm_room.wav  把 wav 写进 Unity 项目的 Resources/Audio/Fly（表格里写 Fly/bgm_room）

只监听 127.0.0.1，写入路径限制在 OUT_ROOT 之内。
用法：python fly_server.py 8931
"""
import http.server
import os
import sys
import urllib.parse

HERE = os.path.dirname(os.path.abspath(__file__))
SITE = os.path.normpath(os.path.join(HERE, "..", "飞 Fly 动态分镜"))
OUT_ROOT = os.path.normpath("E:/unity/DEMO1/Assets/Data/Resources/Sprites/Fly")
OUT_AUDIO = os.path.normpath("E:/unity/DEMO1/Assets/Data/Resources/Audio/Fly")
OUT_DATA = os.path.join(HERE, "out")


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE, **kwargs)

    def end_headers(self):
        # 分镜改得很勤：让浏览器每次刷新都重新取，不用旧缓存
        self.send_header("Cache-Control", "no-cache")
        super().end_headers()

    def do_POST(self):
        url = urllib.parse.urlparse(self.path)
        if url.path != "/save":
            self.send_error(404)
            return
        rel = urllib.parse.parse_qs(url.query).get("path", [""])[0]
        # .png → Unity 的 Sprites/Fly；.json / .webm（录下来的结尾动画）→ tools/out
        # _debug/ 开头的截图也放 tools/out，不进 Unity
        root = OUT_DATA if rel.startswith("_debug/") or not rel.lower().endswith(".png") else OUT_ROOT
        # .wav → Resources/Audio/Fly（去掉开头的 Audio/）
        if rel.lower().endswith(".wav"):
            root, rel = OUT_AUDIO, rel[len("Audio/"):] if rel.startswith("Audio/") else rel
        dest = os.path.normpath(os.path.join(root, rel))
        if not rel or not dest.startswith(root + os.sep) or not dest.lower().endswith((".png", ".json", ".wav", ".webm")):
            self.send_error(400, "bad path")
            return
        body = self.rfile.read(int(self.headers.get("Content-Length", 0)))
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        with open(dest, "wb") as f:
            f.write(body)
        self.send_response(200)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.end_headers()
        self.wfile.write(f"saved {rel} ({len(body)} bytes)".encode("utf-8"))


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8931
    print(f"serving {SITE} on http://127.0.0.1:{port}, saving PNGs to {OUT_ROOT}")
    http.server.ThreadingHTTPServer(("127.0.0.1", port), Handler).serve_forever()
