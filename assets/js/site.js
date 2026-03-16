function setActiveNav(){
  const links = document.querySelectorAll('.nav-link');
  const current = (location.pathname.split('/').pop() || 'index.html');
  links.forEach(a=>{
    const href = a.getAttribute('href');
    if((current === '' && href === 'index.html') || href === current || (current === 'index.html' && href === './')){
      a.classList.add('text-primary');
    }
  });
}

// Global helpers for responsive image filenames and srcset generation.
function makeSrcset(p){
  if(!p) return '';
  // Insert size suffix before the file extension: image.jpg -> image-480.jpg
  const extMatch = p.match(/(\.[a-z0-9]+)$/i);
  const ext = extMatch ? extMatch[1] : '';
  const base = ext ? p.slice(0, -ext.length) : p;
  return `${base}-480${ext} 480w, ${base}-768${ext} 768w, ${p} 1600w`;
}

function makeWebpSrcset(p){
  if(!p) return '';
  const extMatch = p.match(/(\.[a-z0-9]+)$/i);
  const ext = extMatch ? extMatch[1] : '';
  const base = ext ? p.slice(0, -ext.length) : p;
  return `${base}-480.webp 480w, ${base}-768.webp 768w, ${base}.webp 1600w`;
}

function eyImageFallback(e){ try{ e.target.onerror = null; e.target.src = 'assets/gallery/Slideshow.jpg'; }catch(_){} }

// heroSlideshow: homepage uses an Alpine-driven slideshow component declared inline in `index.html`.

function impact(){
  return { stats:[
    {label:'Learners assisted', value: '2,500+'},
    {label:'Events run', value: '120+'},
    {label:'Partners', value: '25+'},
    {label:'Volunteers', value: '80+'},
  ], init(){}}
}

function programsList(){
  return {
    programs:[],
    async loadPrograms(limit){
      try{
        const res = await fetch('data/programs.json');
        const data = await res.json();
        // Add responsive srcset for each program image (assumes resize script has been run)
        this.programs = (limit ? data.slice(0, limit) : data).map(p=>({
          ...p,
          imageSrcset: makeSrcset(p.image || '')
        }));
      }catch(e){
        // Fallback to avoid blank section
        this.programs = [
          {title:'Higher Education Support', slug:'higher-education-support', image:'assets/gallery/Centocow_1.jpg', imageSrcset: makeSrcset('assets/gallery/Centocow_1.jpg'), excerpt:'NSFAS/CAO/TVET application drives and priority assistance.', content:'We run application drives and guidance for NSFAS, CAO and TVET.'},
          {title:'Mental Health & Life Skills', slug:'mental-health-life-skills', image:'assets/gallery/Sweetwater (1).jpg', imageSrcset: makeSrcset('assets/gallery/Sweetwater (1).jpg'), excerpt:'Psychosocial support and life-skills workshops with partners.', content:'We partner to deliver psychosocial support and life-skills.'},
          {title:'Financial Literacy', slug:'financial-literacy', image:'assets/gallery/Slideshow.jpg', imageSrcset: makeSrcset('assets/gallery/Slideshow.jpg'), excerpt:'Avocado Vision partnership with certificates for youth.', content:'Budgeting, saving and entrepreneurship training.'},
          {title:'Career Expos & Partnerships', slug:'career-expos-partnerships', image:'assets/gallery/Slideshow (2).jpg', imageSrcset: makeSrcset('assets/gallery/Slideshow (2).jpg'), excerpt:'School outreach and expos with local colleges.', content:'We host expos and outreach with universities and colleges.'}
        ].slice(0, limit || 4);
      }
    }
  }
}

