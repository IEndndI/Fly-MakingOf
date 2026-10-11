@echo off
chcp 65001 >nul
rem 双击启动分镜服务器，并在浏览器里打开分镜。
rem 导出到 Unity：在浏览器里按 F12 打开控制台，输入  await __fly.exp.trails()  回车。
rem 用完关掉这个黑窗口就行。
cd /d "%~dp0"
start "" "http://localhost:8931"
python fly_server.py 8931
pause
