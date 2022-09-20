@echo off
set CODE=../sanguo
set FGUI=./
cd ./
set CUR=%cd%
%CUR%/tool/publish.exe --type 1 --code %CODE% --fgui %FGUI%
pause