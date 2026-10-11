# 文字的制作流程

按顺序看：

| 文件 | 是什么 | 谁 |
|---|---|---|
| p0 | 语音转文字的校对提示词 | Endnd 写给 DeepSeek |
| p1 | 语音转文字原稿：我口述出来的故事 | Endnd |
| p2 | 初稿：DeepSeek 把 p1 整理、校对后的版本（提示词里允许它酌情增补细节） | DeepSeek |
| p3 | 第二轮提示词：结构、场景、文字校对 | Endnd 写给 DeepSeek |
| p4 | 改稿：DeepSeek 按 p3 的要求提意见，我自己决定改哪些、留哪些，自己动手改 | Endnd |
| p5 | 文字部分 AI 占比的估算（DeepSeek 在对话里的自我估算） | DeepSeek |

旁支：`旁支_Claude版《滑翔》.md` 是更早让 Claude 按大纲写的一版，没有采用，没进入上面的流程。

最终进游戏的文字又改过一些，以游戏为准（游戏仓库 `Assets/Data/Fly.xlsx`）。
