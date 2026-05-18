/**
 * Kindergarten Photo Studio — Dijital Teslimat Sistemi
 * Veli & Admin Paneli
 */
(function () {
    'use strict';

    const PHOTO_BASE_URL = 'https://pub-5675e08d774a4bdf8fbe29c4d965bbca.r2.dev/';
    const FORMSPREE_URL = 'https://formspree.io/f/xvzvlqjg';

    // ── SHA-256 Hash Utility (BUG-02: PIN Security) ──
    async function sha256(str) {
        const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
        return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    // Compare input against plain or hashed PIN
    async function pinMatch(input, stored) {
        if (input === stored) return true; // plain text fallback
        try { return (await sha256(input)) === stored; } catch(e) { return false; }
    }

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
                                        "thumb": "thumbs/DSC03357.jpg",
                                        "original": "originals/DSC03357.JPG"
                                },
                                {
                                        "id": "IMG_0002",
                                        "thumb": "thumbs/DSC03359.jpg",
                                        "original": "originals/DSC03359.JPG"
                                },
                                {
                                        "id": "IMG_0003",
                                        "thumb": "thumbs/DSC03361.jpg",
                                        "original": "originals/DSC03361.JPG"
                                },
                                {
                                        "id": "IMG_0004",
                                        "thumb": "thumbs/DSC03363.jpg",
                                        "original": "originals/DSC03363.JPG"
                                },
                                {
                                        "id": "IMG_0005",
                                        "thumb": "thumbs/DSC03367.jpg",
                                        "original": "originals/DSC03367.JPG"
                                },
                                {
                                        "id": "IMG_0006",
                                        "thumb": "thumbs/DSC03373.jpg",
                                        "original": "originals/DSC03373.JPG"
                                },
                                {
                                        "id": "IMG_0007",
                                        "thumb": "thumbs/DSC03374.jpg",
                                        "original": "originals/DSC03374.JPG"
                                },
                                {
                                        "id": "IMG_0008",
                                        "thumb": "thumbs/DSC03379.jpg",
                                        "original": "originals/DSC03379.JPG"
                                },
                                {
                                        "id": "IMG_0009",
                                        "thumb": "thumbs/DSC03384.jpg",
                                        "original": "originals/DSC03384.JPG"
                                },
                                {
                                        "id": "IMG_0010",
                                        "thumb": "thumbs/DSC03389.jpg",
                                        "original": "originals/DSC03389.JPG"
                                },
                                {
                                        "id": "IMG_0011",
                                        "thumb": "thumbs/DSC03392.jpg",
                                        "original": "originals/DSC03392.JPG"
                                },
                                {
                                        "id": "IMG_0012",
                                        "thumb": "thumbs/DSC03398.jpg",
                                        "original": "originals/DSC03398.JPG"
                                },
                                {
                                        "id": "IMG_0013",
                                        "thumb": "thumbs/DSC03401.jpg",
                                        "original": "originals/DSC03401.JPG"
                                },
                                {
                                        "id": "IMG_0014",
                                        "thumb": "thumbs/DSC03407.jpg",
                                        "original": "originals/DSC03407.JPG"
                                },
                                {
                                        "id": "IMG_0015",
                                        "thumb": "thumbs/DSC03435.jpg",
                                        "original": "originals/DSC03435.JPG"
                                },
                                {
                                        "id": "IMG_0016",
                                        "thumb": "thumbs/DSC03478.jpg",
                                        "original": "originals/DSC03478.JPG"
                                },
                                {
                                        "id": "IMG_0017",
                                        "thumb": "thumbs/DSC03479.jpg",
                                        "original": "originals/DSC03479.JPG"
                                },
                                {
                                        "id": "IMG_0018",
                                        "thumb": "thumbs/DSC03492.jpg",
                                        "original": "originals/DSC03492.JPG"
                                },
                                {
                                        "id": "IMG_0019",
                                        "thumb": "thumbs/DSC03500.jpg",
                                        "original": "originals/DSC03500.JPG"
                                },
                                {
                                        "id": "IMG_0020",
                                        "thumb": "thumbs/DSC03503.jpg",
                                        "original": "originals/DSC03503.JPG"
                                },
                                {
                                        "id": "IMG_0021",
                                        "thumb": "thumbs/DSC03507.jpg",
                                        "original": "originals/DSC03507.JPG"
                                },
                                {
                                        "id": "IMG_0022",
                                        "thumb": "thumbs/DSC03513.jpg",
                                        "original": "originals/DSC03513.JPG"
                                },
                                {
                                        "id": "IMG_0023",
                                        "thumb": "thumbs/DSC03514.jpg",
                                        "original": "originals/DSC03514.JPG"
                                },
                                {
                                        "id": "IMG_0024",
                                        "thumb": "thumbs/DSC03517.jpg",
                                        "original": "originals/DSC03517.JPG"
                                },
                                {
                                        "id": "IMG_0025",
                                        "thumb": "thumbs/DSC03520.jpg",
                                        "original": "originals/DSC03520.JPG"
                                },
                                {
                                        "id": "IMG_0026",
                                        "thumb": "thumbs/DSC03522.jpg",
                                        "original": "originals/DSC03522.JPG"
                                },
                                {
                                        "id": "IMG_0027",
                                        "thumb": "thumbs/DSC03524.jpg",
                                        "original": "originals/DSC03524.JPG"
                                },
                                {
                                        "id": "IMG_0028",
                                        "thumb": "thumbs/DSC03534.jpg",
                                        "original": "originals/DSC03534.JPG"
                                },
                                {
                                        "id": "IMG_0029",
                                        "thumb": "thumbs/DSC03537.jpg",
                                        "original": "originals/DSC03537.JPG"
                                },
                                {
                                        "id": "IMG_0030",
                                        "thumb": "thumbs/DSC03538.jpg",
                                        "original": "originals/DSC03538.JPG"
                                },
                                {
                                        "id": "IMG_0031",
                                        "thumb": "thumbs/DSC03540.jpg",
                                        "original": "originals/DSC03540.JPG"
                                }
                        ]
                }
        ]
};

    // --- PRODUCTS CATALOG ---
    const PRODUCTS = [
        // Kategori 1: Klasik Baskılar
        { id: 'baski-10x15', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Standart Baskı (10×15)', price: 0, mockup: { shape: 'print', wRatio: 1.5, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-13x18', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Orta Baskı (13×18)', price: 0, mockup: { shape: 'print', wRatio: 1.4, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-15x21', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A5 Baskı (15×21)', price: 0, mockup: { shape: 'print', wRatio: 1, hRatio: 1.4, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-20x30', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A4 Baskı (20×30)', price: 0, mockup: { shape: 'print', wRatio: 1, hRatio: 1.5, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        
        // Kategori 2: Duvar Sanatı
        { id: 'kanvas-30x40', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (30×40)', price: 0, mockup: { shape: 'canvas', wRatio: 3, hRatio: 4, padding: 0, frameColor: '#ccc' } },
        { id: 'kanvas-50x70', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (50×70)', price: 0, mockup: { shape: 'canvas', wRatio: 5, hRatio: 7, padding: 0, frameColor: '#ccc' } },
        { id: 'cerceve-21x30', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Ahşap Çerçeveli (21×30)', price: 0, mockup: { shape: 'rect', wRatio: 2.1, hRatio: 3, padding: 10, bgColor: '#fff', frameColor: '#8b5a2b' } },
        { id: 'mdf-blok', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'MDF Blok Baskı', price: 0, mockup: { shape: 'mdf', wRatio: 1, hRatio: 1.2, padding: 0, frameColor: '#444' } },

        // Kategori 3: Hediyelik
        { id: 'kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#fff' } },
        { id: 'sihirli-kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Sihirli Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#333' } },
        { id: 'magnet', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Buzdolabı Magneti', price: 0, mockup: { shape: 'magnet', wRatio: 1, hRatio: 1.4, padding: 2, bgColor: '#fff', frameColor: '#ddd' } },
        { id: 'anahtarlik', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Akrilik Anahtarlık', price: 0, mockup: { shape: 'keychain', wRatio: 1, hRatio: 1, padding: 2, frameColor: '#ccc' } },
        { id: 'puzzle', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Yapboz', price: 0, mockup: { shape: 'puzzle', wRatio: 4, hRatio: 3, padding: 0 } },

        // Kategori 4: Kırtasiye & Paketler
        { id: 'takvim', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Masa Takvimi', price: 0, mockup: { shape: 'calendar', wRatio: 1.5, hRatio: 1, bgColor: '#fff' } },
        { id: 'kitap-ayraci', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Kitap Ayracı', price: 0, mockup: { shape: 'bookmark', wRatio: 1, hRatio: 3, padding: 2, bgColor: '#fff' } },
        { id: 'paket-aile', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Aile Paketi', price: 0, mockup: { shape: 'bundle', text: 'Aile Paketi' } },
        { id: 'paket-buyukanne', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Büyükanne Paketi', price: 0, mockup: { shape: 'bundle', text: 'Büyükanne Pkt.' } }
    ];

    const CAT_ICONS = {
        baski: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        duvar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
        hediye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
        kirtasiye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>'
    };

    // ── State ──
    let currentSchool = null;
    let currentRole = null;       // 'veli' | 'admin'
    let selectedPhotos = new Set();
    let gLightboxInstance = null;
    let activeLightboxPhotoId = null;
    let activeLightboxPhotoUrl = null;
    let activeLightboxThumbUrl = null;

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
            const schoolSlug = urlParams.get('okul') || window.location.hash.replace('#','') || null;

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

        async submit() {
            const errEl = document.getElementById('authError');
            errEl.style.display = 'none';

            if (this.selectedRole === 'veli') {
                const pin = document.getElementById('authPinInput').value;
                if (await pinMatch(pin, currentSchool.veliPin)) {
                    currentRole = 'veli';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    document.title = `${currentSchool.name} Fotoğraflar | KPS`;
                    PhotoViewer.open();
                } else {
                    errEl.textContent = 'Hatalı PIN, lütfen tekrar deneyin.';
                    errEl.style.display = 'block';
                }
            } else {
                const pass = document.getElementById('authPassInput').value;
                if (await pinMatch(pass, currentSchool.adminPin)) {
                    currentRole = 'admin';
                    document.getElementById('teslimatAuth').classList.add('hidden');
                    document.getElementById('teslimatMain').classList.remove('hidden');
                    document.title = `Admin — ${currentSchool.name} | KPS`;
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

    let isSelectMode = false;

    // ==========================================
    // MODULE 3: PhotoViewer
    // ==========================================
    const PhotoViewer = {
        open() {
            selectedPhotos.clear();
            isSelectMode = false;
            PriceManager.load();
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
            if(toolbar) {
                toolbar.innerHTML = `
                    <div class="toolbar-left">
                        <button class="btn-back" id="photosBackBtn" style="display:${currentRole === 'admin' ? 'inline-flex' : 'none'};">← Admin</button>
                        <h2 style="font-size:20px; font-family:'Outfit',sans-serif;">${currentSchool.name}</h2>
                        <span style="color:var(--text-light);font-size:13px;font-weight:600;">${currentSchool.photos.length} fotoğraf</span>
                    </div>
                    <div class="toolbar-right">
                        <button class="btn-ghost" id="toggleSelectModeBtn" style="font-size:12px;padding:7px 14px; font-weight:bold;">Seç</button>
                        <button class="btn-ghost" id="selectAllPhotosBtn" style="font-size:12px;padding:7px 14px; display:none;">Tümünü Seç</button>
                    </div>
                `;

                document.getElementById('photosBackBtn').addEventListener('click', () => {
                    if (currentRole === 'admin') AdminPanel.render();
                });

                const toggleBtn = document.getElementById('toggleSelectModeBtn');
                const selectAllBtn = document.getElementById('selectAllPhotosBtn');

                toggleBtn.addEventListener('click', () => {
                    isSelectMode = !isSelectMode;
                    if (isSelectMode) {
                        toggleBtn.textContent = 'Vazgeç';
                        toggleBtn.style.color = '#e74c3c';
                        selectAllBtn.style.display = 'inline-block';
                        document.body.classList.add('select-mode-active');
                    } else {
                        toggleBtn.textContent = 'Seç';
                        toggleBtn.style.color = '';
                        selectAllBtn.style.display = 'none';
                        selectedPhotos.clear();
                        $$('.photo-card-t').forEach(c => c.classList.remove('selected'));
                        document.body.classList.remove('select-mode-active');
                        this.updateButtons();
                    }
                });

                selectAllBtn.addEventListener('click', (e) => {
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
            }
            
            // Re-bind download button in the new action bar
            const dlBtn = document.getElementById('downloadBtn');
            if(dlBtn) {
                // Remove old listeners by cloning
                const newDlBtn = dlBtn.cloneNode(true);
                dlBtn.parentNode.replaceChild(newDlBtn, dlBtn);
                newDlBtn.addEventListener('click', () => Downloader.downloadSelected());
            }
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

            // Click handlers + image load
            grid.querySelectorAll('.photo-card-t').forEach(card => {
                // Shimmer → loaded transition
                const img = card.querySelector('img');
                if (img) {
                    img.addEventListener('load', () => card.classList.add('loaded'));
                    if (img.complete) card.classList.add('loaded');
                }

                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-view-photo')) return;
                    const pid = card.dataset.photoId;
                    if (isSelectMode) {
                        if (selectedPhotos.has(pid)) {
                            selectedPhotos.delete(pid);
                            card.classList.remove('selected');
                        } else {
                            selectedPhotos.add(pid);
                            card.classList.add('selected');
                        }
                        this.updateButtons();
                    } else {
                        this.openLightbox(pid);
                    }
                });

                card.querySelector('.btn-view-photo').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(card.dataset.photoId);
                });
            });
        },

        updateButtons() {
            const count = selectedPhotos.size;
            
            // Bottom Action Bar Logic
            const bar = document.getElementById('actionBar');
            const countEl = document.getElementById('selectedCount');
            if (countEl) countEl.textContent = count;
            
            if (bar) {
                if (count > 0) {
                    bar.classList.remove('hidden');
                } else {
                    bar.classList.add('hidden');
                }
            }

            const selectAllBtn = document.getElementById('selectAllPhotosBtn');
            if (selectAllBtn) {
                selectAllBtn.textContent = (count === currentSchool.photos.length && count > 0) ? 'Seçimi Temizle' : 'Tümünü Seç';
            }
        },

        openLightbox(startPhotoId) {
            const elements = currentSchool.photos.map(p => ({
                href: PHOTO_BASE_URL + currentSchool.basePath + p.original,
                type: 'image',
                photoId: p.id,
                thumbUrl: PHOTO_BASE_URL + currentSchool.basePath + p.thumb
            }));
            const startIndex = currentSchool.photos.findIndex(p => p.id === startPhotoId);

            if (gLightboxInstance) gLightboxInstance.destroy();
            
            const firstSlide = elements[startIndex];
            activeLightboxPhotoId = firstSlide.photoId;
            activeLightboxPhotoUrl = firstSlide.href;
            activeLightboxThumbUrl = firstSlide.thumbUrl;

            gLightboxInstance = GLightbox({
                elements: elements,
                startAt: startIndex,
                touchNavigation: true,
                loop: true
            });
            
            gLightboxInstance.on('open', () => {
                ProductBar.init();
                setTimeout(() => ProductBar.updateMockups(activeLightboxThumbUrl), 100);
            });
            
            gLightboxInstance.on('slide_changed', ({ current }) => {
                const slide = elements[current.index];
                activeLightboxPhotoId = slide.photoId;
                activeLightboxPhotoUrl = slide.href;
                activeLightboxThumbUrl = slide.thumbUrl;
                ProductBar.updateMockups(activeLightboxThumbUrl);
            });
            
            gLightboxInstance.on('close', () => {
                ProductBar.hide();
                document.body.classList.remove('shop-bar-minimized');
            });

            gLightboxInstance.open();
        }
    };

    // ==========================================
    // MODULE 6: AdminPanel (Tabbed) + Helpers
    // ==========================================
    const PriceManager = {
        KEY: () => `kps_prices_${currentSchool.slug}`,
        load() {
            try { const p = JSON.parse(localStorage.getItem(this.KEY())); if(p) PRODUCTS.forEach(pr => { if(p[pr.id]!==undefined) pr.price=p[pr.id]; }); } catch(e){}
        },
        save() { const p={}; PRODUCTS.forEach(pr => p[pr.id]=pr.price); localStorage.setItem(this.KEY(), JSON.stringify(p)); }
    };
    const OrderTracker = {
        KEY: () => `kps_orders_${currentSchool.slug}`,
        getAll() { try { return JSON.parse(localStorage.getItem(this.KEY())||'[]'); } catch(e){ return []; } },
        add(order) { const o=this.getAll(); o.unshift({...order,id:Date.now().toString(),date:new Date().toLocaleString('tr-TR'),status:'Beklemede'}); localStorage.setItem(this.KEY(),JSON.stringify(o)); },
        updateStatus(id,status) { const o=this.getAll(); const x=o.find(i=>i.id===id); if(x){x.status=status; localStorage.setItem(this.KEY(),JSON.stringify(o));} },
        exportCSV() {
            const o=this.getAll(); if(!o.length){showToast('Sipariş yok.','error');return;}
            let csv='Tarih,Ad,Telefon,Adres,Ödeme,Ürünler,Toplam,Durum\n';
            o.forEach(r => csv+=`"${r.date}","${r.name}","${r.phone}","${r.address}","${r.payment}","${r.items}","₺${r.total}","${r.status}"\n`);
            saveAs(new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}),`${currentSchool.slug}_siparisler.csv`);
        }
    };
    const DownloadTracker = {
        KEY: () => `kps_dl_${currentSchool.slug}`,
        getCount() { const t=new Date().toISOString().split('T')[0]; try{const d=JSON.parse(localStorage.getItem(this.KEY()));return(d&&d.date===t)?d.count:0;}catch(e){return 0;} },
        increment() { const t=new Date().toISOString().split('T')[0],c=this.getCount()+1; localStorage.setItem(this.KEY(),JSON.stringify({date:t,count:c})); return c; },
        getLimit() { return parseInt(localStorage.getItem(`kps_dl_limit_${currentSchool.slug}`)||'0'); },
        setLimit(n) { localStorage.setItem(`kps_dl_limit_${currentSchool.slug}`,n.toString()); },
        canDownload() { const l=this.getLimit(); return l===0||this.getCount()<l; }
    };

    const AdminPanel = {
        activeTab: 'general',
        render() {
            showView('adminViewPanel');
            this.updateBreadcrumb();
            PriceManager.load();
            const c = document.getElementById('adminContent');
            c.innerHTML = `
                <div class="admin-toolbar"><div><h1>🛡️ Admin Paneli</h1><p style="color:var(--text-light);font-size:14px;margin-top:4px;">${currentSchool.name} — ${currentSchool.photos.length} fotoğraf</p></div>
                <button class="btn-action blue" id="viewPhotosBtn">👁️ Fotoğrafları Gör</button></div>
                <div class="admin-tabs" id="adminTabs">
                    <button class="admin-tab active" data-tab="general">⚙️ Genel</button>
                    <button class="admin-tab" data-tab="prices">💰 Fiyatlar</button>
                    <button class="admin-tab" data-tab="orders">📦 Siparişler</button>
                    <button class="admin-tab" data-tab="settings">🔧 Ayarlar</button>
                </div>
                <div class="admin-tab-content" id="adminTabContent"></div>`;
            document.getElementById('viewPhotosBtn').addEventListener('click', () => PhotoViewer.open());
            document.getElementById('adminTabs').addEventListener('click', e => {
                const tab=e.target.closest('.admin-tab'); if(!tab) return;
                c.querySelectorAll('.admin-tab').forEach(t=>t.classList.remove('active'));
                tab.classList.add('active'); this.activeTab=tab.dataset.tab; this.renderTab();
            });
            this.renderTab();
        },
        renderTab() {
            const c=document.getElementById('adminTabContent');
            if(this.activeTab==='general') this.renderGeneral(c);
            else if(this.activeTab==='prices') this.renderPrices(c);
            else if(this.activeTab==='orders') this.renderOrders(c);
            else if(this.activeTab==='settings') this.renderSettings(c);
        },
        renderGeneral(c) {
            c.innerHTML = `<div class="admin-section"><h3>🔐 Giriş Şifreleri</h3>
                <div class="admin-row"><label>Veli PIN</label><input type="text" id="adm_veliPin" value="${currentSchool.veliPin}" class="admin-input"></div>
                <div class="admin-row"><label>Admin Şifre</label><input type="text" id="adm_adminPin" value="${currentSchool.adminPin}" class="admin-input"></div>
                <button class="btn-action" id="admSavePins">💾 Kaydet</button></div>
                <div class="admin-section" style="margin-top:20px;"><h3>📥 Yapılandırma</h3>
                <button class="btn-action" id="admDownloadConfig">⬇️ Ayarları İndir</button></div>`;
            document.getElementById('admSavePins').addEventListener('click', () => {
                currentSchool.veliPin=document.getElementById('adm_veliPin').value.trim();
                currentSchool.adminPin=document.getElementById('adm_adminPin').value.trim();
                AdminData.save(); showToast('Şifreler güncellendi.','success');
            });
            document.getElementById('admDownloadConfig').addEventListener('click', () => this.downloadConfig());
        },
        renderPrices(c) {
            const cats=[...new Set(PRODUCTS.map(p=>p.categoryLabel))];
            let h='<div class="admin-section"><h3>💰 Ürün Fiyatları</h3>';
            cats.forEach(cat => {
                h+=`<div class="price-category"><h4>${cat}</h4>`;
                PRODUCTS.filter(p=>p.categoryLabel===cat).forEach(p => {
                    h+=`<div class="price-row"><span>${p.name}</span><div class="price-input-wrap"><span>₺</span><input type="number" min="0" step="1" value="${p.price}" data-pid="${p.id}" class="price-input"></div></div>`;
                });
                h+='</div>';
            });
            h+='<button class="btn-action" id="admSavePrices" style="margin-top:15px;">💾 Fiyatları Kaydet</button></div>';
            c.innerHTML=h;
            document.getElementById('admSavePrices').addEventListener('click', () => {
                c.querySelectorAll('.price-input').forEach(inp => { const p=PRODUCTS.find(x=>x.id===inp.dataset.pid); if(p) p.price=parseFloat(inp.value)||0; });
                PriceManager.save(); showToast('Fiyatlar kaydedildi ✓','success');
            });
        },
        renderOrders(c) {
            const orders=OrderTracker.getAll();
            let h=`<div class="admin-section"><h3>📦 Siparişler (${orders.length})</h3><button class="btn-action" id="admExportCSV" style="margin-bottom:15px;">📄 CSV İndir</button>`;
            if(!orders.length) h+='<p style="color:var(--text-light);">Henüz sipariş yok.</p>';
            else { h+='<div class="order-list">'; orders.forEach(o => {
                const sc=o.status==='Teslim Edildi'?'delivered':o.status==='Onaylandı'?'confirmed':'pending';
                h+=`<div class="order-card"><div class="order-header"><strong>${o.name}</strong><span class="order-date">${o.date}</span></div>
                <div class="order-body"><span>📞 ${o.phone}</span><span>💳 ${o.payment}</span><span class="order-total">₺${o.total}</span></div>
                <div class="order-items">${o.items}</div>
                <div class="order-footer"><span class="order-status ${sc}">${o.status}</span>
                <select class="order-status-select" data-oid="${o.id}"><option value="Beklemede" ${o.status==='Beklemede'?'selected':''}>Beklemede</option><option value="Onaylandı" ${o.status==='Onaylandı'?'selected':''}>Onaylandı</option><option value="Teslim Edildi" ${o.status==='Teslim Edildi'?'selected':''}>Teslim Edildi</option></select></div></div>`;
            }); h+='</div>'; }
            h+='</div>'; c.innerHTML=h;
            document.getElementById('admExportCSV').addEventListener('click', () => OrderTracker.exportCSV());
            c.querySelectorAll('.order-status-select').forEach(sel => sel.addEventListener('change', e => {
                OrderTracker.updateStatus(e.target.dataset.oid, e.target.value); this.renderOrders(c); showToast('Durum güncellendi.','success');
            }));
        },
        renderSettings(c) {
            const dlL=DownloadTracker.getLimit(), dlC=DownloadTracker.getCount();
            c.innerHTML = `<div class="admin-section"><h3>🔧 Galeri Ayarları</h3>
                <div class="setting-row"><div><strong>⬇️ Günlük İndirme Limiti</strong><p style="color:var(--text-light);font-size:12px;">0 = Sınırsız | Bugün: ${dlC}</p></div>
                <input type="number" min="0" value="${dlL}" id="admDlLimit" class="admin-input" style="width:80px;"></div>
                <button class="btn-action" id="admSaveSettings" style="margin-top:15px;">💾 Kaydet</button></div>`;
            document.getElementById('admSaveSettings').addEventListener('click', () => {
                DownloadTracker.setLimit(parseInt(document.getElementById('admDlLimit').value)||0);
                showToast('Ayarlar kaydedildi ✓','success');
            });
        },
        updateBreadcrumb() { document.getElementById('breadcrumb').innerHTML=`<span class="bc-current">🛡️ Admin — ${currentSchool.name}</span>`; },
        downloadConfig() {
            const prices={}; PRODUCTS.forEach(p=>prices[p.id]=p.price);
            const cfg={schools:[{...currentSchool,prices}]};
            const a=document.createElement('a'); a.href="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(cfg,null,2));
            a.download="teslimat-config.json"; document.body.appendChild(a); a.click(); document.body.removeChild(a);
            showToast('Config indirildi.','success');
        }
    };

    // ==========================================
    // MODULE 7: Downloader
    // ==========================================
    const Downloader = {
        async downloadSelected() {
            if (selectedPhotos.size === 0) return;
            if (!DownloadTracker.canDownload()) { showToast('Günlük indirme limitinize ulaştınız.','error'); return; }

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
                    const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                    try {
                        const response = await fetch(url);
                        if (!response.ok) throw new Error("Network response was not ok");
                        const blob = await response.blob();
                        const a = document.createElement('a');
                        a.href = URL.createObjectURL(blob);
                        a.download = filename;
                        a.click();
                        URL.revokeObjectURL(a.href);
                    } catch (fetchErr) {
                        console.warn("CORS blocked fetch, falling back to direct link", fetchErr);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = filename;
                        a.target = '_blank';
                        a.click();
                    }
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
                DownloadTracker.increment();
            } catch (err) {
                console.error('İndirme hatası:', err);
                showToast('İndirme sırasında hata oluştu: ' + err.message, 'error');
                overlay.classList.add('hidden');
                return;
            }
            setTimeout(() => overlay.classList.add('hidden'), 1000);
        }
    };

    // ==========================================
    // MODULE 8: ProductBar & MockupRenderer
    // ==========================================
    const ProductBar = {
        DOM_ID: 'kpsProductBar',
        currentCategory: 'baski',
        
        init() {
            document.body.classList.add('shop-bar-active');
            const existing = document.getElementById(this.DOM_ID);
            if (existing) {
                existing.classList.add('active');
                existing.classList.remove('minimized');
                return;
            }
            
            const categories = [...new Set(PRODUCTS.map(p => p.category))];
            const catLabels = {};
            PRODUCTS.forEach(p => catLabels[p.category] = p.categoryLabel);
            
            const wrapper = document.createElement('div');
            wrapper.id = this.DOM_ID;
            wrapper.className = 'shop-bar-wrapper active';
            
            let headerHtml = `
                <div class="shop-bar-header" style="text-align:center; padding-bottom:10px;">
                    <button id="shopBarToggleBtn" style="background:none; border:none; color:var(--text-light); font-weight:600; font-family:'Outfit'; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
                        <span>Ürün Seçenekleri</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                </div>
            `;
            
            let tabsHtml = '<div class="shop-tabs" id="shopBarContentArea">';
            categories.forEach(cat => {
                const icon = CAT_ICONS[cat] || '';
                tabsHtml += `<button class="shop-tab ${cat === this.currentCategory ? 'active' : ''}" data-cat="${cat}">${icon}${catLabels[cat]}</button>`;
            });
            tabsHtml += '</div>';
            
            let productsHtml = '<div class="shop-products" id="shopProductsContainer"></div>';
            
            wrapper.innerHTML = headerHtml + tabsHtml + productsHtml;
            document.body.appendChild(wrapper);
            
            const toggleBtn = document.getElementById('shopBarToggleBtn');
            toggleBtn.addEventListener('click', () => {
                wrapper.classList.toggle('minimized');
                const isMinimized = wrapper.classList.contains('minimized');
                document.body.classList.toggle('shop-bar-minimized', isMinimized);
                const iconPath = isMinimized ? '<polyline points="18 15 12 9 6 15"></polyline>' : '<polyline points="6 9 12 15 18 9"></polyline>';
                toggleBtn.querySelector('svg').innerHTML = iconPath;
            });

            wrapper.querySelectorAll('.shop-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    wrapper.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentCategory = e.target.dataset.cat;
                    this.renderProducts();
                    if(activeLightboxThumbUrl) this.updateMockups(activeLightboxThumbUrl);
                });
            });
            
            this.renderProducts();
        },
        
        renderProducts() {
            const container = document.getElementById('shopProductsContainer');
            if(!container) return;
            
            const filtered = PRODUCTS.filter(p => p.category === this.currentCategory);
            
            let html = '';
            filtered.forEach(p => {
                html += `
                    <div class="shop-card">
                        <div class="css-mockup shape-${p.mockup.shape}" id="mockup-${p.id}">
                            <div class="mockup-inner"></div>
                            <div class="mockup-glare"></div>
                        </div>
                        <h4 title="${p.name}">${p.name}</h4>
                        <div class="price">₺${p.price}</div>
                        <button class="btn-add" data-pid="${p.id}">Sepete Ekle</button>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            
            container.querySelectorAll('.btn-add').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const pid = e.target.dataset.pid;
                    const product = PRODUCTS.find(p => p.id === pid);
                    Cart.add(activeLightboxPhotoId, activeLightboxPhotoUrl, activeLightboxThumbUrl, product);
                    
                    const origText = e.target.textContent;
                    e.target.textContent = '✓ Eklendi';
                    e.target.style.background = 'var(--bento-green)';
                    setTimeout(() => {
                        e.target.textContent = origText;
                        e.target.style.background = '';
                    }, 1500);
                });
            });
        },
        
        updateMockups(photoUrl) {
            if(!photoUrl) return;
            const filtered = PRODUCTS.filter(p => p.category === this.currentCategory);
            
            filtered.forEach(p => {
                const inner = document.querySelector(`#mockup-${p.id} .mockup-inner`);
                if(inner) {
                    inner.style.backgroundImage = `url('${photoUrl}')`;
                }
            });
        },
        
        hide() {
            document.body.classList.remove('shop-bar-active');
            const bar = document.getElementById(this.DOM_ID);
            if (bar) bar.classList.remove('active');
        }
    };




    // ==========================================
    // MODULE 9: Cart
    // ==========================================
    const Cart = {
        items: [],
        
        init() {
            const saved = localStorage.getItem('kps_cart');
            if (saved) {
                try { this.items = JSON.parse(saved); } catch(e){}
            }
            
            this.updateUI();
            
            document.getElementById('cartFab').addEventListener('click', () => {
                document.getElementById('cartPanel').classList.add('active');
                document.getElementById('cartOverlay').classList.add('active');
                document.body.style.overflow = 'hidden';
                this.renderItems();
            });
            
            const closeCart = () => {
                document.getElementById('cartPanel').classList.remove('active');
                document.getElementById('cartOverlay').classList.remove('active');
                document.body.style.overflow = '';
            };
            
            document.getElementById('closeCartBtn').addEventListener('click', closeCart);
            document.getElementById('cartOverlay').addEventListener('click', closeCart);
            
            // ESC key to close panels
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    const checkoutModal = document.getElementById('checkoutModal');
                    if (!checkoutModal.classList.contains('hidden')) {
                        checkoutModal.classList.add('hidden');
                        document.body.style.overflow = '';
                        return;
                    }
                    if (document.getElementById('cartPanel').classList.contains('active')) {
                        closeCart();
                        return;
                    }
                }
            });
            
            document.getElementById('checkoutBtn').addEventListener('click', () => {
                if(this.items.length === 0) return;
                closeCart();
                Checkout.open();
            });
        },
        
        save() {
            localStorage.setItem('kps_cart', JSON.stringify(this.items));
            this.updateUI();
            if (document.getElementById('cartPanel').classList.contains('active')) {
                this.renderItems();
            }
        },
        
        add(photoId, photoUrl, thumbUrl, product) {
            const existing = this.items.find(i => i.photoId === photoId && i.productId === product.id);
            if (existing) {
                existing.qty += 1;
            } else {
                this.items.push({
                    id: Date.now().toString(),
                    photoId,
                    photoUrl,
                    thumbUrl,
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    qty: 1
                });
            }
            this.save();
        },
        
        remove(id) {
            this.items = this.items.filter(i => i.id !== id);
            this.save();
        },
        
        updateQty(id, delta) {
            const item = this.items.find(i => i.id === id);
            if (item) {
                item.qty += delta;
                if (item.qty <= 0) this.remove(id);
                else this.save();
            }
        },
        
        clear() {
            this.items = [];
            this.save();
        },
        
        updateUI() {
            const count = this.items.reduce((sum, item) => sum + item.qty, 0);
            const total = this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
            
            document.getElementById('cartBadge').textContent = count;
            document.getElementById('cartTotalPrice').textContent = `₺${total}`;
            
            const btn = document.getElementById('checkoutBtn');
            btn.disabled = count === 0;
            btn.textContent = count === 0 ? 'Sepetiniz Boş' : 'Siparişi Tamamla';
        },
        
        renderItems() {
            const container = document.getElementById('cartItems');
            if (this.items.length === 0) {
                container.innerHTML = '<div style="text-align:center;color:#999;padding:40px 0;">Sepetinizde ürün bulunmamaktadır.</div>';
                return;
            }
            
            let html = '';
            this.items.forEach(item => {
                html += `
                    <div class="cart-item">
                        <img src="${item.thumbUrl}" class="cart-item-img">
                        <div class="cart-item-details">
                            <div class="cart-item-title">${item.productName}</div>
                            <div style="font-size:12px; color:#666; margin-bottom:5px;">Fotoğraf: ${item.photoId}</div>
                            <div class="cart-item-price">₺${item.price}</div>
                            <div class="cart-item-actions">
                                <div class="qty-control">
                                    <button class="qty-btn" onclick="document.dispatchEvent(new CustomEvent('cartQty', {detail: {id:'${item.id}', d:-1}}))">-</button>
                                    <span>${item.qty}</span>
                                    <button class="qty-btn" onclick="document.dispatchEvent(new CustomEvent('cartQty', {detail: {id:'${item.id}', d:1}}))">+</button>
                                </div>
                                <button class="btn-remove" onclick="document.dispatchEvent(new CustomEvent('cartRm', {detail: '${item.id}'}))">Kaldır</button>
                            </div>
                        </div>
                    </div>
                `;
            });
            container.innerHTML = html;
        }
    };
    
    document.addEventListener('cartQty', (e) => Cart.updateQty(e.detail.id, e.detail.d));
    document.addEventListener('cartRm', (e) => Cart.remove(e.detail));

    // ==========================================
    // MODULE 10: Checkout
    // ==========================================
    const Checkout = {
        init() {
            const modal = document.getElementById('checkoutModal');
            document.getElementById('closeCheckoutBtn').addEventListener('click', () => {
                modal.classList.add('hidden');
                document.body.style.overflow = '';
            });
            
            const form = document.getElementById('checkoutForm');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    
                    const btn = document.getElementById('submitOrderBtn');
                    if (btn.disabled) return; // BUG-12: debounce
                    const origText = btn.innerHTML;
                    btn.innerHTML = 'Gönderiliyor...';
                    btn.disabled = true;
                    
                    let orderDetails = "SİPARİŞ DETAYI\n-----------------\n";
                    let total = 0;
                    Cart.items.forEach((item, i) => {
                        orderDetails += `${i+1}. ${item.productName} (Foto: ${item.photoId}) - Adet: ${item.qty} - Fiyat: ₺${item.price * item.qty}\n`;
                        total += (item.price * item.qty);
                    });
                    orderDetails += `-----------------\nTOPLAM: ₺${total}`;
                    
                    document.getElementById('cartDataInput').value = orderDetails;
                    
                    const fd = new FormData(form);
                    fd.set('_subject', `[SİPARİŞ] ${currentSchool.name} — E-Ticaret`);
                    fd.set('Okul Adı', currentSchool.name);
                    
                    try {
                        const response = await fetch(form.action, {
                            method: form.method,
                            body: fd,
                            headers: { 'Accept': 'application/json' }
                        });
                        if (response.ok) {
                            // Save order to tracker
                            const fd2 = new FormData(form);
                            OrderTracker.add({
                                name: fd2.get('name'), phone: fd2.get('phone'),
                                address: fd2.get('address'), payment: fd2.get('payment'),
                                items: Cart.items.map(i=>`${i.productName}(${i.photoId})x${i.qty}`).join(', '),
                                total: Cart.items.reduce((s,i)=>s+i.price*i.qty,0)
                            });
                            modal.classList.add('hidden');
                            document.body.style.overflow = '';
                            document.getElementById('successOverlay').classList.remove('hidden');
                            Cart.clear();
                            form.reset();
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
        },
        
        open() {
            document.getElementById('checkoutModal').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // ==========================================
    // INIT
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        if (document.getElementById('teslimatAuth')) {
            AuthGate.init();
            
            Cart.init();
            Checkout.init();

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
