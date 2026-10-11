# 《Fly / 飞》UI 美术关键词与生成提示词

> 视觉方向基于项目原有 UI 规范，并结合后续参考图对方向进行收束。
>
> 核心关系：**Swiss Grid × 儿童梦境手绘**。
>
> UI 是第一视觉主体；背景插画退居第二层。Y2K、Glitch、New
> Ugly、斜切和玻璃感都作为辅助语言，而不是主视觉。

------------------------------------------------------------------------

## 1. 核心美术方向

### 1.1 总体关键词

-   Swiss International Typographic Style
-   Swiss Grid
-   Editorial Graphic Design
-   Experimental Typography
-   Oversized Sans Serif
-   Asymmetrical Layout
-   Flat Graphic UI
-   Children's Watercolor Doodle
-   Refined Hand-drawn Illustration
-   Hand-drawn Imperfection
-   Controlled New Ugly
-   Subtle Glitch
-   Quiet Melancholic Dream
-   Warm Paper White
-   Cobalt Blue
-   Sunny Yellow
-   Pale Cyan
-   Soft Lavender
-   Generous Negative Space
-   Modular Information System

### 1.2 核心气质

整体气质应当：

-   安静
-   伤感
-   宁静
-   文学性
-   梦幻
-   怀旧
-   温柔
-   稍微古怪
-   高度设计化

视觉上不要像传统「游戏 UI」，而更像：

> **一本精心设计的艺术书 + 一张实验性的瑞士平面设计海报 +
> 一本被珍藏起来的儿童梦境涂鸦本。**

原项目规范中已经确定：整体气质以「伤感、宁静、文学性」为优先；地面偏怀旧温柔，太空/梦境偏梦幻空灵；两种场景使用同一套
UI 骨架，仅替换颜色和材质。

------------------------------------------------------------------------

# 2. 最重要的视觉关系

## 2.1 UI 与背景必须分层

### UI

负责：

-   平面设计感
-   瑞士网格
-   排版
-   信息层级
-   菜单
-   标题
-   几何结构
-   Glitch
-   New Ugly

### 背景

负责：

-   梦境
-   情绪
-   手绘感
-   水彩
-   童真
-   怀旧
-   空气感

二者形成有意识的视觉冲突：

> **理性、冷静、精确的平面设计**
>
> ×
>
> **柔软、天真、手工感的梦境绘画**

不要让背景和 UI 使用同一种设计语言。

------------------------------------------------------------------------

# 3. 背景绘画关键词

## 3.1 背景 Prompt

``` text
Background illustration:
delicate children's watercolor painting,
refined childlike doodle aesthetic,
hand-painted paper texture,
soft watercolor washes,
colored pencil details,
crayon-like marks,
ink sketch outlines,
imperfect hand-drawn lines,
small spontaneous doodles,
tiny stars,
clouds,
sun,
paper airplane,
flight trails,
distant landscape,
simple architectural silhouettes,
dreamlike sky,
soft pastel blue,
pale yellow,
warm white,
faded lavender,
light cyan.

The drawing should feel like:
a child carefully drawing a dream,
but illustrated by a highly skilled artist.

Naive but sophisticated.
Simple but extremely refined.
Handmade but art-directed.

Visible paper grain,
slightly uneven pigment,
watercolor bleeding,
subtle dry-brush texture,
occasional pencil construction lines,
tiny imperfect marks,
soft faded edges.

No photorealism.
No detailed concept-art rendering.
No cinematic matte painting.
No hyper-realistic clouds.
No 3D objects.

The background should remain quiet and airy,
leaving large areas of negative space for graphic UI elements.
```

## 3.2 背景的核心原则

最重要的一句话：

> **A child carefully drawing a dream, but illustrated by a highly
> skilled artist.**

即：

**像小朋友画的梦，但实际上由非常成熟的画师完成。**

避免：

-   过度精细的概念艺术
-   电影感场景
-   写实天空
-   3D
-   厚重的奇幻场景
-   过于饱和的二次元背景