function newsList(){
  return {
    news:[],
    async loadNews(limit){
      try{
        const res = await fetch('data/news.json');
        const data = await res.json();
        this.news = (limit? data.slice(0,limit): data).sort((a,b)=> new Date(b.date)-new Date(a.date));
      }catch(e){
        // Fallback to avoid blank section
        this.news = [
          {title:'NSFAS Application Drive — Georgetown Library', slug:'nsfas-application-drive', date:'2025-11-08T09:00:00+02:00', excerpt:'Bring your documents.', content:'On-site support for NSFAS applications.', image:'assets/gallery/Centocow_1.jpg'},
          {title:'Youth Sports Day — Eastwood', slug:'youth-sports-day', date:'2025-12-02T10:00:00+02:00', excerpt:'Fun tournaments and team-building activities.', content:'Join us for football, netball and relays aimed at building teamwork and fitness.', image:'assets/gallery/Sweetwater (1).jpg'},
          {title:'Centocow Rural Outreach', slug:'centocow-rural-outreach', date:'2025-11-19T09:50:00+02:00', excerpt:'First-time outreach beyond uMgungundlovu District in deep rural Bulwer.', content:'Engaging with communities outside our usual reach reminded us of the importance of our work.', image:'assets/gallery/Centocow_2.jpg'},
          {title:'Fundraising Lunch', slug:'fundraising-lunch', date:'2026-03-20T12:00:00+02:00', excerpt:'Join us for a special fundraising lunch bringing the community together to support upcoming initiatives.', content:'Come and enjoy a wonderful lunch while supporting our community projects and initiatives. Your participation helps us continue making a difference.', image:'assets/gallery/Fundraising Lunch.jpg'},
        ].slice(0, limit || 3);
      }
    }
  }
}

// testimonialsSlider removed: not referenced in HTML. Keep functions minimal and only keep components
// that are referenced by the pages (heroSlideshow, programsList, newsList, timeline, partnersList,
// eventsList, galleryList, contactHours, impact). Removing unused components reduces bundle size
// and maintenance surface.

function timeline(){
  return {
    items:[
      {date:'2023', title:'Founded Empowering Youth', excerpt:'Started community-driven support for learners in Pietermaritzburg.'},
      {date:'2024', title:'First Career Expo', excerpt:'Hosted multi-school expo with local colleges and partners.'}
    ],
    load(){}
  }
}

function partnersList(){
  return {
    partners:[], async load(){
      try{
        const res = await fetch('data/partners.json');
        this.partners = await res.json();
      }catch(e){
        // Fallback to avoid blank section
        this.partners = [
          {name:'YMCA', logo:'https://placehold.co/160x48?text=YMCA', url:'https://www.facebook.com/profile.php/?id=100089673561864'},
          {name:'Msunduzi Youth', logo:'https://placehold.co/160x48?text=Msunduzi+Youth', url:'https://www.facebook.com/MsunduziYouthManagementCenter/'},
          {name:'LifeLine PMB', logo:'https://placehold.co/160x48?text=LifeLine+PMB', url:'https://lifelinesa.co.za/'},
          {name:'Africa Unite', logo:'https://placehold.co/160x48?text=Africa+Unite', url:'https://africaunite.org.za/'}
        ];
      }
    }
  }
}

function eventsList(){
  return {
    items:[], modal:false, active:{}, filter:'all', visibleCount:3, activeIndex:0,
    async load(){
      try{
        const res = await fetch('data/events.json');
        this.items = (await res.json()).sort((a,b)=> new Date(b.date)-new Date(a.date));
      }catch(e){
        // Fallback to local data to avoid empty page
        this.items = [
          {
            title:"Centocow Rural Outreach",
            slug:"centocow-rural-outreach",
            date:"2025-11-19T09:50:00+02:00",
            location:"Centocow, Bulwer (rural KZN)",
            category:"Education",
            excerpt:"First-time outreach beyond uMgungundlovu District in deep rural Bulwer.",
            content:"When we look back at this year, we see an incredible opportunity that came our way: the chance to work beyond the uMgungundlovu District. For the first time as an organisation, we travelled to Bulwer, deep in the rural areas. Engaging with communities outside our usual reach reminded us of the importance of our work and the impact we strive to make wherever we go.",
            image:"assets/gallery/Centocow_1.jpg"
          },
          {
            title:"Sweetwaters After-School Cross Night",
            slug:"sweetwaters-after-school-cross-night",
            date:"2025-11-15T20:42:00+02:00",
            location:"Sweetwaters",
            category:"Education",
            excerpt:"Fun, educational activities and capacity-building with Funda After School Program.",
            content:"We were honoured to be invited by Funda the After School Program for their final \"cross night\" session. We brought in fun, educational activities, hands-on learning and capacity-building exercises to help nurture and empower the students. Through interactive games, creative challenges and teamwork exercises, we encouraged students to think critically, engage deeply and grow together.",
            image:"assets/gallery/Sweetwater (1).jpg"
          }
        ];
      }
    },
    get filtered(){
      return this.filter==='all' ? this.items : this.items.filter(e=> e.category===this.filter);
    },
    get visibleEvents(){
      return this.filtered.slice(0, this.visibleCount);
    },
    loadMore(){
      this.visibleCount += 3;
    },
    open(e, idx=0){
      this.active = e;
      this.activeIndex = idx || 0;
      this.modal = true;
      // keyboard handlers for modal navigation
      this._evKey = (ev)=>{
        if(ev.key === 'Escape') this.close();
        if(ev.key === 'ArrowRight') this.next();
        if(ev.key === 'ArrowLeft') this.prev();
      };
      window.addEventListener('keydown', this._evKey);
    },
    close(){
      this.modal = false;
      if(this._evKey) window.removeEventListener('keydown', this._evKey);
    },
    next(){
      if(this.active && Array.isArray(this.active.images) && this.active.images.length){
        this.activeIndex = (this.activeIndex + 1) % this.active.images.length;
      }
    },
    prev(){
      if(this.active && Array.isArray(this.active.images) && this.active.images.length){
        this.activeIndex = (this.activeIndex - 1 + this.active.images.length) % this.active.images.length;
      }
    }
  }
}

