/* ============================================================
   СОБ · STORE — хмарне збереження через Firebase
   ------------------------------------------------------------
   Дані зберігаються у Firebase Realtime Database (безкоштовно).
   localStorage — кеш для миттєвого відображення при завантаженні.

   НАЛАШТУВАННЯ:
   1. Замініть FIREBASE_URL своїм посиланням (крок 2 інструкції)
   ============================================================ */

const FIREBASE_URL = 'https://sob-c90ba-default-rtdb.europe-west1.firebasedatabase.app'; // ← сюди вставити URL з Firebase
const DATA_VERSION = 'v3'; // змінюйте при глобальному оновленні даних — скидає старий кеш

window.SOBStore = {
  KEY: 'sob_data_v3',
  FB: FIREBASE_URL,
  collections: ['schools', 'schoolEvents', 'gallery', 'files', 'inspectors', 'kpis', 'secondary', 'org', 'incidents', 'assignments', 'auditLog'],

  // --- Ініціалізація: спочатку localStorage, потім Firebase ---
  init() {
    // очищаємо старі версії кешу
    ['sob_data_v1','sob_data_v2'].forEach(k => localStorage.removeItem(k));
    const saved = this._loadLocal();
    if (saved) {
      this.collections.forEach(k => { if (saved[k] !== undefined) window.SOB[k] = saved[k]; });
    }
    if (this.FB && this.FB !== 'YOUR_FIREBASE_URL') {
      this._fetchCloud();
      // синхронізуємо при поверненні на вкладку (замість постійного setInterval)
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') this._fetchCloud();
      });
    }
  },

  async _fetchCloud() {
    try {
      const res = await fetch(this.FB + '/sob.json');
      if (!res.ok) return;
      const data = await res.json();
      if (!data) return;
      this.collections.forEach(k => { if (data[k] !== undefined) window.SOB[k] = data[k]; });
      // зберегти в localStorage як кеш
      try { localStorage.setItem(this.KEY, JSON.stringify(data)); } catch(e){}
      // сповістити сторінку що дані оновились
      document.dispatchEvent(new CustomEvent('sob:synced'));
    } catch(e) { console.warn('Firebase недоступний, працюємо локально', e); }
  },

  _loadLocal() {
    try { return JSON.parse(localStorage.getItem(this.KEY) || 'null'); } catch(e) { return null; }
  },

  save() {
    const out = {};
    this.collections.forEach(k => out[k] = window.SOB[k]);
    // зберегти локально одразу
    try { localStorage.setItem(this.KEY, JSON.stringify(out)); } catch(e) {
      console.warn('localStorage переповнений', e);
      if(typeof toast === 'function') toast('Сховище майже заповнене', 'red');
    }
    // записати у Firebase у фоні — PATCH щоб не затирати паралельні зміни
    if (this.FB && this.FB !== 'YOUR_FIREBASE_URL') {
      fetch(this.FB + '/sob.json', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(out)
      }).catch(e => console.warn('Firebase sync failed', e));
    }
    return true;
  },

  reset() { localStorage.removeItem(this.KEY); localStorage.removeItem('sob_imgslots'); },
  uid(p) { return p + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); },

  /* ---- Заклади ---- */
  addSchool(s) { s.id = s.id || this.uid('sch'); if (s.serviced === undefined) s.serviced = true; window.SOB.schools.push(s); this.save(); return s; },
  updateSchool(id, patch) { const s = window.SOB.schools.find(x => x.id === id); if (s) { Object.assign(s, patch); this.save(); } return s; },
  deleteSchool(id) {
    window.SOB.schools = window.SOB.schools.filter(x => x.id !== id);
    window.SOB.schoolEvents = window.SOB.schoolEvents.filter(x => x.schoolId !== id);
    window.SOB.gallery = window.SOB.gallery.filter(x => x.schoolId !== id);
    window.SOB.files = window.SOB.files.filter(x => x.schoolId !== id);
    this.save();
  },

  /* ---- Заходи ---- */
  addEvent(ev) { ev.id = ev.id || this.uid('ev'); ev.createdAt = ev.createdAt || new Date().toISOString(); window.SOB.schoolEvents.unshift(ev); this.logAudit('create','event',ev.id,'Захід додано: '+(ev.title||'')); this.save(); return ev; },
  updateEvent(id, patch) { const e = window.SOB.schoolEvents.find(x => x.id === id); if (e) { Object.assign(e, patch); this.logAudit('update','event',id,'Захід оновлено'); this.save(); } return e; },
  cancelEvent(id, reason) { const e = window.SOB.schoolEvents.find(x => x.id === id); if(e){ e.status='cancelled'; e.cancelReason=reason; e.cancelledAt=new Date().toISOString(); this.logAudit('cancel','event',id,'Захід скасовано: '+reason); this.save(); } return e; },
  restoreEvent(id) { const e = window.SOB.schoolEvents.find(x => x.id === id); if(e){ e.status='active'; delete e.cancelReason; delete e.cancelledAt; this.logAudit('restore','event',id,'Захід відновлено'); this.save(); } return e; },
  deleteEvent(id) { window.SOB.schoolEvents = window.SOB.schoolEvents.filter(x => x.id !== id); this.logAudit('delete','event',id,'Захід видалено'); this.save(); },
  eventsFor(schoolId) { return window.SOB.schoolEvents.filter(x => x.schoolId === schoolId); },

  /* ---- Файли ---- */
  addFile(f) { f.id = f.id || this.uid('f'); window.SOB.files.unshift(f); this.save(); return f; },
  deleteFile(id) { window.SOB.files = window.SOB.files.filter(x => x.id !== id); this.save(); },
  filesFor(schoolId) { return window.SOB.files.filter(x => !schoolId || x.schoolId === schoolId); },

  /* ---- Галерея ---- */
  addGallery(g) { g.id = g.id || this.uid('g'); window.SOB.gallery.unshift(g); this.save(); return g; },
  deleteGallery(id) { window.SOB.gallery = window.SOB.gallery.filter(x => x.id !== id); this.save(); },

  /* ---- Інциденти ---- */
  addIncident(inc) { inc.id = inc.id || this.uid('inc'); inc.createdAt = inc.createdAt || new Date().toISOString(); inc.status = inc.status || 'new'; window.SOB.incidents.unshift(inc); this.logAudit('create','incident',inc.id,'Інцидент створено'); this.save(); return inc; },
  updateIncident(id, patch) { const x = window.SOB.incidents.find(i => i.id === id); if(x){ Object.assign(x, patch); this.logAudit('update','incident',id,'Інцидент оновлено'); this.save(); } return x; },
  deleteIncident(id) { window.SOB.incidents = window.SOB.incidents.filter(x => x.id !== id); this.logAudit('delete','incident',id,'Інцидент видалено'); this.save(); },

  /* ---- Доручення ---- */
  addAssignment(a) { a.id = a.id || this.uid('asgn'); a.createdAt = a.createdAt || new Date().toISOString(); a.status = a.status || 'new'; window.SOB.assignments.unshift(a); this.logAudit('create','assignment',a.id,'Доручення створено'); this.save(); return a; },
  updateAssignment(id, patch) { const x = window.SOB.assignments.find(a => a.id === id); if(x){ Object.assign(x, patch); this.logAudit('update','assignment',id,'Доручення оновлено'); this.save(); } return x; },
  deleteAssignment(id) { window.SOB.assignments = window.SOB.assignments.filter(x => x.id !== id); this.logAudit('delete','assignment',id,'Доручення видалено'); this.save(); },

  /* ---- Журнал аудиту ---- */
  logAudit(action, entity, entityId, description) {
    const u = window.SOBAuth ? window.SOBAuth.current() : { name: 'Система' };
    if(!window.SOB.auditLog) window.SOB.auditLog = [];
    window.SOB.auditLog.unshift({ id: this.uid('log'), action, entity, entityId, description, who: u.name || 'Система', at: new Date().toISOString() });
    if(window.SOB.auditLog.length > 1000) window.SOB.auditLog = window.SOB.auditLog.slice(0, 1000);
  },

  /* ---- Сповіщення ---- */
  getNotifications() {
    const now = Date.now();
    const notes = [];
    // прострочені доручення
    (window.SOB.assignments || []).filter(a => a.status !== 'done' && a.deadline && new Date(a.deadline) < new Date()).forEach(a => {
      notes.push({ id: 'asgn-' + a.id, type: 'warn', text: 'Прострочене доручення: ' + a.title, href: 'assignments.html' });
    });
    // нові інциденти (за останні 24г)
    (window.SOB.incidents || []).filter(i => i.status === 'new' && i.createdAt && (now - new Date(i.createdAt).getTime()) < 86400000).forEach(i => {
      notes.push({ id: 'inc-' + i.id, type: 'red', text: 'Новий інцидент: ' + (i.title || i.type), href: 'incidents.html' });
    });
    return notes;
  },

  /* ---- Допоміжне ---- */
  serviced() { return window.SOB.schools.filter(s => s.serviced); },
  schoolsForUser() {
    const u = window.SOBAuth.current();
    if (u.role === 'inspector') return window.SOB.schools.filter(s => s.serviced && s.inspector === u.inspector);
    return this.serviced();
  },
};

