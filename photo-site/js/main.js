// 簡單的篩選與 lightbox
document.addEventListener('DOMContentLoaded',function(){
  /* --- i18n --- */
  const translations = {
    zh: {
      'site.title':'Hama·Runi',
      'nav.home':'首頁', 'nav.gallery':'作品集', 'nav.about':'關於', 'nav.contact':'聯絡',
      'hero.title':'捕捉瞬間，訴說故事', 'hero.lead':'專業攝影，紀錄生活與情感。', 'hero.cta':'觀看作品',
      'intro.title':'最新專案','intro.desc':'這裡放置最新專案簡介或文章連結。',
      'footer.copy':'© 2025 Hama·Runi',
      'gallery.title':'作品集','filters.all':'全部','filters.portrait':'人像','filters.landscape':'風景','filters.wedding':'婚禮',
      'about.title':'關於我','about.p1':'我是專業攝影師，擅長人像、風景與紀實攝影。我的作品注重光影與情感，希望透過影像講述每個瞬間的故事。','about.p2':'服務範圍：個人寫真、婚禮紀錄、商業委託。歡迎透過聯絡頁面與我洽詢。',
      'contact.intro':'請填寫下方表單，我會盡快回覆你。為保護隱私，本站不直接顯示我的個人 Email 或電話。',
      'contact.name':'姓名','contact.email':'Email','contact.phone':'電話（選填）','contact.message':'訊息','contact.submit':'送出'
      ,
      'projects.1.title':'Nocturne Portraits','projects.1.desc':'一系列低調黑白人像，捕捉微妙情緒與光影。',
      'projects.2.title':'Luminous Horizons','projects.2.desc':'以細膩色調記錄寧靜風景，展現光線過渡之美。',
      'projects.3.title':'Whispered Vows','projects.3.desc':'婚禮紀實系列，聚焦真實情感與柔和瞬間。',
      'project.nocturne.title':'Nocturne Portraits','project.nocturne.desc':'一系列低調黑白人像，捕捉微妙情緒與光影。','project.nocturne.img1':'Nocturne — 1','project.nocturne.img2':'Nocturne — 2','project.nocturne.img3':'Nocturne — 3',
      'project.luminous.title':'Luminous Horizons','project.luminous.desc':'以細膩色調記錄寧靜風景，展現光線過渡之美。','project.luminous.img1':'Luminous — 1','project.luminous.img2':'Luminous — 2','project.luminous.img3':'Luminous — 3',
      'project.whispered.title':'Whispered Vows','project.whispered.desc':'婚禮紀實系列，聚焦真實情感與柔和瞬間。','project.whispered.img1':'Whispered — 1','project.whispered.img2':'Whispered — 2','project.whispered.img3':'Whispered — 3',
      'project.viewRelated':'查看相關作品'
    },
    en: {
      'site.title':'Hama·Runi',
      'nav.home':'Home','nav.gallery':'Gallery','nav.about':'About','nav.contact':'Contact',
      'hero.title':'Capture moments, tell stories','hero.lead':'Professional photography that preserves life and emotion.','hero.cta':'View Work',
      'intro.title':'Latest Projects','intro.desc':'Short intro or links to recent projects go here.',
      'footer.copy':'© 2025 Hama·Runi',
      'gallery.title':'Gallery','filters.all':'All','filters.portrait':'Portrait','filters.landscape':'Landscape','filters.wedding':'Wedding',
      'about.title':'About Me','about.p1':'I am a professional photographer specializing in portraits, landscapes and documentary photography. My work focuses on light, shadow and emotion, telling stories through images.','about.p2':'Services: portraits, wedding coverage, commercial assignments. Please contact me via the contact page.',
      'contact.intro':'Please fill out the form below and I will get back to you shortly. For privacy, contact details are not displayed publicly.',
      'contact.name':'Name','contact.email':'Email','contact.phone':'Phone (optional)','contact.message':'Message','contact.submit':'Send'
      ,
      'projects.1.title':'Nocturne Portraits','projects.1.desc':'A series of muted black-and-white portraits capturing subtle emotion and sculpted light.',
      'projects.2.title':'Luminous Horizons','projects.2.desc':'A delicate landscape series that celebrates transitional light and serene vistas.',
      'projects.3.title':'Whispered Vows','projects.3.desc':'Documentary wedding series focusing on intimate moments and gentle storytelling.',
      'project.nocturne.title':'Nocturne Portraits','project.nocturne.desc':'A series of muted black-and-white portraits capturing subtle emotion and sculpted light.','project.nocturne.img1':'Nocturne — 1','project.nocturne.img2':'Nocturne — 2','project.nocturne.img3':'Nocturne — 3',
      'project.luminous.title':'Luminous Horizons','project.luminous.desc':'A delicate landscape series that celebrates transitional light and serene vistas.','project.luminous.img1':'Luminous — 1','project.luminous.img2':'Luminous — 2','project.luminous.img3':'Luminous — 3',
      'project.whispered.title':'Whispered Vows','project.whispered.desc':'Documentary wedding series focusing on intimate moments and gentle storytelling.','project.whispered.img1':'Whispered — 1','project.whispered.img2':'Whispered — 2','project.whispered.img3':'Whispered — 3',
      'project.viewRelated':'View related work'
    }
  };

  function applyLang(lang){
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      const key = el.getAttribute('data-i18n');
      const txt = translations[lang] && translations[lang][key];
      if(txt!==undefined) el.textContent = txt;
    });
    // update aria-pressed on buttons
    document.querySelectorAll('.lang-switch button').forEach(b=>{
      b.setAttribute('aria-pressed', b.getAttribute('data-lang')===lang ? 'true' : 'false');
    });
    localStorage.setItem('site-lang',lang);
  }

  // hero sequential fade-in
  function animateHeroSequence(){
    const items = document.querySelectorAll('.hero .fade-item');
    if(!items || items.length===0) return;
    items.forEach((el, i) => {
      el.classList.remove('in');
      // 調整：整體加速 0.6s（同時先前 +1s 已加入，現在把延遲整體往回調 600ms）
      // 使用 550*i + 550 作為延遲（更快顯示）
      setTimeout(()=> el.classList.add('in'), 550 * i + 550);
    });
  }

  // init language
  const saved = localStorage.getItem('site-lang');
  const navLang = (saved || (navigator.language && navigator.language.startsWith('zh')) ? 'zh' : 'en');
  applyLang(navLang);
  // run hero animation after language applied
  animateHeroSequence();
  document.querySelectorAll('.lang-switch button').forEach(b=>{
    b.addEventListener('click',()=>{ applyLang(b.getAttribute('data-lang')); animateHeroSequence(); });
  });

  // hero photo rotation (每 10 秒換圖)，使用現有本機圖片
  (function setupHeroRotation(){
    const heroImg = document.querySelector('.hero-photo img');
    if(!heroImg) return;
    const imgs = [
      'img/photo1.jpg', 'img/photo7.jpg', 'img/photo8.jpg', 'img/photo13.jpg', 'img/photo15.jpg'
    ];
    let idx = imgs.indexOf(heroImg.getAttribute('src'));
    if(idx < 0) idx = 0;
    let heroInterval = window._heroInterval;
    if(heroInterval) clearInterval(heroInterval);

    function nextImage(){
      heroImg.classList.add('fade-out');
      // 與 CSS 的 1s 過渡一致，等待 1s 再切換
      setTimeout(()=>{
        idx = (idx + 1) % imgs.length;
        heroImg.src = imgs[idx];
        // 等圖片載入一小段時間再顯示
        setTimeout(()=> heroImg.classList.remove('fade-out'), 200);
      }, 1000);
    }

    // 啟動輪播，每 10 秒
    window._heroInterval = setInterval(nextImage, 10000);
  })();

  // 如果 gallery.html 帶有 filter 參數，自動套用篩選
  try{
    const params = new URLSearchParams(window.location.search);
    const f = params.get('filter');
    if(f){
      // 找到對應的 filter button 並觸發 click
      const btn = Array.from(document.querySelectorAll('.filters button')).find(b=>b.getAttribute('data-filter')===f);
      if(btn) btn.click();
    }
  }catch(e){/* ignore for pages without query or DOM */}

  /* --- gallery filters & lightbox (原本功能) --- */
  const filters = document.querySelectorAll('.filters button');
  const items = document.querySelectorAll('.gallery-item');
  filters.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.getAttribute('data-filter');
      items.forEach(it=>{
        if(f==='*' || it.getAttribute('data-category')===f) it.style.display='flex'; else it.style.display='none';
      });
    });
  });

  // lightbox
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbCaption = document.getElementById('lb-caption');
  const lbClose = document.getElementById('lb-close');

  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const img = item.querySelector('img');
      lbImg.src = img.src;
      lbImg.alt = img.alt || '';
      const lang = localStorage.getItem('site-lang') || ((navigator.language && navigator.language.startsWith('zh')) ? 'zh' : 'en');
      // title from figcaption
      lbCaption.textContent = item.querySelector('figcaption')?.textContent || '';
      // metadata
      const date = item.getAttribute('data-date') || '';
      const location = (lang==='zh' ? item.getAttribute('data-location-zh') : item.getAttribute('data-location-en')) || item.getAttribute('data-location-zh') || '';
      const story = (lang==='zh' ? item.getAttribute('data-story-zh') : item.getAttribute('data-story-en')) || item.getAttribute('data-story-zh') || '';
      document.getElementById('lb-date').textContent = date;
      document.getElementById('lb-location').textContent = location;
      document.getElementById('lb-story').textContent = story;
      lb.setAttribute('aria-hidden','false');
    });
  });

  lbClose.addEventListener('click',()=>{ lb.setAttribute('aria-hidden','true'); lbImg.src=''; });
  lb.addEventListener('click',(e)=>{ if(e.target===lb) { lb.setAttribute('aria-hidden','true'); lbImg.src=''; } });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape') { lb.setAttribute('aria-hidden','true'); lbImg.src=''; } });
});