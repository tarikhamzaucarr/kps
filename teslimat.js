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
                "slug": "demo-okul",
                "name": "Demo Anaokulu",
                "veliPin": "1234",
                "adminPin": "admin2026",
                "basePath": "demo-okul/",
                "children": [
                    {
                        "id": "child-1",
                        "name": "Test 1",
                        "pin": "0001",
                        "folder": "test1",
                        "photos": [
                            { "id": "IMG_001", "thumb": "originals/test1/galeri_01.jpg", "original": "originals/test1/galeri_01.jpg" },
                            { "id": "IMG_002", "thumb": "originals/test1/galeri_02.jpg", "original": "originals/test1/galeri_02.jpg" },
                            { "id": "IMG_003", "thumb": "originals/test1/galeri_03.jpg", "original": "originals/test1/galeri_03.jpg" }
                        ]
                    }
                ]
            }
        ]
    };

    // ── State ──
    let currentSchool = null;
    let currentRole = null;       // 'veli' | 'admin'
    let unlockedChildId = null;   // child.id that veli unlocked
    let selectedPhotos = new Set();
    let viewingChild = null;      // child currently being viewed
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
            const schoolSlug = urlParams.get('okul') || 'demo-okul'; // varsayılan

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
                    FolderView.render();
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
                
                // Apply renames and PINs
                if (mods.renames) {
                    mods.renames.forEach(r => {
                        const child = currentSchool.children.find(c => c.id === r.id);
                        if (child) {
                            if (r.name) child.name = r.name;
                            if (r.pin) child.pin = r.pin;
                        }
                    });
                }
                // Apply additions
                if (mods.additions) {
                    mods.additions.forEach(a => {
                        if (!currentSchool.children.find(c => c.id === a.id)) {
                            currentSchool.children.push(a);
                        }
                    });
                }
            } catch (e) { /* ignore */ }
        },

        save() {
            const mods = { 
                veliPin: currentSchool.veliPin,
                adminPin: currentSchool.adminPin,
                renames: [], 
                additions: [] 
            };
            // We track all current names/pins as potential overrides
            currentSchool.children.forEach(c => {
                if (c._added) {
                    mods.additions.push(c);
                } else {
                    mods.renames.push({ id: c.id, name: c.name, pin: c.pin });
                }
            });
            localStorage.setItem(this.getKey(), JSON.stringify(mods));
        }
    };

    // ==========================================
    // MODULE 3: FolderView
    // ==========================================
    const FolderView = {
        render() {
            showView('folderViewPanel');
            this.updateBreadcrumb();
            const grid = document.getElementById('folderGrid');
            const children = currentSchool.children;

            document.getElementById('folderSchoolName').textContent = currentSchool.name;
            document.getElementById('folderChildCount').textContent = `${children.length} öğrenci`;

            let html = '';
            children.forEach(child => {
                const isUnlocked = (currentRole === 'admin') || (unlockedChildId === child.id);
                const lockClass = isUnlocked ? 'unlocked' : 'locked';
                const lockBadge = isUnlocked ? '' : '<span class="lock-badge">🔒</span>';
                const emoji = isUnlocked ? '📂' : '📁';

                html += `
                    <div class="child-folder ${lockClass}" data-child-id="${child.id}">
                        ${lockBadge}
                        <span class="folder-emoji">${emoji}</span>
                        <div class="folder-name" title="${child.name}">${child.name}</div>
                        <div class="folder-count">${child.photos.length} fotoğraf</div>
                    </div>
                `;
            });
            grid.innerHTML = html;

            // Click handlers
            grid.querySelectorAll('.child-folder').forEach(card => {
                card.addEventListener('click', () => {
                    const childId = card.dataset.childId;
                    const child = currentSchool.children.find(c => c.id === childId);
                    if (!child) return;

                    if (currentRole === 'admin' || unlockedChildId === child.id) {
                        PhotoViewer.open(child);
                    } else {
                        ChildPinModal.open(child);
                    }
                });
            });
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <span class="bc-current">${currentSchool.name}</span>
            `;
        }
    };

    // ==========================================
    // MODULE 4: ChildPinModal
    // ==========================================
    const ChildPinModal = {
        open(child) {
            const overlay = document.getElementById('childPinOverlay');
            overlay.classList.remove('hidden');
            document.getElementById('childPinName').textContent = child.name;
            const input = document.getElementById('childPinInput');
            const error = document.getElementById('childPinError');
            input.value = '';
            error.style.display = 'none';
            input.focus();

            // Store reference
            this._currentChild = child;

            // Listeners (re-set)
            const submitBtn = document.getElementById('childPinSubmit');
            const closeBtn = document.getElementById('childPinClose');

            const newSubmit = submitBtn.cloneNode(true);
            submitBtn.parentNode.replaceChild(newSubmit, submitBtn);
            const newClose = closeBtn.cloneNode(true);
            closeBtn.parentNode.replaceChild(newClose, closeBtn);

            newSubmit.addEventListener('click', () => this.verify());
            newClose.addEventListener('click', () => this.close());
            input.onkeypress = (e) => { if (e.key === 'Enter') this.verify(); };
        },

        verify() {
            const input = document.getElementById('childPinInput');
            const error = document.getElementById('childPinError');
            if (input.value === this._currentChild.pin) {
                unlockedChildId = this._currentChild.id;
                this.close();
                showToast(`${this._currentChild.name} klasörüne erişim sağlandı ✓`, 'success');
                FolderView.render();
                // Auto-open the folder
                setTimeout(() => PhotoViewer.open(this._currentChild), 300);
            } else {
                error.style.display = 'block';
                setTimeout(() => error.style.display = 'none', 3000);
            }
        },

        close() {
            document.getElementById('childPinOverlay').classList.add('hidden');
        }
    };

    // ==========================================
    // MODULE 5: PhotoViewer
    // ==========================================
    const PhotoViewer = {
        open(child) {
            viewingChild = child;
            selectedPhotos.clear();
            showView('photoViewPanel');
            this.updateBreadcrumb();
            this.renderToolbar();
            this.renderPhotos();
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <a id="bcFolders">📁 ${currentSchool.name}</a>
                <span class="bc-sep">›</span>
                <span class="bc-current">${viewingChild.name}</span>
            `;
            document.getElementById('bcFolders').addEventListener('click', () => {
                if (currentRole === 'admin') AdminPanel.render();
                else FolderView.render();
            });
        },

        renderToolbar() {
            const toolbar = document.getElementById('photosToolbar');
            toolbar.innerHTML = `
                <div class="toolbar-left">
                    <button class="btn-back" id="photosBackBtn">← Geri</button>
                    <h2 style="font-size:20px; font-family:'Outfit',sans-serif;">${viewingChild.name}</h2>
                    <span style="color:var(--text-light);font-size:13px;font-weight:600;">${viewingChild.photos.length} fotoğraf</span>
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
                else FolderView.render();
            });

            document.getElementById('selectAllPhotosBtn').addEventListener('click', (e) => {
                const allSelected = selectedPhotos.size === viewingChild.photos.length;
                if (allSelected) {
                    selectedPhotos.clear();
                    $$('.photo-card-t').forEach(c => c.classList.remove('selected'));
                    e.target.textContent = 'Tümünü Seç';
                } else {
                    viewingChild.photos.forEach(p => selectedPhotos.add(p.id));
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
            viewingChild.photos.forEach(photo => {
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
            const elements = viewingChild.photos.map(p => ({
                href: PHOTO_BASE_URL + currentSchool.basePath + p.original,
                type: 'image'
            }));
            const startIndex = viewingChild.photos.findIndex(p => p.id === startPhotoId);

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
                        <p style="color:var(--text-light);font-size:14px;margin-top:4px;">${currentSchool.name} — ${currentSchool.children.length} öğrenci</p>
                    </div>
                    <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-end;">
                        <button class="btn-action" id="generalPinBtn">⚙️ Genel Şifreler</button>
                        <button class="btn-action" id="downloadConfigBtn">⬇️ Ayarları İndir</button>
                        <button class="btn-action blue" id="addFolderBtn">+ Yeni Klasör</button>
                    </div>
                </div>
                <div class="admin-folder-list" id="adminFolderList"></div>
            `;
            container.innerHTML = html;

            this.renderList();

            document.getElementById('addFolderBtn').addEventListener('click', () => this.addFolder());
            document.getElementById('generalPinBtn').addEventListener('click', () => this.showGeneralPinModal());
            document.getElementById('downloadConfigBtn').addEventListener('click', () => this.downloadConfig());
        },

        renderList() {
            const list = document.getElementById('adminFolderList');
            let html = '';
            currentSchool.children.forEach(child => {
                html += `
                    <div class="admin-folder-row" data-child-id="${child.id}">
                        <span class="afr-icon">📁</span>
                        <div class="afr-info">
                            <div class="afr-name">${child.name}</div>
                            <div class="afr-meta">${child.photos.length} fotoğraf · PIN: ${child.pin}</div>
                        </div>
                        <div class="afr-actions">
                            <button class="afr-btn edit" data-action="rename">✏️ Düzenle</button>
                            <button class="afr-btn" data-action="change-pin">🔑 Şifre</button>
                            <button class="afr-btn view" data-action="view">👁️ Görüntüle</button>
                            <button class="afr-btn delete" data-action="delete">🗑️ Sil</button>
                        </div>
                    </div>
                `;
            });
            list.innerHTML = html;

            // Action handlers
            list.querySelectorAll('.afr-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const childId = btn.closest('.admin-folder-row').dataset.childId;
                    const child = currentSchool.children.find(c => c.id === childId);
                    if (!child) return;

                    const action = btn.dataset.action;
                    if (action === 'rename') this.showRename(child);
                    else if (action === 'change-pin') this.showPinChangeModal(child);
                    else if (action === 'view') PhotoViewer.open(child);
                    else if (action === 'delete') this.deleteFolder(child);
                });
            });
        },

        updateBreadcrumb() {
            document.getElementById('breadcrumb').innerHTML = `
                <span class="bc-current">🛡️ Admin — ${currentSchool.name}</span>
            `;
        },

        addFolder() {
            const name = prompt('Yeni klasör adı (çocuk adı):');
            if (!name || !name.trim()) return;

            const id = 'child-' + Date.now();
            const pin = String(Math.floor(1000 + Math.random() * 9000));
            currentSchool.children.push({
                id: id,
                name: name.trim(),
                pin: pin,
                folder: name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
                photos: [],
                _added: true
            });
            AdminData.save();
            this.renderList();
            showToast(`"${name.trim()}" klasörü oluşturuldu. PIN: ${pin}`, 'success');
        },

        showRename(child) {
            const overlay = document.getElementById('renameOverlay');
            overlay.classList.remove('hidden');
            const input = document.getElementById('renameInput');
            input.value = child.name;
            input.focus();
            input.select();

            const saveBtn = document.getElementById('renameSaveBtn');
            const cancelBtn = document.getElementById('renameCancelBtn');

            const newSave = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSave, saveBtn);
            const newCancel = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

            newSave.addEventListener('click', () => {
                const newName = input.value.trim();
                if (newName) {
                    child.name = newName;
                    AdminData.save();
                    this.renderList();
                    showToast(`Klasör adı güncellendi: "${newName}"`, 'success');
                }
                overlay.classList.add('hidden');
            });

            newCancel.addEventListener('click', () => overlay.classList.add('hidden'));
            input.onkeypress = (e) => { if (e.key === 'Enter') newSave.click(); };
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

        showPinChangeModal(child) {
            const overlay = document.getElementById('pinChangeOverlay');
            overlay.classList.remove('hidden');
            document.getElementById('pinChangeFolderName').textContent = `${child.name} klasörü için şifre belirleyin.`;
            
            const input = document.getElementById('newFolderPinInput');
            input.value = child.pin || '';
            input.focus();
            input.select();
            
            const saveBtn = document.getElementById('pinChangeSaveBtn');
            const cancelBtn = document.getElementById('pinChangeCancelBtn');
            
            const newSave = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newSave, saveBtn);
            const newCancel = cancelBtn.cloneNode(true);
            cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);

            newSave.addEventListener('click', () => {
                const newPin = input.value.trim();
                if (newPin) {
                    child.pin = newPin;
                    AdminData.save();
                    this.renderList();
                    showToast(`"${child.name}" klasör şifresi güncellendi. Ayarları indirmeyi unutmayın.`, 'success');
                }
                overlay.classList.add('hidden');
            });
            newCancel.addEventListener('click', () => overlay.classList.add('hidden'));
            input.onkeypress = (e) => { if (e.key === 'Enter') newSave.click(); };
        },

        downloadConfig() {
            // Strip out local internal properties before downloading
            const cleanSchool = JSON.parse(JSON.stringify(currentSchool));
            cleanSchool.children.forEach(c => { delete c._added; });
            
            const configObj = { schools: [cleanSchool] };
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configObj, null, 2));
            const dlAnchorElem = document.createElement('a');
            dlAnchorElem.setAttribute("href", dataStr);
            dlAnchorElem.setAttribute("download", "teslimat-config.json");
            document.body.appendChild(dlAnchorElem);
            dlAnchorElem.click();
            document.body.removeChild(dlAnchorElem);
            showToast('teslimat-config.json dosyası indirildi. Lütfen eski dosya ile değiştirin.', 'success');
        },

        deleteFolder(child) {
            if (!confirm(`"${child.name}" klasörünü silmek istediğinize emin misiniz?`)) return;
            currentSchool.children = currentSchool.children.filter(c => c.id !== child.id);
            AdminData.save();
            this.renderList();
            showToast(`"${child.name}" klasörü silindi.`, 'error');
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
                    const photo = viewingChild.photos.find(p => p.id === photoId);
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
                    const folder = zip.folder(viewingChild.name.replace(/\s+/g, '_'));
                    const photosToDownload = viewingChild.photos.filter(p => selectedPhotos.has(p.id));

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
                    saveAs(zipBlob, `${viewingChild.name.replace(/\s+/g, '_')}_fotograflar.zip`);
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
            summary.innerHTML = `<strong>${viewingChild.name}</strong> — ${selectedPhotos.size} fotoğraf seçildi<br>
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
                fd.set('_subject', `[SİPARİŞ] ${viewingChild.name} — Dijital Teslimat`);
                fd.set('Çocuk Adı', viewingChild.name);
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