应该保留：

-   纸张颗粒
-   水彩晕染
-   铅笔线
-   蜡笔痕迹
-   不完全均匀的颜料
-   手绘辅助线
-   小朋友式的星星、太阳、飞机、云朵等符号

------------------------------------------------------------------------

# 4. Swiss Grid

## 4.1 网格关键词

不要只写 `Swiss grid`，应明确：

``` text
A highly structured Swiss grid system:
12-column modular grid,
consistent outer margins,
strict vertical alignment,
strong baseline alignment,
repeating horizontal guides,
modular spacing units,
clear content zones,
large negative space,
precise typographic alignment.

Some elements may intentionally break the grid,
but only one or two elements should violate the system,
creating controlled tension.

The composition should feel mathematically organized
while still retaining a handmade emotional quality.
```

## 4.2 推荐结构

-   画布：1920 × 1080
-   12-column modular grid
-   明确外边距
-   明确基线系统
-   水平 / 垂直辅助线
-   大量留白
-   内容模块严格对齐
-   信息块优先服从网格
-   标题可以突破网格
-   手绘元素可以少量穿过网格

### 核心比例

> **90% 遵守网格，10% 故意破坏网格。**

这样既能获得 Swiss Grid 的理性，又不会失去 New Ugly 的实验感。

------------------------------------------------------------------------

# 5. UI 核心设计语言

## 5.1 UI Prompt

``` text
UI design:
Swiss International Typographic Style,
strict Swiss grid,
modular grid system,
editorial layout,
asymmetrical composition,
large negative space,
strong horizontal and vertical axes,
thin technical rules,
modular information panels,
small captions,
micro typography,
scene numbering,
coordinate labels,
technical annotations,
editorial metadata,
index-like information,
diagrammatic elements,
registration marks,
crop marks,
small crosses,
measurement lines,
thin borders,
minimal geometric symbols.

The UI should feel printed and physical,
not like a digital game interface.

Flat graphic design.
2D graphic construction.
Paper-like visual language.
Strong hierarchy.
Clear typography.
Controlled visual density.
```

## 5.2 UI 应该像什么

应该像：

-   实验性平面设计海报
-   当代艺术书
-   编辑设计
-   瑞士国际主义平面设计
-   游戏视觉小说的章节设计
-   印刷品
-   设计工作室的视觉识别系统

而不是：

-   科幻 HUD
-   Cyberpunk Dashboard
-   Neon Game UI
-   FPS 游戏界面
-   未来主义仪表盘
-   Glassmorphism App

------------------------------------------------------------------------

# 6. 标题「飞」

标题是整个作品最大的排版时刻。

原规范要求主标题只使用一个字「飞」，并将 `Fly`
放在右下角作为点缀；标题界面同时是 Glitch 的爆发点之一。

## 6.1 标题 Prompt

``` text
Title typography:
the Chinese character “飞” is the primary graphic object.

Use a bold contemporary sans-serif Chinese typeface,
not serif.

The title is NOT centered.

Place it asymmetrically within the Swiss grid,
preferably occupying a large portion of the left or upper-left composition.

The character may be extremely oversized,
partially cropped by the edges of the canvas,
or divided across grid modules.

Experimental editorial typography.

The character should feel like a graphic poster element,
not a conventional game logo.

Use:
oversized typography,
cropped typography,
hard geometric cuts,
slight offset,
layered typography,
partial transparency,
subtle misregistration,
small typographic fragments,
controlled RGB separation,
tiny glitch slices,
and occasional interruption by grid lines.

The title should remain extremely readable.

“Fly” should appear as a small secondary typographic element,
placed away from the center,
preferably near the lower-right edge of the Chinese title.

“Fly” should be small,
quiet,
spaced-out,
editorial,
and subordinate to “飞”.
```

## 6.2 标题构图原则

不要：

