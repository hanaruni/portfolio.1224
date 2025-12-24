攝影作品集 - 靜態範本

檔案位置：
- [photo-site/index.html](photo-site/index.html)
- [photo-site/gallery.html](photo-site/gallery.html)
- [photo-site/about.html](photo-site/about.html)
- [photo-site/contact.html](photo-site/contact.html)
- [photo-site/css/style.css](photo-site/css/style.css)
- [photo-site/js/main.js](photo-site/js/main.js)

快速開始：
1. 若要使用範例線上圖片，直接開啟 `photo-site/index.html` 即可（`gallery.html` 的示例圖預設會引用本機 `img/` 檔案；若尚未下載，頁面也會以線上預覽方式顯示）。
2. 若要離線使用，我已新增 `download_images.ps1`（PowerShell），會自動下載 15 張示例圖片到 `photo-site/img/`，下載後可在本機離線瀏覽。執行方式（在 `photo-site` 資料夾）：

```powershell
.\download_images.ps1
```

下載完成後，`gallery.html`、`index.html` 已指向 `img/photo1.jpg` ~ `img/photo15.jpg`，無需額外修改。

聯絡表單：
- 為保護隱私，本站不直接顯示個人 Email 或電話；`contact.html` 的表單目前使用 Formspree 佔位 endpoint：`https://formspree.io/f/your-form-id`。
- 請在部署前至你選擇的表單服務（例如 Formspree 或 FormSubmit）註冊並取得 endpoint，然後把 `contact.html` 中 `<form action="...">` 的 `your-form-id` 換成實際的 endpoint，這樣客戶送出的訊息才會送到你的信箱。

部署建議：
- 可把 `photo-site` 資料夾推到 GitHub Pages 或任何靜態網站主機；若使用 GitHub Pages，把此資料夾內容放到 repo 的 `gh-pages` 分支或 repos 的根目錄。

進階：
- 我可以幫你把遠端示例圖下載到 `photo-site/img/` 並自動更新 `gallery.html` 為本機檔案；或依你的風格替換配色/字體。
進階：
- 已加入簡潔小圖示（Home / Gallery / About / Contact）與首頁黑白代表照片，使用免費可嵌入的 SVG 圖示與 picsum 的示例圖；如需換成自訂圖示或下載本機照片，我可以協助。
 - 已建立三個專案詳情頁：
	 - `projects/nocturne.html`（Nocturne Portraits）
	 - `projects/luminous.html`（Luminous Horizons）
	 - `projects/whispered.html`（Whispered Vows）
	首頁的專案卡已連到對應詳情頁；每個詳情頁包含示例圖與「查看相關作品」連結（會導向 `gallery.html?filter=...`）。
