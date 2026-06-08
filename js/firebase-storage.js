/* ============================================================
   СОБ · Firebase Storage — завантаження фото та файлів
   ------------------------------------------------------------
   Використовує Firebase Storage REST API (без SDK).
   Ліміт безкоштовного плану: 5 ГБ зберігання, 1 ГБ/день скачування.

   НАЛАШТУВАННЯ: вставте Web API Key з Firebase Console →
   Project Settings → General → Your apps → Web API Key
   ============================================================ */

const FIREBASE_API_KEY    = 'AIzaSyDxEY3y-PLACEHOLDER-REPLACE-ME'; // ← замінити!
const FIREBASE_STORAGE_BUCKET = 'sob-c90ba.appspot.com';
const STORAGE_BASE = `https://firebasestorage.googleapis.com/v0/b/${FIREBASE_STORAGE_BUCKET}/o`;

window.SOBStorage = {
  /* ---- Перевірка чи налаштовано ---- */
  configured() {
    return !FIREBASE_API_KEY.includes('PLACEHOLDER');
  },

  /* ---- Отримати download URL ---- */
  _downloadUrl(path, token) {
    return `${STORAGE_BASE}/${encodeURIComponent(path)}?alt=media&token=${token}`;
  },

  /* ---- Завантажити файл у Firebase Storage ----
     path    — шлях у сховищі, напр. 'photos/sch-125/img.jpg'
     file    — File object
     onProgress(0..100) — callback прогресу (необов'язково)
     Повертає: { url, path, name, size }                       */
  async upload(path, file, onProgress) {
    if (!this.configured()) {
      throw new Error('Firebase Storage не налаштовано. Додайте API Key у firebase-storage.js');
    }

    const url = `${STORAGE_BASE}/${encodeURIComponent(path)}?uploadType=media&name=${encodeURIComponent(path)}&key=${FIREBASE_API_KEY}`;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', url);
      xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');

      if (onProgress) {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100));
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const data = JSON.parse(xhr.responseText);
            const downloadUrl = this._downloadUrl(data.name, data.downloadTokens);
            resolve({ url: downloadUrl, path: data.name, name: file.name, size: file.size });
          } catch(e) { reject(new Error('Помилка відповіді Firebase')); }
        } else {
          reject(new Error(`Firebase Storage: ${xhr.status} ${xhr.statusText}`));
        }
      };
      xhr.onerror = () => reject(new Error('Мережева помилка завантаження'));
      xhr.send(file);
    });
  },

  /* ---- Видалити файл ---- */
  async delete(path) {
    if (!this.configured()) return;
    const url = `${STORAGE_BASE}/${encodeURIComponent(path)}?key=${FIREBASE_API_KEY}`;
    try {
      await fetch(url, { method: 'DELETE' });
    } catch(e) { console.warn('Firebase Storage delete failed', e); }
  },

  /* ---- Завантажити фото закладу ----
     schoolId — ідентифікатор школи
     file     — File object
     Зберігає в gallery Firebase + SOB.gallery                 */
  async uploadPhoto(schoolId, file, inspectorKey) {
    if (!this.configured()) {
      // Fallback: base64 в RTDB (старий спосіб, до 1.8 МБ)
      return this._uploadPhotoBase64(schoolId, file, inspectorKey);
    }
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `photos/${schoolId}/${Date.now()}.${ext}`;

    if (typeof toast === 'function') toast('Завантаження фото…', 'blue');

    try {
      const result = await this.upload(path, file);
      const g = {
        schoolId,
        inspector: inspectorKey,
        url: result.url,
        storagePath: result.path,
        name: file.name,
        date: new Date().toISOString().slice(0, 10),
        source: 'firebase-storage'
      };
      window.SOBStore.addGallery(g);
      if (typeof toast === 'function') toast('Фото збережено ✓', 'green');
      return g;
    } catch(e) {
      console.error('Firebase Storage upload failed:', e);
      if (typeof toast === 'function') toast('Помилка завантаження: ' + e.message, 'red');
      throw e;
    }
  },

  /* ---- Fallback: base64 в RTDB (якщо Storage не налаштовано) ---- */
  _uploadPhotoBase64(schoolId, file, inspectorKey) {
    return new Promise((resolve, reject) => {
      if (file.size > 1.8 * 1048576) {
        if (typeof toast === 'function') toast('Файл > 1.8 МБ. Налаштуйте Firebase Storage для великих фото.', 'red');
        reject(new Error('File too large for base64 fallback'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const g = {
          schoolId,
          inspector: inspectorKey,
          url: reader.result,
          name: file.name,
          date: new Date().toISOString().slice(0, 10),
          source: 'base64'
        };
        window.SOBStore.addGallery(g);
        if (typeof toast === 'function') toast('Фото збережено (base64)', 'green');
        resolve(g);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  },

  /* ---- Завантажити документ ----
     schoolId — ідентифікатор школи
     file     — File object                                     */
  async uploadFile(schoolId, file, inspectorKey) {
    function humanSize(b) {
      if (b < 1024) return b + ' Б';
      if (b < 1048576) return (b / 1024).toFixed(0) + ' КБ';
      return (b / 1048576).toFixed(1) + ' МБ';
    }

    const meta = {
      name: file.name,
      size: humanSize(file.size),
      date: new Date().toISOString().slice(0, 10),
      schoolId,
      inspector: inspectorKey
    };

    if (!this.configured() || file.size > 1.8 * 1048576) {
      // base64 для малих файлів
      if (file.size <= 1.8 * 1048576) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            meta.dataUrl = reader.result;
            meta.source = 'base64';
            window.SOBStore.addFile(meta);
            if (typeof toast === 'function') toast('Файл завантажено');
            resolve(meta);
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    }

    if (this.configured()) {
      const ext = file.name.split('.').pop() || 'bin';
      const path = `files/${schoolId}/${Date.now()}_${file.name}`;
      if (typeof toast === 'function') toast('Завантаження файлу…', 'blue');
      try {
        const result = await this.upload(path, file);
        meta.dataUrl = result.url;
        meta.storagePath = result.path;
        meta.source = 'firebase-storage';
        window.SOBStore.addFile(meta);
        if (typeof toast === 'function') toast('Файл завантажено ✓', 'green');
        return meta;
      } catch(e) {
        console.error('Firebase Storage file upload failed:', e);
        if (typeof toast === 'function') toast('Помилка: ' + e.message, 'red');
        throw e;
      }
    }

    // файл без dataUrl (просто метадані)
    meta.source = 'meta-only';
    window.SOBStore.addFile(meta);
    if (typeof toast === 'function') toast('Файл додано (лише метадані — великий файл)', 'navy');
    return meta;
  }
};
