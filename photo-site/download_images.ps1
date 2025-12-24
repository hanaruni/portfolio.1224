# PowerShell script: 下載示例圖片到 img/ 目錄
# 使用方法（在 project 根目錄執行）：
#   .\download_images.ps1

$images = @(
    @{id=1011; file='photo1.jpg'},
    @{id=1025; file='photo2.jpg'},
    @{id=103;  file='photo3.jpg'},
    @{id=1021; file='photo4.jpg'},
    @{id=1003; file='photo5.jpg'},
    @{id=1005; file='photo6.jpg'},
    @{id=1015; file='photo7.jpg'},
    @{id=1020; file='photo8.jpg'},
    @{id=1043; file='photo9.jpg'},
    @{id=1050; file='photo10.jpg'},
    @{id=1069; file='photo11.jpg'},
    @{id=1074; file='photo12.jpg'},
    @{id=1084; file='photo13.jpg'},
    @{id=1080; file='photo14.jpg'},
    @{id=1081; file='photo15.jpg'}
)

$dest = Join-Path -Path $PSScriptRoot -ChildPath 'img'
if(-not (Test-Path $dest)) { New-Item -ItemType Directory -Path $dest | Out-Null }

foreach($img in $images){
    $url = "https://picsum.photos/id/$($img.id)/1200/800"
    $out = Join-Path $dest $img.file
    Write-Host "Downloading $url -> $out"
    try{
        Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing -ErrorAction Stop
    }catch{
        Write-Warning "Failed to download $url : $_"
    }
}

Write-Host "Done. Images saved to $dest"