-   居中
-   做成 Logo
-   做成奇幻游戏标题
-   使用书法字体
-   使用衬线字体
-   3D
-   金属质感
-   发光 Logo
-   霓虹字

应该：

-   超大
-   偏置
-   裁切
-   压出画面
-   与网格发生关系
-   像海报中的巨大平面元素
-   具有实验性的排版结构

------------------------------------------------------------------------

# 7. 标题 Negative Prompt

``` text
NO centered title
NO fantasy logo
NO ornamental Chinese calligraphy
NO serif Chinese typography
NO glowing game logo
NO 3D text
NO metallic text
NO neon text
NO chrome effect
NO cyberpunk typography
NO conventional anime game logo
NO circular logo composition
```

------------------------------------------------------------------------

# 8. 菜单 UI

菜单不要做成传统「按钮」。

## 8.1 菜单 Prompt

``` text
Menu design:
minimal editorial navigation system.

Three or four horizontal menu items:
开始游戏
设置
退出游戏

Each option is a flat geometric typographic module.

No rounded rectangular buttons.

Use:
asymmetric clipped rectangles,
thin outlines,
solid color bars,
small triangular indicators,
thin left-edge accent lines,
small option numbers,
micro labels,
grid-aligned text.

Selected state:
a strong flat accent color,
slightly brighter typography,
simple geometric indicator.

Hover state:
small movement,
line extension,
color shift,
or offset,
not a large glow effect.

Pressed state:
brief compression,
offset,
or glitch displacement.

The menu should look like
an experimental editorial navigation system,
not a conventional game menu.
```

## 8.2 菜单视觉原则

优先级：

1.  平面构成
2.  字体
3.  对齐
4.  色块
5.  线条
6.  微小动效
7.  材质

而不是：

1.  玻璃
2.  发光
3.  阴影
4.  渐变

------------------------------------------------------------------------

# 9. 斜切与玻璃材质

原始规范已经确定：

> **斜切造型 + 半透明玻璃材质 + 切口处发光。**

但在目前进一步的视觉方向中，应当降低「玻璃」的存在感。

建议：

-   保留斜切
-   保留半透明
-   保留极细发光边
-   保留局部材质变化
-   但整体仍然必须是 Flat Graphic Design

即：

> **平面构成 \> 材质效果。**

玻璃不能让 UI 变成 Glassmorphism。

------------------------------------------------------------------------

# 10. 色彩系统

## 10.1 基础色

``` text
Warm Paper White
#F4F1E8

Soft Off-White
#FAF9F4

Graphite Black
#20242A
```

## 10.2 UI 主色

``` text
Deep Cobalt Blue
#1749D1

Soft Sky Blue
#8DB9E8

Pale Cyan
#C8E6EA
```

## 10.3 手绘背景

``` text
Sunny Pale Yellow
#F5D56A

Warm Cream
#F7E8B0

Faded Lavender
#C7BDE5

Dusty Blue
#8EABD0
```

## 10.4 Glitch 色

Glitch 不使用完整 RGB 彩虹。

主要使用：

``` text
Cobalt Blue
+
Pale Cyan
+
Warm Yellow
```

整体形成：

> **蓝 × 黄**

的核心视觉关系。

紫色只作为非常轻的梦境辅助色。

------------------------------------------------------------------------

# 11. Glitch

Glitch 是辅助语言，不是整个 UI 的主视觉。

## 11.1 Glitch Prompt

``` text
Glitch aesthetic:
extremely subtle,
editorial,
print-like,
controlled,
rare.

Use:
small horizontal displacement,
tiny RGB misregistration,
single-line offsets,
broken typography,
small rectangular fragments,
scanline texture,
slight image tearing,
misaligned registration marks,
tiny pixel fragments.

Glitch should feel like:
a printed page slightly misregistered,
or a memory momentarily breaking apart.

It should NOT feel like:
cyberpunk,
hacking,
digital corruption,
VHS horror,
aggressive gaming effects.

Glitch intensity:
5–10% of the composition.

Most of the interface remains perfectly clean.
```

