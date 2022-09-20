echo "开始处理..."

for /R %%i in (*.png) do (
  pngquant -f --ext .png --verbose 256 "%%i"
  pngquant -f --ext .png --verbose --speed=1 --ordered 256 "%%i"
)