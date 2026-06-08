/* ============================================================
   СОБ · Shell — sidebar + topbar (спільні для всіх сторінок)
   ============================================================ */

const ICON = {
  grid:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>',
  map:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14M15 6v14"/></svg>',
  school:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 9 4-9 4-9-4 9-4Z"/><path d="M5 9v5c0 1.7 3.1 3 7 3s7-1.3 7-3V9"/><path d="M21 7v6"/></svg>',
  chart:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 3v18h18"/><path d="M7 15l3-4 3 2 4-6"/></svg>',
  chat:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12Z"/></svg>',
  ai:      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="7" width="16" height="12" rx="3"/><path d="M12 7V4M9 14h.01M15 14h.01M2 11v3M22 11v3"/></svg>',
  trophy:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M9 18h6M12 14v4M8 21h8"/></svg>',
  doc:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5M9 13h6M9 17h6"/></svg>',
  calendar:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/></svg>',
  shield:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z"/><path d="m9.5 12 1.8 1.8L15 10"/></svg>',
  users:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0M16 5.5a3 3 0 0 1 0 5.8M20.5 20a5.5 5.5 0 0 0-4-5.3"/></svg>',
  search:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
  bell:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.5 21a2 2 0 0 0 3 0"/></svg>',
  chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m9 18 6-6-6-6"/></svg>',
  chevdown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>',
  menu:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
  arrowDn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
  phone:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>',
  mail:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg>',
  video:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/></svg>',
  lock:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
  alert:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>',
  siren:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M7 18v-5a5 5 0 0 1 10 0v5M5 21h14M12 3v2M4.2 6.2l1.4 1.4M19.8 6.2l-1.4 1.4"/></svg>',
  book:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Z"/><path d="M19 17H6a2 2 0 0 0-2 2"/></svg>',
  send:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m22 2-7 20-4-9-9-4 20-7Z"/></svg>',
  pin:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  clock:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  download:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0 4-4m-4 4-4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  filter:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 5h18l-7 8v6l-4 2v-8L3 5Z"/></svg>',
  image:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.8"/><path d="m21 16-5-5L5 21"/></svg>',
  upload:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 16V4m0 0 4 4m-4-4-4 4M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>',
  file:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/></svg>',
  folder:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7a2 2 0 0 1 2-2h4l2 2.5h8a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"/></svg>',
  gallery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/></svg>',
  settings:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H10a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V10a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></svg>',
  logout:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  plus:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>',
  edit:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"/></svg>',
  trash:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/></svg>',
  close:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>',
  check:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M20 6 9 17l-5-5"/></svg>',
  eye:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
  star:    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1L12 2Z"/></svg>',
  building:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>',
};
window.ICON = ICON;

/* Навігація залежно від ролі. lock=true → пункт лише для авторизованих ролей. */
const NAV_ALL = {
  dashboard:   { id: "dashboard",   label: "Оперативний центр",   icon: "grid",     href: "index.html" },
  map:         { id: "map",         label: "Карта закладів",      icon: "map",      href: "map.html" },
  schools:     { id: "schools",     label: "Заклади освіти",      icon: "school",   href: "schools.html" },
  workers:     { id: "workers",     label: "Працівники СОБ",      icon: "users",    href: "inspectors.html" },
  gallery:     { id: "gallery",     label: "Фотогалерея",         icon: "gallery",  href: "gallery.html" },
  analytics:   { id: "analytics",   label: "Аналітика",           icon: "chart",    href: "analytics.html" },
  incidents:   { id: "incidents",   label: "Інциденти",           icon: "alert",    href: "incidents.html" },
  assignments: { id: "assignments", label: "Доручення",           icon: "doc",      href: "assignments.html" },
  search:      { id: "search",      label: "Пошук",               icon: "search",   href: "search.html" },
  comm:        { id: "comm",        label: "Комунікаційний центр", icon: "chat",    href: "communication.html" },
  ai:          { id: "ai",          label: "AI-аналітик",         icon: "ai",       href: "assistant.html" },
  cabinet:     { id: "cabinet",     label: "Кабінет інспектора",  icon: "folder",   href: "cabinet.html" },
  admin:       { id: "admin",       label: "Адмін-панель",        icon: "settings", href: "admin.html" },
  monitoring:  { id: "monitoring",  label: "Моніторинг соцмереж", icon: "alert",    href: "monitoring.html" },
};