## 11.2 Glitch 规则

日常 UI：

-   几乎没有 Glitch
-   只保留微小错位
-   不影响文字阅读

标题：

-   可以明显增加 Glitch
-   可以出现断裂
-   可以出现 RGB 偏移
-   可以出现排版撕裂

转场：

-   可以成为 Glitch 爆发点

菜单：

-   可以出现短暂错位

对话：

-   不应干扰阅读

------------------------------------------------------------------------

# 12. New Ugly

## 12.1 Prompt

``` text
Controlled New Ugly graphic design.

Introduce only a few deliberate imperfections:
one element slightly outside the grid,
one oversized cropped label,
one awkwardly placed technical annotation,
slightly imperfect registration,
a handwritten mark crossing a clean geometric element,
a small asymmetrical offset.

The imperfection must feel intentional,
art-directed,
and editorial.

Do not create visual chaos.
Do not randomly scatter elements.
Do not destroy hierarchy.
```

## 12.2 原则

New Ugly 不是「乱」。

而是：

> **设计得非常整齐，然后故意允许极少数东西不整齐。**

推荐：

-   1 个越界元素
-   1 个超大裁切元素
-   1 个手写标记
-   1 个轻微错位

足够。

------------------------------------------------------------------------

# 13. 信息设计

小字不能只是装饰。

尽量让它们成为世界观信息。

## 13.1 推荐信息

``` text
DEMO 01
SCENE 01
FLY / 001
VISUAL NOVEL
1920 × 1080
ARCHIVE / 01
COORD. 32.4°N 118.9°E
MEMORY / DREAM / FLIGHT
BOY / MOTHER
GROUND / SKY
TAKE OFF
RETURN
```

## 13.2 更具世界观的信息

``` text
FLIGHT LOG / 001
ALTITUDE / UNKNOWN
DISTANCE / UNKNOWN
MEMORY STATUS / FRAGMENTED
SCENE / 01
```

原则：

> **信息既是 UI，也是世界观。**

不要为了「看起来设计」而随机堆英文。

------------------------------------------------------------------------

# 14. 标题界面整体构图 Prompt

``` text
Composition:

16:9 widescreen,
1920 × 1080.

Strong asymmetrical Swiss editorial composition.

The left 40% of the frame is primarily graphic design:
oversized cropped Chinese typography,
menu system,
technical labels,
scene information,
grid lines,
micro typography.

The right 60% contains the quiet watercolor dream world:
soft sky,
clouds,
sunlight,
hand-drawn landscape,
paper airplane,
tiny stars,
subtle character silhouette.

The two worlds overlap slightly.

The UI must visually dominate the illustration.

Large areas of warm white negative space.

Use a clear modular grid.

Large black or deep blue typography
contrasts with delicate pastel watercolor.

Thin blue grid lines pass through the composition.

Some lines extend beyond the canvas.

Some typography is intentionally cropped.

A few hand-drawn marks cross the grid.

The composition should feel like
a contemporary graphic design poster
rather than a game screenshot.
```

------------------------------------------------------------------------

# 15. 《飞》标题界面完整生成 Prompt