function galleryList(){
  return {
    items:[], active:{}, modal:false, filter:'all', activeIndex:0,
    async load(){
      try{
        const res = await fetch('data/gallery.json');
        this.items = await res.json();
      }catch(e){
        // Fallback to avoid blank section
        this.items = [
          {src:'assets/gallery/Centocow_1.jpg', alt:'Centocow outreach', caption:'Centocow Rural Outreach', tag:'Outreach'},
          {src:'assets/gallery/Sweetwater (1).jpg', alt:'Sweetwaters event', caption:'Sweetwaters After-School Cross Night', tag:'Events'},
          {src:'assets/gallery/Slideshow.jpg', alt:'Slideshow highlight', caption:'Youth empowerment highlights', tag:'Highlights'},
          {src:'assets/gallery/Slideshow (2).jpg', alt:'Slideshow highlight', caption:'Community engagement', tag:'Highlights'}
        ];
      }
    },
    filtered(){ return this.filter==='all'? this.items : this.items.filter(g=> g.tag===this.filter); },
    open(img, idx){
      this.active = img;
      this.activeIndex = typeof idx === 'number' ? idx : (this.items.findIndex(i=> i.src === img.src) || 0);
      this.modal = true;
      this._opener = document.activeElement;
      setTimeout(()=>{
        const modalEl = document.querySelector('.ey-lightbox');
        if(modalEl) modalEl.focus();
      },50);
      this._handleKey = (e) => {
        if(e.key === 'Escape') this.close();
        if(e.key === 'ArrowRight') this.activeIndex = (this.activeIndex + 1) % this.items.length;
        if(e.key === 'ArrowLeft') this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length;
      };
      window.addEventListener('keydown', this._handleKey);
    },
    close(){
      this.modal = false;
      if(this._handleKey) window.removeEventListener('keydown', this._handleKey);
      if(this._opener && typeof this._opener.focus === 'function') this._opener.focus();
    },
    next(){ this.activeIndex = (this.activeIndex + 1) % this.items.length; },
    prev(){ this.activeIndex = (this.activeIndex - 1 + this.items.length) % this.items.length; }
  }
}

function contactHours(){
  return {
    openNow:false,
    init(){
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      this.openNow = day>=1 && day<=5 && hour>=9 && hour<16;
    }
  }
}

// Inject a newsletter modal globally (email only)
// Runtime form injection intentionally removed. Footer form markup in HTML is the canonical
// Netlify form and will be detected at build time. Avoid runtime DOM injection for build-time
// form providers.

document.addEventListener('alpine:init', () => {
  setActiveNav();
  // Footer forms are present in HTML and will be detected by Netlify at build-time.
});

// Ensure Alpine can find these functions even if evaluation timing differs.
if(typeof window !== 'undefined'){
  window.programsList = programsList;
  window.newsList = newsList;
  window.timeline = timeline;
  window.partnersList = partnersList;
  window.eventsList = eventsList;
  window.galleryList = galleryList;
  window.contactHours = contactHours;
  window.impact = impact;
  window.makeSrcset = makeSrcset;
  window.makeWebpSrcset = makeWebpSrcset;
  window.eyImageFallback = eyImageFallback;
}

