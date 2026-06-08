/* ============================================================
   СОБ · Cloudinary Storage — завантаження фото та файлів
   ------------------------------------------------------------
   Використовує Cloudinary REST API (безкоштовно, без картки).
   Безкоштовний план: 25 ГБ зберігання, 25 ГБ/місяць трафік.
   ============================================================ */

const CLOUDINARY_CLOUD  = 'dvfmyfoce';
const CLOUDINARY_PRESET = 'tfjb1hdt';
const CLOUDINARY_URL    = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/upload`;

window.SOBStorage = {

  configured() { return true; },

  /* ---- Завантажити файл у Cloudinary ----
     file        — File object
     folder      — папка у Cloudinary (напр. 'sob/photos/sch-125')
     onProgress  — callback(0..100), необов'язково
     Повертає: { url, publicId, name, size }                   */
  async upload(file, folder, onProgress) {
    return new Promise((resolve, reject) => {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('upload_preset', CLOUDINARY_PRESET);
      fd.append('folder', folder || 'sob');

      const xhr = new XMLHttpRequest();
      xhr.open('POST', CLOUDINARY_URL);

      if (onProgress) {
        xhr.upload.onprogress = e => {
          if (e.lengthComputable) onProgress(Math.round(e.loaded / e.total * 100));
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const d = JSON.parse(xhr.responseText);
            resolve({ url: d.secure_url, publicId: d.public_id, name: file.name, size: file.size });
          } catch(e) { reject(new Error('Помилка відповіді Cloudinary')); }
        } else {
          let msg = xhr.statusText;
          try { msg = JSON.parse(xhr.responseText).error?.message || msg; } catch(_) {}
          reject(new Error('Cloudinary: ' + msg));
        }
      };
      xhr.onerror = () => reject(new Error('Мережева помилка завантаження'));
      xhr.send(fd);
    });
  },

  /* ---- Завантажити фото закладу ----
     Зберігає в SOB.gallery + Firebase RTDB                    */
  async uploadPhoto(schoolId, file, inspectorKey) {
    if (typeof toast === 'function') toast('Завантаження фото…', 'blue');
    try {
      const folder = `sob/photos/${schoolId}`;
      const result = await this.upload(file, folder);
      const g = {
        schoolId,
        inspector: inspectorKey,
        url: result.url,
        publicId: result.publicId,
        name: file.name,
        date: new Date().toISOString().slice(0, 10),
        source: 'cloudinary'
      };
      window.SOBStore.addGallery(g);
      if (typeof toast === 'function') toast('Фото збережено ✓', 'green');
      return g;
    } catch(e) {
      console.error('Cloudinary upload failed:', e);
      if (typeof toast === 'function') toast('Помилка: ' + e.message, 'red');
      throw e;
    }
  },

  /* ---- Завантажити документ ----
     Документи зберігаються як raw у Cloudinary або base64 (< 1.8 МБ) */
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

    const isImage = file.type.startsWith('image/');

    /* Зображення — через Cloudinary */
    if (isImage) {
      if (typeof toast === 'function') toast('Завантаження…', 'blue');
      try {
        const result = await this.upload(file, `sob/files/${schoolId}`);
        meta.dataUrl = result.url;
        meta.publicId = result.publicId;
        meta.source = 'cloudinary';
        window.SOBStore.addFile(meta);
        if (typeof toast === 'function') toast('Файл завантажено ✓', 'green');
        return meta;
      } catch(e) {
        if (typeof toast === 'function') toast('Помилка: ' + e.message, 'red');
        throw e;
      }
    }

    /* Документи (PDF, DOC тощо) — base64 для малих, метадані для великих */
    if (file.size <= 1.8 * 1048576) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          meta.dataUrl = reader.result;
          meta.source = 'base64';
          window.SOBStore.addFile(meta);
          if (typeof toast === 'function') toast('Файл завантажено ✓', 'green');
          resolve(meta);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    /* Великий файл — зберігаємо лише метадані */
    meta.source = 'meta-only';
    window.SOBStore.addFile(meta);
    if (typeof toast === 'function') toast('Файл додано (великий файл — лише метадані)', 'navy');
    return meta;
  },

  /* ---- Видалити фото (лише з SOB.gallery, з Cloudinary без серверного ключа не можна) ---- */
  async delete(publicId) {
    /* Видалення з Cloudinary потребує server-side підпису.
       Файл залишиться у Cloudinary але буде видалений з платформи. */
    console.info('Cloudinary: видалення з хмари потребує серверного ключа. Видалено лише з платформи.');
  }
};