// які розділи бачить кожна роль (у заданому порядку)
const NAV_BY_ROLE = {
  public:     ["dashboard","schools","map","gallery","analytics","comm","search","ai"],
  leadership: ["dashboard","workers","schools","map","analytics","incidents","gallery","comm","search","ai"],
  inspector:  ["dashboard","cabinet","schools","map","incidents","assignments","analytics","gallery","comm","search","ai"],
  admin:      ["dashboard","admin","workers","schools","map","incidents","assignments","analytics","gallery","comm","search","ai"],
};

window.SOBShell = {
  render(opts) {
    const { active, crumb = [] } = opts;
    const o = window.SOB.org;
    const u = window.SOBAuth.current();
    const roleInfo = window.SOB.roles[u.role] || window.SOB.roles.public;

    const navIds = NAV_BY_ROLE[u.role] || NAV_BY_ROLE.public;
    const navHtml = navIds.map(id => {
      const n = NAV_ALL[id]; if(!n) return '';
      return `<a class="sb-item ${n.id === active ? 'active' : ''}" href="${n.href}">
        ${ICON[n.icon]}<span>${n.label}</span>
        ${n.badge ? `<span class="sb-badge">${n.badge}</span>` : ''}
      </a>`;
    }).join('');

    const crumbHtml = crumb.map((c, i) =>
      i === crumb.length - 1 ? `<b>${c}</b>` : `<span>${c}</span>${ICON.chevron}`).join('');

    /* period select — групуємо по роках через optgroup */
    const periodByYear = {};
    (o.periodOptions || []).forEach(p => {
      const yr = p.split(' ')[1];
      if (!periodByYear[yr]) periodByYear[yr] = [];
      periodByYear[yr].push(p);
    });
    const periodOpts = Object.entries(periodByYear).map(([yr, months]) =>
      `<optgroup label="── ${yr} ──">${months.map(p =>
        `<option${p === o.period ? ' selected' : ''}>${p}</option>`).join('')}</optgroup>`
    ).join('');

    const isGuest = u.role === 'public';
    const avBg = roleInfo.color;

    document.getElementById('shell').innerHTML = `
      <aside class="sidebar" id="sidebar">
        <a class="sb-brand" href="index.html">
          <div class="emblem"><img src="assets/sob-emblem.png" alt="СОБ"></div>
          <div class="bt"><b>${o.abbr}</b><span>${o.district}</span></div>
        </a>
        <div class="sb-scroll">
          <div class="sb-section">
            <div class="sb-label">Розділи</div>
            <nav class="sb-nav">${navHtml}</nav>
          </div>
          ${u.role==='leadership' || u.role==='admin' || u.role==='inspector' ? `
          <div class="sb-section">
            <div class="sb-label">Звітність</div>
            <nav class="sb-nav">
              <a class="sb-item ${active==='report'?'active':''}" href="report.html">${ICON.doc}<span>Детальний звіт</span></a>
            </nav>
          </div>` : ''}
        </div>
        <div class="sb-foot">
          <div class="sb-user" id="sbUser" title="${isGuest ? 'Увійти' : 'Профіль'}">
            <div class="av" style="background:${avBg}">${u.initials}</div>
            <div class="un">
              <b>${u.name}</b>
              <span class="role-chip" style="color:${roleInfo.color};background:${roleInfo.bg};padding:0;background:none">${roleInfo.label}</span>
            </div>
            <button class="lg" id="logoutBtn" title="${isGuest ? 'Увійти' : 'Вийти'}">${isGuest ? ICON.logout : ICON.logout}</button>
          </div>
        </div>
      </aside>
      <div class="scrim" id="scrim"></div>

      <div class="main">
        <header class="topbar">
          <button class="icon-btn menu-toggle" id="menuToggle" aria-label="Меню">${ICON.menu}</button>
          <div class="crumb">${crumbHtml}</div>
          <div class="spacer"></div>
          <label class="search-mini" style="cursor:text" onclick="if(event.target.tagName!=='INPUT')document.getElementById('globalSearch').focus()">${ICON.search}<input type="text" placeholder="Пошук по всій платформі…" id="globalSearch"></label>
          <button class="icon-btn mob-search-btn" id="mobSearchBtn" aria-label="Пошук" style="display:none">${ICON.search}</button>
          <div class="pill-select">${ICON.calendar}<select id="periodSelect">${periodOpts}</select></div>
          <button class="icon-btn" id="bellBtn" aria-label="Сповіщення" style="position:relative">${ICON.bell}<span class="dot" id="bellDot" style="display:none"></span></button>
          <div id="notifPanel" style="display:none;position:absolute;top:calc(100% + 8px);right:0;width:min(320px,calc(100vw - 32px));background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);z-index:9999;overflow:hidden"></div>
          ${isGuest ? `<a class="btn btn-primary btn-sm" href="login.html">${ICON.logout} Увійти</a>` : ''}
        </header>
        <!-- Mobile search overlay -->
        <div id="mobSearchOverlay" style="display:none;position:fixed;inset:0;background:rgba(7,18,40,.6);z-index:200;backdrop-filter:blur(4px)">
          <div style="background:var(--surface);padding:14px 16px;display:flex;gap:10px;align-items:center;box-shadow:var(--shadow)">
            <div style="flex:1;display:flex;align-items:center;gap:10px;background:var(--surface-2);border:1.5px solid var(--border-2);border-radius:var(--radius);padding:10px 14px">
              ${ICON.search}
              <input type="text" id="mobSearchInput" placeholder="Пошук…" style="border:none;background:none;outline:none;font-size:16px;font-family:inherit;width:100%;color:var(--text)">
            </div>
            <button id="mobSearchClose" style="font-size:20px;color:var(--muted);padding:4px 8px;font-weight:700">✕</button>
          </div>
          <div id="mobSearchResults" style="background:var(--surface);max-height:calc(100vh - 80px);overflow-y:auto"></div>
        </div>
        <main class="content" id="content"></main>
      </div>`;

    // mobile menu
    const sb = document.getElementById('sidebar');
    const scrim = document.getElementById('scrim');
    document.getElementById('menuToggle')?.addEventListener('click', () => { sb.classList.toggle('open'); scrim.classList.toggle('show'); });
    scrim?.addEventListener('click', () => { sb.classList.remove('open'); scrim.classList.remove('show'); });

    // show/hide mobile search button based on viewport
    function checkMobSearch() {
      const btn = document.getElementById('mobSearchBtn');
      if(btn) btn.style.display = window.innerWidth <= 900 ? 'grid' : 'none';
    }
    checkMobSearch();
    window.addEventListener('resize', checkMobSearch);

    // mobile search overlay logic
    function buildMobResults(q) {
      const lq = q.toLowerCase();
      if(!lq) return '';
      const ICON_SCH = ICON.school, ICON_ALT = ICON.alert, ICON_DOC = ICON.doc, ICON_INS = ICON.users;
      const row = (href, icon, color, title, sub) =>
        `<a href="${window.esc(href)}" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-bottom:1px solid var(--border);text-decoration:none;color:inherit">
          <span style="color:${color};width:20px;flex-shrink:0">${icon}</span>
          <div><div style="font-size:14px;font-weight:600">${window.esc(title)}</div><div style="font-size:12px;color:var(--muted)">${window.esc(sub)}</div></div>
        </a>`;
      let html = '';
      (window.SOB.schools||[]).filter(s=>(s.name||'').toLowerCase().includes(lq)||(s.city||'').toLowerCase().includes(lq)).slice(0,5)
        .forEach(s => { html += row(`school.html?id=${s.id}`, ICON_SCH, 'var(--blue-600)', s.name, s.city||''); });
      (window.SOB.incidents||[]).filter(x=>(x.title||'').toLowerCase().includes(lq)||(x.desc||'').toLowerCase().includes(lq)).slice(0,4)
        .forEach(x => { html += row('incidents.html', ICON_ALT, '#E84545', x.title||'Інцидент', (x.desc||'').slice(0,60)); });
      (window.SOB.assignments||[]).filter(x=>(x.title||'').toLowerCase().includes(lq)).slice(0,4)
        .forEach(x => { html += row('assignments.html', ICON_DOC, 'var(--blue-600)', x.title||'Доручення', ''); });
      Object.values(window.SOB.workers||{}).filter(ins=>(ins.name||'').toLowerCase().includes(lq)).slice(0,3)
        .forEach(ins => { html += row('admin.html', ICON_INS, 'var(--navy-800)', ins.name, ins.position||''); });
      if(!html) html = '<div style="padding:32px;text-align:center;color:var(--muted)">Нічого не знайдено</div>';
      else html += `<a href="search.html?q=${encodeURIComponent(q)}" style="display:block;padding:14px 16px;font-size:13.5px;font-weight:600;color:var(--blue-600);text-align:center">Показати всі результати →</a>`;
      return html;
    }

    const mobOverlay = document.getElementById('mobSearchOverlay');
    const mobInput   = document.getElementById('mobSearchInput');
    const mobResults = document.getElementById('mobSearchResults');
    document.getElementById('mobSearchBtn')?.addEventListener('click', () => {
      mobOverlay.style.display = 'block';
      setTimeout(() => mobInput?.focus(), 50);
    });
    document.getElementById('mobSearchClose')?.addEventListener('click', () => { mobOverlay.style.display = 'none'; });
    mobOverlay?.addEventListener('click', e => { if(e.target === mobOverlay) mobOverlay.style.display = 'none'; });
    let _mobTimer;
    mobInput?.addEventListener('input', () => {
      clearTimeout(_mobTimer);
      _mobTimer = setTimeout(() => { mobResults.innerHTML = buildMobResults(mobInput.value.trim()); }, 200);
    });
    mobInput?.addEventListener('keydown', e => {
      if(e.key === 'Enter' && mobInput.value.trim()) {
        location.href = `search.html?q=${encodeURIComponent(mobInput.value.trim())}`;
      }
      if(e.key === 'Escape') mobOverlay.style.display = 'none';
    });

    // login / logout
    document.getElementById('sbUser')?.addEventListener('click', () => {
      if(isGuest){ location.href = 'login.html'; }
    });
    document.getElementById('logoutBtn')?.addEventListener('click', (e) => {
      e.stopPropagation();
      if(isGuest){ location.href = 'login.html'; return; }
      if(confirm('Вийти з системи?')){ window.SOBAuth.clear(); location.href = 'login.html'; }
    });

    /* period select — зберігаємо і перезавантажуємо */
    const psel = document.getElementById('periodSelect');
    if (psel) {
      psel.addEventListener('change', () => {
        window.SOB.org.period = psel.value;
        window.SOBStore.save();
        location.reload();
      });
    }

    /* ── Пошук ── */
    const gInput = document.getElementById('globalSearch');
    if (gInput) {
      /* контейнер для підказок */
      const suggBox = document.createElement('div');
      suggBox.id = 'searchSugg';
      suggBox.style.cssText = [
        'position:absolute','top:calc(100% + 6px)','left:0','right:0',
        'background:var(--surface)','border:1px solid var(--border)',
        'border-radius:var(--radius)','box-shadow:var(--shadow)',
        'z-index:9999','overflow:hidden','display:none','max-height:320px','overflow-y:auto'
      ].join(';');
      gInput.parentElement.style.position = 'relative';
      gInput.parentElement.appendChild(suggBox);

      let _sugg_timer = null;

      function updateSugg() {
        const q = gInput.value.trim().toLowerCase();
        if (!q) { suggBox.style.display = 'none'; return; }

        const schools = (window.SOB.schools || []).filter(s =>
          s.name.toLowerCase().includes(q) || (s.city||'').toLowerCase().includes(q)
        ).slice(0, 5);

        const insp = Object.entries(window.SOB.workers || window.SOB.inspectors || {}).filter(([,ins]) =>
          ins.name.toLowerCase().includes(q)
        ).slice(0, 3);

        const incidents = (window.SOB.incidents || []).filter(x =>
          (x.title||'').toLowerCase().includes(q) || (x.desc||'').toLowerCase().includes(q)
        ).slice(0, 3);

        const assignments = (window.SOB.assignments || []).filter(x =>
          (x.title||'').toLowerCase().includes(q) || (x.desc||'').toLowerCase().includes(q)
        ).slice(0, 3);

        if (!schools.length && !insp.length && !incidents.length && !assignments.length) { suggBox.style.display = 'none'; return; }

        const ICON_SCH = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m12 3 9 4-9 4-9-4 9-4Z"/><path d="M5 9v5c0 1.7 3.1 3 7 3s7-1.3 7-3V9"/></svg>';
        const ICON_INS = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3.2"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/></svg>';
        const ICON_ALT = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>';
        const ICON_DOC = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z"/><path d="M14 3v5h5"/></svg>';

        const sugg_row = (href, icon, title, sub, color='var(--blue-600)') =>
          `<div class="sugg-row" data-href="${window.esc(href)}" style="display:flex;align-items:center;gap:10px;padding:8px 14px;cursor:pointer;transition:background .12s">
            <span style="color:${color}">${icon}</span>
            <div><div style="font-size:13px;font-weight:600">${window.esc(title)}</div><div style="font-size:11px;color:var(--muted)">${window.esc(sub)}</div></div>
          </div>`;

        let html = '';
        if (schools.length) {
          html += `<div style="padding:7px 14px 3px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em">Заклади освіти</div>`;
          html += schools.map(s => sugg_row(`school.html?id=${s.id}`, ICON_SCH, s.name, s.city||'')).join('');
        }
        if (insp.length) {
          html += `<div style="padding:7px 14px 3px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;border-top:1px solid var(--border)">Працівники СОБ</div>`;
          html += insp.map(([k, ins]) => sugg_row('admin.html', ICON_INS, ins.name, ins.position||ins.rank||'')).join('');
        }
        if (incidents.length) {
          html += `<div style="padding:7px 14px 3px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;border-top:1px solid var(--border)">Інциденти</div>`;
          html += incidents.map(x => sugg_row('incidents.html', ICON_ALT, x.title||'Без назви', x.desc ? x.desc.slice(0,60)+'…' : '', '#E84545')).join('');
        }
        if (assignments.length) {
          html += `<div style="padding:7px 14px 3px;font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;border-top:1px solid var(--border)">Доручення</div>`;
          html += assignments.map(x => sugg_row('assignments.html', ICON_DOC, x.title||'Без назви', x.desc ? x.desc.slice(0,60)+'…' : '')).join('');
        }
        html += `<div class="sugg-row" data-href="search.html?q=${encodeURIComponent(gInput.value.trim())}" style="padding:9px 14px;font-size:13px;color:var(--blue-600);font-weight:600;cursor:pointer;border-top:1px solid var(--border)">Показати всі результати →</div>`;

        suggBox.innerHTML = html;
        suggBox.style.display = 'block';

        suggBox.querySelectorAll('.sugg-row').forEach(row => {
          row.addEventListener('mouseenter', () => row.style.background = 'var(--surface-2)');
          row.addEventListener('mouseleave', () => row.style.background = '');
          row.addEventListener('mousedown', e => { e.preventDefault(); location.href = row.dataset.href; });
        });
      }

      gInput.addEventListener('input', () => {
        clearTimeout(_sugg_timer);
        _sugg_timer = setTimeout(updateSugg, 160);
      });
      gInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          const q = gInput.value.trim();
          if (q) location.href = `search.html?q=${encodeURIComponent(q)}`;
          suggBox.style.display = 'none';
        }
        if (e.key === 'Escape') suggBox.style.display = 'none';
      });
      document.addEventListener('click', e => {
        if (!gInput.parentElement.contains(e.target)) suggBox.style.display = 'none';
      });
      gInput.addEventListener('focus', () => { if (gInput.value.trim().length >= 1) updateSugg(); });
    }

    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('js-anim')));

    /* ── Сповіщення (bell) ── */
    function renderBell() {
      const bellBtn = document.getElementById('bellBtn');
      const bellDot = document.getElementById('bellDot');
      const panel   = document.getElementById('notifPanel');
      if(!bellBtn || !panel) return;
      const notes = window.SOBStore ? window.SOBStore.getNotifications() : [];
      if(notes.length) { bellDot.style.display = 'block'; } else { bellDot.style.display = 'none'; }
      bellBtn.parentElement.style.position = 'relative';
      bellBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const open = panel.style.display !== 'none';
        if(open){ panel.style.display='none'; return; }
        if(!notes.length){
          panel.innerHTML = '<div style="padding:18px 16px;text-align:center;color:var(--muted);font-size:13.5px">Немає нових сповіщень</div>';
        } else {
          const colors = { warn:'var(--gold-500)', red:'var(--red-500)', blue:'var(--blue-600)' };
          panel.innerHTML = '<div style="padding:12px 16px;font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;border-bottom:1px solid var(--border)">Сповіщення</div>' +
            notes.map(n => `<a href="${window.esc(n.href)}" style="display:flex;align-items:flex-start;gap:10px;padding:12px 16px;border-bottom:1px solid var(--border);color:var(--text);text-decoration:none;transition:background .12s" onmouseenter="this.style.background='var(--surface-2)'" onmouseleave="this.style.background=''">
              <span style="width:8px;height:8px;border-radius:50%;background:${colors[n.type]||colors.blue};flex-shrink:0;margin-top:5px"></span>
              <span style="font-size:13.5px">${window.esc(n.text)}</span></a>`).join('');
        }
        panel.style.display = 'block';
      });
      document.addEventListener('click', () => { if(panel) panel.style.display='none'; });
    }
    renderBell();
  }
};