``` text
Design a sophisticated title screen for an indie Japanese visual novel called “飞 / Fly”.

16:9, 1920×1080.

CORE ART DIRECTION:
Swiss International Typographic Style × experimental editorial graphic design × refined children's watercolor doodles × subtle Y2K glitch × controlled New Ugly.

The UI is the PRIMARY visual subject.
The illustration is SECONDARY.

Create a highly structured 12-column Swiss modular grid with strict alignment, generous margins, strong negative space, horizontal guides, thin technical rules, measurement marks, scene numbers, coordinates, micro typography and editorial metadata.

The title “飞” must NOT be centered.

Use an extremely large bold contemporary sans-serif Chinese typeface.
The character “飞” should occupy a large graphic area on the left side, partially cropped by the canvas and integrated into the grid.

Treat “飞” as an experimental poster graphic rather than a conventional game logo.

Use:
oversized typography,
cropped typography,
asymmetrical layout,
hard geometric cuts,
small typographic fragments,
subtle misregistration,
tiny glitch slices,
controlled blue offsets,
and minimal cyan/yellow registration errors.

“Fly” appears as a small secondary word near the lower-right of the Chinese title, with generous letter spacing.

Menu:
开始游戏 / 设置 / 退出游戏

The menu is a flat editorial navigation system.
No rounded buttons.
No conventional game UI.

Use thin outlined geometric modules,
slightly diagonal clipped edges,
small triangular indicators,
thin left accent bars,
small option numbers,
and a single cobalt-blue active state.

Background:
delicate children's watercolor illustration,
as if a child carefully painted a dream,
but executed by a highly skilled illustrator.

Soft paper texture,
watercolor bleeding,
colored pencil,
ink sketch,
crayon-like marks,
imperfect hand-drawn lines,
small stars,
clouds,
sun,
paper airplane,
soft distant landscape,
quiet dreamlike atmosphere.

The background should be pale,
airy,
nostalgic,
tender,
and slightly melancholic.

The background must NOT become cinematic concept art.
No photorealism.
No 3D.
No dramatic lighting.
No detailed fantasy environment.

The contrast should come from:
flat graphic UI versus soft handmade watercolor illustration.

GLITCH:
very subtle,
5–10% of the composition.
Small horizontal displacement,
tiny RGB misregistration,
broken lines,
slight typographic tearing,
small rectangular fragments,
print-registration errors.

The glitch should resemble
a beautifully printed poster slightly misregistered,
not cyberpunk digital corruption.

NEW UGLY:
only a few intentional imperfections.
One or two elements may deliberately break the grid.
Keep everything else extremely organized.

Overall mood:
quiet,
poetic,
melancholic,
nostalgic,
dreamlike,
tender,
slightly experimental,
highly art-directed.

It should feel like:
a contemporary Japanese art book,
an experimental Swiss graphic design poster,
and a child's beautifully preserved dream notebook.

NOT:
cyberpunk,
sci-fi HUD,
futuristic dashboard,
neon gaming interface,
glassmorphism,
3D UI,
photorealistic scenery,
centered logo,
serif Chinese typography,
ornamental calligraphy,
generic anime game menu,
excessive glow,
excessive gradients,
excessive glitch.
```

------------------------------------------------------------------------

# 16. 最终 Design DNA

如果后续继续制作：

-   标题
-   对话框
-   名字框
-   选项
-   转场
-   结局卡
-   暂停菜单

都应该共享下面这套视觉 DNA：

> **Swiss Grid**\
> **Editorial Typography**\
> **Oversized Sans Serif**\
> **Asymmetrical Layout**\
> **Flat Graphic UI**\
> **Warm Paper White**\
> **Cobalt Blue**\
> **Children's Watercolor Doodle**\
> **Hand-drawn Imperfection**\
> **Controlled New Ugly**\
> **Subtle Glitch**\
> **Quiet Melancholic Dream**

### 最核心的一句话

> **Swiss Grid × 儿童梦境手绘。**

Y2K、Glitch、斜切、半透明、发光都应该围绕这个核心服务，而不能反过来成为视觉主体。

------------------------------------------------------------------------

## 17. 一句话版 Prompt

如果模型只允许输入很短的提示词：

``` text
Swiss editorial graphic design × strict 12-column grid × oversized cropped sans-serif Chinese typography × asymmetrical flat UI × warm paper white × cobalt blue × refined children's watercolor doodles × delicate hand-drawn dreamscape × paper texture × controlled New Ugly × subtle print misregistration glitch × quiet melancholic Japanese visual novel art direction × generous negative space × experimental typography × highly art-directed, not cyberpunk, not HUD, not glassmorphism, not centered title.
```