/* ---- Toast (сповіщення) ---- */
window.toast = function (msg, kind) {
  let host = document.getElementById('toastHost');
  if (!host) { host = document.createElement('div'); host.id = 'toastHost'; host.style.cssText = 'position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none'; document.body.appendChild(host); }
  const t = document.createElement('div');
  const colors = { green: ['#1AA56C', '#fff'], red: ['#DC4338', '#fff'], blue: ['#1F59DD', '#fff'], navy: ['#0E274D', '#fff'] };
  const c = colors[kind] || colors.green;
  t.style.cssText = `background:${c[0]};color:${c[1]};font-weight:600;font-size:14px;padding:12px 20px;border-radius:12px;box-shadow:0 12px 30px rgba(9,23,51,.25);opacity:0;transform:translateY(10px);transition:all .25s cubic-bezier(.22,.61,.36,1)`;
  const ic = kind === 'red'
    ? '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" style="vertical-align:-3px;margin-right:7px"><path d="M18 6 6 18M6 6l12 12"/></svg>'
    : '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.4" style="vertical-align:-3px;margin-right:7px"><path d="M20 6 9 17l-5-5"/></svg>';
  t.innerHTML = ic + msg;
  host.appendChild(t);
  requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'none'; });
  setTimeout(() => { t.style.opacity = '0'; t.style.transform = 'translateY(10px)'; setTimeout(() => t.remove(), 300); }, 2400);
};

window.SOBStore.init();
