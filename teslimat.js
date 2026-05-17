/**
 * Kindergarten Photo Studio — Dijital Teslimat Sistemi
 * Veli & Admin Paneli
 */
(function () {
    'use strict';

    const PHOTO_BASE_URL = 'https://pub-5675e08d774a4bdf8fbe29c4d965bbca.r2.dev/';
    const FORMSPREE_URL = 'https://formspree.io/f/xvzvlqjg';

    // ── Inline fallback config (works with file:// protocol) ──
    const INLINE_CONFIG = {
        "schools": [
                {
                        "slug": "nicekindergarten",
                        "name": "Nicekindergarten",
                        "veliPin": "1234",
                        "adminPin": "admin2026",
                        "basePath": "nicekindergarten/",
                        "photos": [
                                {
                                        "id": "IMG_0001",
                                        "thumb": "thumbs/DSC03357.webp",
                                        "original": "originals/DSC03357.JPG"
                                },
                                {
                                        "id": "IMG_0002",
                                        "thumb": "thumbs/DSC03359.webp",
                                        "original": "originals/DSC03359.JPG"
                                },
                                {
                                        "id": "IMG_0003",
                                        "thumb": "thumbs/DSC03361.webp",
                                        "original": "originals/DSC03361.JPG"
                                },
                                {
                                        "id": "IMG_0004",
                                        "thumb": "thumbs/DSC03363.webp",
                                        "original": "originals/DSC03363.JPG"
                                },
                                {
                                        "id": "IMG_0005",
                                        "thumb": "thumbs/DSC03367.webp",
                                        "original": "originals/DSC03367.JPG"
                                },
                                {
                                        "id": "IMG_0006",
                                        "thumb": "thumbs/DSC03373.webp",
                                        "original": "originals/DSC03373.JPG"
                                },
                                {
                                        "id": "IMG_0007",
                                        "thumb": "thumbs/DSC03374.webp",
                                        "original": "originals/DSC03374.JPG"
                                },
                                {
                                        "id": "IMG_0008",
                                        "thumb": "thumbs/DSC03379.webp",
                                        "original": "originals/DSC03379.JPG"
                                },
                                {
                                        "id": "IMG_0009",
                                        "thumb": "thumbs/DSC03384.webp",
                                        "original": "originals/DSC03384.JPG"
                                },
                                {
                                        "id": "IMG_0010",
                                        "thumb": "thumbs/DSC03389.webp",
                                        "original": "originals/DSC03389.JPG"
                                },
                                {
                                        "id": "IMG_0011",
                                        "thumb": "thumbs/DSC03392.webp",
                                        "original": "originals/DSC03392.JPG"
                                },
                                {
                                        "id": "IMG_0012",
                                        "thumb": "thumbs/DSC03398.webp",
                                        "original": "originals/DSC03398.JPG"
                                },
                                {
                                        "id": "IMG_0013",
                                        "thumb": "thumbs/DSC03401.webp",
                                        "original": "originals/DSC03401.JPG"
                                },
                                {
                                        "id": "IMG_0014",
                                        "thumb": "thumbs/DSC03407.webp",
                                        "original": "originals/DSC03407.JPG"
                                },
                                {
                                        "id": "IMG_0015",
                                        "thumb": "thumbs/DSC03435.webp",
                                        "original": "originals/DSC03435.JPG"
                                },
                                {
                                        "id": "IMG_0016",
                                        "thumb": "thumbs/DSC03478.webp",
                                        "original": "originals/DSC03478.JPG"
                                },
                                {
                                        "id": "IMG_0017",
                                        "thumb": "thumbs/DSC03479.webp",
                                        "original": "originals/DSC03479.JPG"
                                },
                                {
                                        "id": "IMG_0018",
                                        "thumb": "thumbs/DSC03492.webp",
                                        "original": "originals/DSC03492.JPG"
                                },
                                {
                                        "id": "IMG_0019",
                                        "thumb": "thumbs/DSC03500.webp",
                                        "original": "originals/DSC03500.JPG"
                                },
                                {
                                        "id": "IMG_0020",
                                        "thumb": "thumbs/DSC03503.webp",
                                        "original": "originals/DSC03503.JPG"
                                },
                                {
                                        "id": "IMG_0021",
                                        "thumb": "thumbs/DSC03507.webp",
                                        "original": "originals/DSC03507.JPG"
                                },
                                {
                                        "id": "IMG_0022",
                                        "thumb": "thumbs/DSC03513.webp",
                                        "original": "originals/DSC03513.JPG"
                                },
                                {
                                        "id": "IMG_0023",
                                        "thumb": "thumbs/DSC03514.webp",
                                        "original": "originals/DSC03514.JPG"
                                },
                                {
                                        "id": "IMG_0024",
                                        "thumb": "thumbs/DSC03517.webp",
                                        "original": "originals/DSC03517.JPG"
                                },
                                {
                                        "id": "IMG_0025",
                                        "thumb": "thumbs/DSC03520.webp",
                                        "original": "originals/DSC03520.JPG"
                                },
                                {
                                        "id": "IMG_0026",
                                        "thumb": "thumbs/DSC03522.webp",
                                        "original": "originals/DSC03522.JPG"
                                },
                                {
                                        "id": "IMG_0027",
                                        "thumb": "thumbs/DSC03524.webp",
                                        "original": "originals/DSC03524.JPG"
                                },
                                {
                                        "id": "IMG_0028",
                                        "thumb": "thumbs/DSC03534.webp",
                                        "original": "originals/DSC03534.JPG"
                                },
                                {
                                        "id": "IMG_0029",
                                        "thumb": "thumbs/DSC03537.webp",
                                        "original": "originals/DSC03537.JPG"
                                },
                                {
                                        "id": "IMG_0030",
                                        "thumb": "thumbs/DSC03538.webp",
                                        "original": "originals/DSC03538.JPG"
                                },
                                {
                                        "id": "IMG_0031",
                                        "thumb": "thumbs/DSC03540.webp",
                                        "original": "originals/DSC03540.JPG"
                                }
                        ]
                }
        ]
};

    // ── State ──
    let currentSchool = null;
    let currentRole = null;       // 'veli' | 'admin'
    let selectedPhotos = new Set();
    let gLightboxInstance = null;

    // ── Helpers ──
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    function showToast(msg, type = '') {
        const c = document.getElementById('toastContainer');
        if (!c) return;
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = msg;
        c.appendChild(t);
        setTimeout(() => t.remove(), 3200);
    }

    function showView(id) {
        $$('.view-panel').forEach(p => p.classList.remove('active'));
        const el = document.getElementById(id);
        if (el) el.classList.add('active');
    }

    // ==========================================
    // MODULE 1: AuthGate
    // ==========================================
    const AuthGate = {
        selectedRole: 'veli',

        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const schoolSlug = urlParams.get('okul');

            // Try fetch first, fall back to inline config (for file:// protocol)
            const loadConfig = async () => {
                try {
                    const r = await fetch('teslimat-config.json');
                    return await r.json();
                } catch (e) {
                    console.warn('Config fetch failed, using inline config:', e.message);
                    return JSON.parse(JSON.stringify(INLINE_CONFIG));
                }
            };

            loadConfig().then(data => {
                if (!schoolSlug) {
                    this.showSchoolSelector(data.schools);
                    return;
                }
                
                const school = data.schools.find(s => s.slug === schoolSlug);
                if (!school) {
                    this.showError('Okul bulunamadı: ' + schoolSlug);
                    return;
                }
                currentSchool = school;

                // Apply admin mods from localStorage
                AdminData.load();

                document.getElementById('authSchoolName').textContent = school.name;
                this.setupListeners();
            }).catch(err => this.showError(err.message));
        },

        showError(msg) {
            const main = document.getElementById('teslimatMain');
            main.innerHTML = `<div class="container" style="padding-top:150px;text-align:center;"><h2>Hata</h2><p>${msg}</p></div>`;
            main.classList.remove('hidden');
            document.getElementById('teslimatAuth').classList.add('hidden');
        },

        showSchoolSelector(schools) {
            const auth = document.getElementById('teslimatAuth');
            let html = `<div class="auth-box" style="text-align:center;max-width:500px;margin: 50px auto;">
                <div class="auth-icon" style="font-size:48px;margin-bottom:15px;">🏫</div>
                <h1 class="auth-title">Kayıtlı Okullar</h1>
                <p class="auth-subtitle" style="margin-bottom:30px;">Sisteme kayıtlı okullardan birini seçin.</p>
                <div style="display:flex;flex-direction:column;gap:15px;">
            `;
            
            if (schools.length === 0) {
                html += `<p style="color:var(--text-light);">Henüz kayıtlı okul bulunmuyor.</p>`;
            } else {
                schools.forEach(s => {
                    html += `<a href="?okul=${s.slug}" style="text-decoration:none;display:flex;justify-content:space-between;align-items:center;padding:18px 24px;background:#f8f9fc;color:var(--text-color);border:2px solid #eef0f6;border-radius:12px;transition:0.2s;" onmouseover="this.style.borderColor='var(--bento-blue)'" onmouseout="this.style.borderColor='#eef0f6'">
                        <strong style="font-size:18px;">${s.name}</strong>
                        <span style="font-size:24px;">→</span>
                    </a>`;
                });
            }
            html += `</div></div>`;
            auth.innerHTML = html;
        },

        setupListeners() {
            // Role cards
            $$('.role-card').forEach(card => {
                card.addEventListener('click', () => {
                    $$('.role-card').forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                    this.selectedRole = card.dataset.role;

                    const pinField = document.getElementById('authPinInput');
                    const passField = document.getElementById('authPassInput');
                    if (this.selectedRole === 'admin') {
                        pinField.style.display = 'none';
                        passField.style.display = 'block';
                        passField.focus();
                    } else {
                        pinField.style.display = 'block';
                        passField.style.display = 'none';
                        pinField.focus();
                    }
                });
            });

            // Submit
            document.getElementById('authSubmitBtn').addEventListener('click', () => this.submit());

            // Enter key
            document.getElementById('authPinInput').addEventListener('keypress', e => {
                if (e.key === 'Enter') this.submit();
            });
            document.getElementById('authPassInput').addEventListener('keypress', e => {
                if (e.key === 'Enter') this.submit();
            });
        },

        submit() {
            const errEl = document.getElementById('authError');
            errEl.style.display = 'none';

            if (this.selectedRole === 'veli') {
                const pin = document.getElementById('authPinInput').value;
                if (pin === currentSchool.veliPin) {
                    currentRole = 'veli';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    PhotoViewer.open();
                } else {
                    errEl.textContent = 'Hatalı PIN, lütfen tekrar deneyin.';
                    errEl.style.display = 'block';
                }
            } else {
                const pass = document.getElementById('authPassInput').value;
                if (pass === currentSchool.adminPin) {
                    currentRole = 'admin';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    AdminPanel.render();
                } else {
                    errEl.textContent = 'Hatalı şifre, lütfen tekrar deneyin.';
                    errEl.style.display = 'block';
                }
            }
        }
    };

    // ==========================================
    // MODULE 2: AdminData (localStorage persistence)
    // ==========================================
    const AdminData = {
        getKey() { return `kps_admin_${currentSchool.slug}`; },

        load() {
            const saved = localStorage.getItem(this.getKey());
            if (!saved) return;
            try {
                const mods = JSON.parse(saved);
                if (mods.veliPin) currentSchool.veliPin = mods.veliPin;
                if (mods.adminPin) currentSchool.adminPin = mods.adminPin;
            } catch (e) { /* ignore */ }
        },

        save() {
            const mods = { 
                veliPin: currentSchool.veliPin,
                adminPin: currentSchool.adminPin
            };
            localStorage.setItem(this.getKey(), JSON.stringify(mods));
        }
    };

    // ==========================================
    // MODULE 3: PhotoViewer
    // ==========================================
    const PhotoViewer = {
        open() {
            selectedPhotos.clear();
            showView('photoViewPanel');
            this.updateBreadcrumb();
            this.renderToolbar();
            this.renderPhotos();
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <a id="bcFolders" style="cursor:pointer;">📷 ${currentSchool.name} Fotoğrafları</a>
            `;
            document.getElementById('bcFolders').addEventListener('click', () => {
                if (currentRole === 'admin') AdminPanel.render();
            });
        },

        renderToolbar() {
            const toolbar = document.getElementById('photosToolbar');
            toolbar.innerHTML = `
                <div class="toolbar-left">
                    <button class="btn-back" id="photosBackBtn" style="display:${currentRole === 'admin' ? 'inline-flex' : 'none'};">← Admin</button>
                    <h2 style="font-size:20px; font-family:'Outfit',sans-serif;">${currentSchool.name}</h2>
                    <span style="color:var(--text-light);font-size:13px;font-weight:600;">${currentSchool.photos.length} fotoğraf</span>
                </div>
                <div class="toolbar-right">
                    <button class="btn-ghost" id="selectAllPhotosBtn" style="font-size:12px;padding:7px 14px;">Tümünü Seç</button>
                    <button class="btn-action green" id="downloadSelectedBtn" disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                        İndir
                    </button>
                    <button class="btn-action" id="orderSelectedBtn" disabled>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                        Sipariş Ver
                    </button>
                </div>
            `;

            document.getElementById('photosBackBtn').addEventListener('click', () => {
                if (currentRole === 'admin') AdminPanel.render();
            });

            document.getElementById('selectAllPhotosBtn').addEventListener('click', (e) => {
                const allSelected = selectedPhotos.size === currentSchool.photos.length;
                if (allSelected) {
                    selectedPhotos.clear();
                    $$('.photo-card-t').forEach(c => c.classList.remove('selected'));
                    e.target.textContent = 'Tümünü Seç';
                } else {
                    currentSchool.photos.forEach(p => selectedPhotos.add(p.id));
                    $$('.photo-card-t').forEach(c => c.classList.add('selected'));
                    e.target.textContent = 'Seçimi Temizle';
                }
                this.updateButtons();
            });

            document.getElementById('downloadSelectedBtn').addEventListener('click', () => Downloader.downloadSelected());
            document.getElementById('orderSelectedBtn').addEventListener('click', () => OrderSystem.open());
        },

        renderPhotos() {
            const grid = document.getElementById('photoGridT');
            let html = '';
            currentSchool.photos.forEach(photo => {
                const thumbUrl = PHOTO_BASE_URL + currentSchool.basePath + photo.thumb;
                html += `
                    <div class="photo-card-t ${selectedPhotos.has(photo.id) ? 'selected' : ''}" data-photo-id="${photo.id}">
                        <img src="${thumbUrl}" loading="lazy" alt="Fotoğraf">
                        <div class="photo-overlay-t">
                            <div class="photo-check"></div>
                            <div class="photo-actions-t">
                                <button class="photo-btn-t btn-view-photo" title="Büyüt">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
            });
            grid.innerHTML = html;

            // Click handlers
            grid.querySelectorAll('.photo-card-t').forEach(card => {
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-view-photo')) return;
                    const pid = card.dataset.photoId;
                    if (selectedPhotos.has(pid)) {
                        selectedPhotos.delete(pid);
                        card.classList.remove('selected');
                    } else {
                        selectedPhotos.add(pid);
                        card.classList.add('selected');
                    }
                    this.updateButtons();
                });

                card.querySelector('.btn-view-photo').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(card.dataset.photoId);
                });
            });
        },

        updateButtons() {
            const dlBtn = document.getElementById('downloadSelectedBtn');
            const orderBtn = document.getElementById('orderSelectedBtn');
            const count = selectedPhotos.size;
            dlBtn.disabled = count === 0;
            orderBtn.disabled = count === 0;

            const selectAllBtn = document.getElementById('selectAllPhotosBtn');
            selectAllBtn.textContent = (count === viewingChild.photos.length && count > 0) ? 'Seçimi Temizle' : 'Tümünü Seç';
        },

        openLightbox(startPhotoId) {
            const elements = currentSchool.photos.map(p => ({
                href: PHOTO_BASE_URL + currentSchool.basePath + p.original,
                type: 'image'
            }));
            const startIndex = currentSchool.photos.findIndex(p => p.id === startPhotoId);

            if (gLightboxInstance) gLightboxInstance.destroy();
            gLightboxInstance = GLightbox({
                elements: elements,
                startAt: startIndex,
                touchNavigation: true,
                loop: true
            });
            gLightboxInstance.open();
        }
    };

    // ==========================================
    // MODULE 6: AdminPanel
    // ==========================================
    const AdminPanel = {
        render() {
            showView('adminViewPanel');
            this.updateBreadcrumb();

            const container = document.getElementById('adminContent');
            let html = `
                <div class="admin-toolbar">
                    <div>
                        <h1>🛡️ Admin Paneli</h1>
                        <p style="color:var(--text-light);font-size:14px;margin-top:4px;">${currentSchool.name} — ${currentSchool.photos.length} fotoğraf</p>
                    </div>
                    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
                        <button class="btn-action" id="generalPinBtn">⚙️ Genel Şifreler</button>
                        <button class="btn-action" id="downloadConfigBtn">⬇️ Ayarları İndir</button>
                        <button class="btn-action blue" id="viewPhotosBtn">👁️ Fotoğrafları Gör</button>
                    </div>
                </div>
            `;
            container.innerHTML = html;

            document.getElementById('generalPinBtn').addEventListener('click', () => this.showGeneralPinModal());
            document.getElementById('downloadConfigBtn').addEventListener('click', () => this.downloadConfig());
            document.getElementById('viewPhotosBtn').addEventListener('click', () => PhotoViewer.open());
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <span class="bc-current">🛡️ Admin — ${currentSchool.name}</span>
            `;
        },

        showGeneralPinModal() {
            const overlay = document.getElementById('generalPinOverlay');
            overlay.classList.remove('hidden');
            const vInput = document.getElementById('newVeliPinInput');
            const aInput = document.getElementById('newAdminPinInput');
            vInput.value = currentSchool.veliPin || '';
            aInput.value = currentSchool.adminPin || '';
            
            const saveBtn = document.getElementById('generalPinSaveBtn');
            const cancelBtn = document.getElementById('generalPinCancelBtn');
            
            const newSave = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSave, saveBtn);
            const newCancel = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

            newSave.addEventListener('click', () => {
                const newVeli = vInput.value.trim();
                const newAdmin = aInput.value.trim();
                if (newVeli) currentSchool.veliPin = newVeli;
                if (newAdmin) currentSchool.adminPin = newAdmin;
                AdminData.save();
                showToast('Genel şifreler güncellendi. Ayarları indirmeyi unutmayın.', 'success');
                overlay.classList.add('hidden');
            });
            newCancel.addEventListener('click', () => overlay.classList.add('hidden'));
        },

        downloadConfig() {
            const configObj = { schools: [currentSchool] };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configObj, null, 2));
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "teslimat-config.json");
            document.body.appendChild(dlAnchorElem);
            dlAnchorElem.click();
            document.body.removeChild(dlAnchorElem);
            showToast('teslimat-config.json dosyası indirildi. Lütfen eski dosya ile değiştirin.', 'success');
        }
    };

    // ==========================================
    // MODULE 7: Downloader
    // ==========================================
    const Downloader = {
        async downloadSelected() {
            if (selectedPhotos.size === 0) return;

            const overlay = document.getElementById('dlOverlay');
            const status = document.getElementById('dlStatus');
            const bar = document.getElementById('dlProgressFill');
            overlay.classList.remove('hidden');

            let completed = 0;
            const total = selectedPhotos.size;
            status.textContent = `0 / ${total}`;
            bar.style.width = '0%';

            try {
                if (total === 1) {
                    // Single file — direct download
                    const photoId = [...selectedPhotos][0];
                    const photo = currentSchool.photos.find(p => p.id === photoId);
                    const url = PHOTO_BASE_URL + currentSchool.basePath + photo.original;
                    const response = await fetch(url);
                    const blob = await response.blob();
                    const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                    const a = document.createElement('a');
                    a.href = URL.createObjectURL(blob);
                    a.download = filename;
                    a.click();
                    URL.revokeObjectURL(a.href);
                    status.textContent = 'Tamamlandı!';
                    bar.style.width = '100%';
                } else {
                    // Multiple — ZIP
                    const zip = new JSZip();
                    const folder = zip.folder(currentSchool.name.replace(/\s+/g, '_'));
                    const photosToDownload = currentSchool.photos.filter(p => selectedPhotos.has(p.id));

                    for (const photo of photosToDownload) {
                        const url = PHOTO_BASE_URL + currentSchool.basePath + photo.original;
                        const response = await fetch(url);
                        const blob = await response.blob();
                        const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                        folder.file(filename, blob);
                        completed++;
                        status.textContent = `${completed} / ${total}`;
                        bar.style.width = `${(completed / total) * 100}%`;
                    }

                    status.textContent = 'ZIP oluşturuluyor...';
                    const zipBlob = await zip.generateAsync({ type: 'blob' });
                    saveAs(zipBlob, `${currentSchool.name.replace(/\s+/g, '_')}_fotograflar.zip`);
                }
                showToast('İndirme tamamlandı ✓', 'success');
            } catch (err) {
                console.error('İndirme hatası:', err);
                showToast('İndirme sırasında hata oluştu.', 'error');
            } finally {
                setTimeout(() => overlay.classList.add('hidden'), 1000);
            }
        }
    };

    // ==========================================
    // MODULE 8: OrderSystem
    // ==========================================
    const OrderSystem = {
        open() {
            if (selectedPhotos.size === 0) return;
            const overlay = document.getElementById('orderOverlay');
            overlay.classList.remove('hidden');

            // Fill summary
            const summary = document.getElementById('orderSummary');
            summary.innerHTML = `<strong>${currentSchool.name}</strong> — ${selectedPhotos.size} fotoğraf seçildi<br>
                <small>Fotoğraf ID'ler: ${[...selectedPhotos].join(', ')}</small>`;

            // Setup form
            const form = document.getElementById('orderForm');
            const closeBtn = document.getElementById('orderCloseBtn');

            const newClose = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newClose, closeBtn);
            newClose.addEventListener('click', () => overlay.classList.add('hidden'));

            // Remove old listener by cloning form
            const newForm = form.cloneNode(true);
            form.parentNode.replaceChild(newForm, form);

            newForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const btn = newForm.querySelector('button[type="submit"]');
                const origText = btn.innerHTML;
                btn.innerHTML = 'Gönderiliyor...';
                btn.disabled = true;

                // Build order detail
                const fd = new FormData(newForm);
                fd.set('_subject', `[SİPARİŞ] ${currentSchool.name} — Dijital Teslimat`);
                fd.set('Okul Adı', currentSchool.name);
                fd.set('Seçilen Fotoğraflar', [...selectedPhotos].join(', '));
                fd.set('Fotoğraf Sayısı', selectedPhotos.size);

                try {
                    const response = await fetch(FORMSPREE_URL, {
                        method: 'POST',
                        body: fd,
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        overlay.classList.add('hidden');
                        document.getElementById('successOverlay').classList.remove('hidden');
                        showToast('Siparişiniz başarıyla gönderildi!', 'success');
                    } else {
                        showToast('Bir hata oluştu, lütfen tekrar deneyin.', 'error');
                    }
                } catch (error) {
                    showToast('Sunucu hatası, lütfen tekrar deneyin.', 'error');
                } finally {
                    btn.innerHTML = origText;
                    btn.disabled = false;
                }
            });
        }
    };

    // ==========================================
    // INIT
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('teslimatAuth')) {
            AuthGate.init();

            // Success modal close
            const successClose = document.getElementById('successCloseBtn');
            if (successClose) {
                successClose.addEventListener('click', () => {
                    document.getElementById('successOverlay').classList.add('hidden');
                });
            }
        }
    });

})();
