/**
 * Kindergarten Photo Studio - Shop & Gallery System
 */

(function () {
    'use strict';

    const PHOTO_BASE_URL = './assets/photos/'; // To be updated to R2 URL
    const FORMSPREE_URL = 'https://formspree.io/f/xvzvlqjg';
    const MAX_ZIP_PHOTOS = 50;

    // --- PRODUCTS CATALOG ---
    const PRODUCTS = [
        // Kategori 1: Klasik Baskılar
        { id: 'baski-10x15', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Standart Baskı (10×15)', price: 0, mockup: { shape: 'rect', wRatio: 1.5, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-13x18', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'Orta Baskı (13×18)', price: 0, mockup: { shape: 'rect', wRatio: 1.4, hRatio: 1, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-15x21', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A5 Baskı (15×21)', price: 0, mockup: { shape: 'rect', wRatio: 1, hRatio: 1.4, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        { id: 'baski-20x30', category: 'baski', categoryLabel: 'Klasik Baskılar', name: 'A4 Baskı (20×30)', price: 0, mockup: { shape: 'rect', wRatio: 1, hRatio: 1.5, padding: 5, bgColor: '#fff', frameColor: '#eee' } },
        
        // Kategori 2: Duvar Sanatı
        { id: 'kanvas-30x40', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (30×40)', price: 0, mockup: { shape: 'canvas', wRatio: 3, hRatio: 4, padding: 0, frameColor: '#ccc' } },
        { id: 'kanvas-50x70', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Kanvas Tablo (50×70)', price: 0, mockup: { shape: 'canvas', wRatio: 5, hRatio: 7, padding: 0, frameColor: '#ccc' } },
        { id: 'cerceve-21x30', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'Ahşap Çerçeveli (21×30)', price: 0, mockup: { shape: 'rect', wRatio: 2.1, hRatio: 3, padding: 10, bgColor: '#fff', frameColor: '#8b5a2b' } },
        { id: 'mdf-blok', category: 'duvar', categoryLabel: 'Duvar Sanatı', name: 'MDF Blok Baskı', price: 0, mockup: { shape: 'rect', wRatio: 1, hRatio: 1.2, padding: 0, frameColor: '#444' } },

        // Kategori 3: Hediyelik
        { id: 'kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#fff' } },
        { id: 'sihirli-kupa', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Sihirli Kupa', price: 0, mockup: { shape: 'mug', wRatio: 1, hRatio: 1.2, bgColor: '#333' } },
        { id: 'magnet', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Buzdolabı Magneti', price: 0, mockup: { shape: 'rect', wRatio: 1, hRatio: 1.4, padding: 2, bgColor: '#fff', frameColor: '#ddd' } },
        { id: 'anahtarlik', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Akrilik Anahtarlık', price: 0, mockup: { shape: 'round', wRatio: 1, hRatio: 1, padding: 2, frameColor: '#ccc' } },
        { id: 'puzzle', category: 'hediye', categoryLabel: 'Hediyelik', name: 'Fotoğraflı Yapboz', price: 0, mockup: { shape: 'puzzle', wRatio: 4, hRatio: 3, padding: 0 } },

        // Kategori 4: Kırtasiye & Paketler
        { id: 'takvim', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Masa Takvimi', price: 0, mockup: { shape: 'calendar', wRatio: 1.5, hRatio: 1, bgColor: '#fff' } },
        { id: 'kitap-ayraci', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Kitap Ayracı', price: 0, mockup: { shape: 'rect', wRatio: 1, hRatio: 3, padding: 2, bgColor: '#fff' } },
        { id: 'vesikalik', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Vesikalık Seti', price: 0, mockup: { shape: 'grid', wRatio: 1.5, hRatio: 1, padding: 5, bgColor: '#fff' } },
        { id: 'paket-aile', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Aile Paketi', price: 0, mockup: { shape: 'bundle', text: 'Aile Paketi' } },
        { id: 'paket-buyukanne', category: 'kirtasiye', categoryLabel: 'Paketler', name: 'Büyükanne Paketi', price: 0, mockup: { shape: 'bundle', text: 'Büyükanne Pkt.' } }
    ];

    const CAT_ICONS = {
        baski: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>',
        duvar: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>',
        hediye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>',
        kirtasiye: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right:5px;vertical-align:-2px;"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path></svg>'
    };

    let currentSchool = null;
    let selectedPhotos = new Set();
    let gLightboxInstance = null;
    let activeLightboxPhotoId = null;
    let activeLightboxPhotoUrl = null;
    let activeLightboxThumbUrl = null;

    // ==========================================
    // MODULE 1: PinGate
    // ==========================================
    const PinGate = {
        init() {
            const urlParams = new URLSearchParams(window.location.search);
            const schoolSlug = urlParams.get('okul');
            
            if (!schoolSlug) {
                document.getElementById('galleryMain').innerHTML = '<div class="container" style="padding-top:150px;text-align:center;"><h2>Hata: Okul bilgisi bulunamadı.</h2><p>Lütfen size gönderilen linki kontrol edin.</p></div>';
                document.getElementById('galleryMain').classList.remove('hidden');
                document.getElementById('pinGate').classList.add('hidden');
                return;
            }

            fetch('gallery-config.json')
                .then(res => res.json())
                .then(data => {
                    const school = data.schools.find(s => s.slug === schoolSlug);
                    if (!school) throw new Error('Okul bulunamadı');
                    
                    currentSchool = school;
                    document.getElementById('schoolNameTitle').textContent = school.name;
                    
                    const btn = document.getElementById('pinSubmitBtn');
                    const input = document.getElementById('pinInput');
                    
                    btn.addEventListener('click', () => this.verifyPin(input.value));
                    input.addEventListener('keypress', (e) => {
                        if (e.key === 'Enter') this.verifyPin(input.value);
                    });
                })
                .catch(err => {
                    document.getElementById('galleryMain').innerHTML = `<div class="container" style="padding-top:150px;text-align:center;"><h2>Hata</h2><p>${err.message}</p></div>`;
                    document.getElementById('galleryMain').classList.remove('hidden');
                    document.getElementById('pinGate').classList.add('hidden');
                });
        },
        
        verifyPin(inputPin) {
            const errorEl = document.getElementById('pinError');
            if (inputPin === currentSchool.pin) {
                document.getElementById('pinGate').classList.add('hidden');
                document.getElementById('galleryMain').classList.remove('hidden');
                GalleryLoader.init();
            } else {
                errorEl.style.display = 'block';
                setTimeout(() => errorEl.style.display = 'none', 3000);
            }
        }
    };

    // ==========================================
    // MODULE 2: GalleryLoader
    // ==========================================
    const GalleryLoader = {
        loadedCount: 0,
        pageSize: 50,
        
        init() {
            document.getElementById('galleryTitle').textContent = currentSchool.name;
            document.getElementById('gallerySubtitle').textContent = `${currentSchool.photos.length} fotoğraf`;
            
            this.loadMore();
            
            // Setup Intersection Observer for infinite scroll
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && this.loadedCount < currentSchool.photos.length) {
                    this.loadMore();
                }
            }, { rootMargin: '200px' });
            
            observer.observe(document.getElementById('loadingSpinner'));
            
            // Select All logic
            document.getElementById('selectAllBtn').addEventListener('click', (e) => {
                const isAllSelected = selectedPhotos.size === currentSchool.photos.length;
                if (isAllSelected) {
                    selectedPhotos.clear();
                    document.querySelectorAll('.gallery-card').forEach(c => c.classList.remove('selected'));
                    e.target.textContent = 'Tümünü Seç';
                } else {
                    currentSchool.photos.forEach(p => selectedPhotos.add(p.id));
                    document.querySelectorAll('.gallery-card').forEach(c => c.classList.add('selected'));
                    e.target.textContent = 'Seçimi Temizle';
                }
                this.updateActionBar();
            });

            // Setup download button
            document.getElementById('downloadBtn').addEventListener('click', () => BulkDownloader.download());

            // Setup View Toggles
            const viewGridBtn = document.getElementById('viewGridBtn');
            const viewLargeBtn = document.getElementById('viewLargeBtn');
            const grid = document.getElementById('galleryGrid');

            if (viewGridBtn && viewLargeBtn) {
                viewGridBtn.addEventListener('click', () => {
                    grid.classList.remove('view-large');
                    viewGridBtn.classList.add('active');
                    viewGridBtn.style.background = '#fff';
                    viewGridBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    viewLargeBtn.classList.remove('active');
                    viewLargeBtn.style.background = 'transparent';
                    viewLargeBtn.style.boxShadow = 'none';
                });
                
                viewLargeBtn.addEventListener('click', () => {
                    grid.classList.add('view-large');
                    viewLargeBtn.classList.add('active');
                    viewLargeBtn.style.background = '#fff';
                    viewLargeBtn.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
                    viewGridBtn.classList.remove('active');
                    viewGridBtn.style.background = 'transparent';
                    viewGridBtn.style.boxShadow = 'none';
                });
            }
        },
        
        loadMore() {
            const grid = document.getElementById('galleryGrid');
            const spinner = document.getElementById('loadingSpinner');
            spinner.style.display = 'block';
            
            const toLoad = currentSchool.photos.slice(this.loadedCount, this.loadedCount + this.pageSize);
            
            toLoad.forEach(photo => {
                const card = document.createElement('div');
                card.className = `gallery-card ${selectedPhotos.has(photo.id) ? 'selected' : ''}`;
                card.dataset.id = photo.id;
                
                const fullThumbUrl = PHOTO_BASE_URL + currentSchool.basePath + photo.thumb;
                
                card.innerHTML = `
                    <img src="${fullThumbUrl}" loading="lazy" alt="Fotoğraf">
                    <div class="card-overlay">
                        <div class="card-checkbox"></div>
                        <div class="card-actions">
                            <button class="card-btn btn-view" title="Büyüt">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>
                `;
                
                // Checkbox toggle
                card.addEventListener('click', (e) => {
                    if (e.target.closest('.btn-view')) return; // handled below
                    
                    if (selectedPhotos.has(photo.id)) {
                        selectedPhotos.delete(photo.id);
                        card.classList.remove('selected');
                    } else {
                        selectedPhotos.add(photo.id);
                        card.classList.add('selected');
                    }
                    this.updateActionBar();
                });
                
                // View button (GLightbox)
                card.querySelector('.btn-view').addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.openLightbox(photo.id);
                });
                
                grid.appendChild(card);
            });
            
            this.loadedCount += toLoad.length;
            if (this.loadedCount >= currentSchool.photos.length) {
                spinner.style.display = 'none';
            }
        },
        
        updateActionBar() {
            const bar = document.getElementById('actionBar');
            const count = document.getElementById('selectedCount');
            count.textContent = selectedPhotos.size;
            
            if (selectedPhotos.size > 0) {
                bar.classList.remove('hidden');
            } else {
                bar.classList.add('hidden');
            }
            
            const selectAllBtn = document.getElementById('selectAllBtn');
            if (selectedPhotos.size === currentSchool.photos.length && currentSchool.photos.length > 0) {
                selectAllBtn.textContent = 'Seçimi Temizle';
            } else {
                selectAllBtn.textContent = 'Tümünü Seç';
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
            
            // İlk slayt değerlerini hemen set et
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
                // İlk slayt mockup render
                setTimeout(() => ProductBar.updateMockups(activeLightboxPhotoUrl), 100);
            });
            
            gLightboxInstance.on('slide_changed', ({ current }) => {
                const slide = elements[current.index];
                activeLightboxPhotoId = slide.photoId;
                activeLightboxPhotoUrl = slide.href;
                activeLightboxThumbUrl = slide.thumbUrl;
                ProductBar.updateMockups(activeLightboxPhotoUrl);
            });
            
            gLightboxInstance.on('close', () => {
                ProductBar.hide();
                document.body.classList.remove('shop-bar-minimized');
            });
            
            gLightboxInstance.open();
        }
    };

    // ==========================================
    // MODULE 3: BulkDownloader
    // ==========================================
    const BulkDownloader = {
        async download() {
            if (selectedPhotos.size === 0) return;
            if (selectedPhotos.size > MAX_ZIP_PHOTOS) {
                alert(`Lütfen tek seferde en fazla ${MAX_ZIP_PHOTOS} fotoğraf seçin. (Şu an: ${selectedPhotos.size})`);
                return;
            }
            
            const overlay = document.getElementById('downloadOverlay');
            const status = document.getElementById('downloadStatus');
            const bar = document.getElementById('downloadProgressBar');
            
            overlay.classList.remove('hidden');
            let completed = 0;
            const total = selectedPhotos.size;
            status.textContent = `0 / ${total}`;
            bar.style.width = '0%';
            
            const zip = new JSZip();
            const folder = zip.folder(currentSchool.slug + "-fotograflar");
            
            try {
                const photosToDownload = currentSchool.photos.filter(p => selectedPhotos.has(p.id));
                
                for (const photo of photosToDownload) {
                    const url = PHOTO_BASE_URL + currentSchool.basePath + photo.original;
                    const response = await fetch(url);
                    const blob = await response.blob();
                    
                    // Dosya ismini orijinal path'den al veya ID kullan
                    const filename = photo.original.split('/').pop() || `${photo.id}.jpg`;
                    folder.file(filename, blob);
                    
                    completed++;
                    status.textContent = `${completed} / ${total}`;
                    bar.style.width = `${(completed / total) * 100}%`;
                }
                
                status.textContent = "ZIP oluşturuluyor...";
                const zipContent = await zip.generateAsync({ type: "blob" });
                saveAs(zipContent, `${currentSchool.slug}-fotograflar.zip`);
                
            } catch (err) {
                console.error("İndirme hatası:", err);
                alert("İndirme sırasında bir hata oluştu. Lütfen tekrar deneyin.");
            } finally {
                setTimeout(() => overlay.classList.add('hidden'), 1000);
            }
        }
    };

    // ==========================================
    // MODULE 4: ProductBar & MockupRenderer
    // ==========================================
    const ProductBar = {
        DOM_ID: 'kpsProductBar',
        currentCategory: 'baski',
        
        init() {
            const existing = document.getElementById(this.DOM_ID);
            if (existing) {
                existing.classList.add('active');
                existing.classList.remove('minimized');
                return;
            }
            
            // Build categories
            const categories = [...new Set(PRODUCTS.map(p => p.category))];
            const catLabels = {};
            PRODUCTS.forEach(p => catLabels[p.category] = p.categoryLabel);
            
            const wrapper = document.createElement('div');
            wrapper.id = this.DOM_ID;
            wrapper.className = 'shop-bar-wrapper active';
            
            // Header area for toggle
            let headerHtml = `
                <div class="shop-bar-header" style="text-align:center; padding-bottom:10px;">
                    <button id="shopBarToggleBtn" style="background:none; border:none; color:var(--text-light); font-weight:600; font-family:'Outfit'; font-size:13px; cursor:pointer; display:inline-flex; align-items:center; gap:5px;">
                        <span>Ürün Seçenekleri</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </button>
                </div>
            `;
            
            // Tabs
            let tabsHtml = '<div class="shop-tabs" id="shopBarContentArea">';
            categories.forEach(cat => {
                const icon = CAT_ICONS[cat] || '';
                tabsHtml += `<button class="shop-tab ${cat === this.currentCategory ? 'active' : ''}" data-cat="${cat}">${icon}${catLabels[cat]}</button>`;
            });
            tabsHtml += '</div>';
            
            // Products Container
            let productsHtml = '<div class="shop-products" id="shopProductsContainer"></div>';
            
            wrapper.innerHTML = headerHtml + tabsHtml + productsHtml;
            document.body.appendChild(wrapper);
            
            // Toggle Logic
            const toggleBtn = document.getElementById('shopBarToggleBtn');
            toggleBtn.addEventListener('click', () => {
                wrapper.classList.toggle('minimized');
                const isMinimized = wrapper.classList.contains('minimized');
                document.body.classList.toggle('shop-bar-minimized', isMinimized);
                const iconPath = isMinimized ? '<polyline points="18 15 12 9 6 15"></polyline>' : '<polyline points="6 9 12 15 18 9"></polyline>';
                toggleBtn.querySelector('svg').innerHTML = iconPath;
            });

            // Event Listeners
            wrapper.querySelectorAll('.shop-tab').forEach(tab => {
                tab.addEventListener('click', (e) => {
                    wrapper.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                    e.target.classList.add('active');
                    this.currentCategory = e.target.dataset.cat;
                    this.renderProducts();
                    if(activeLightboxPhotoUrl) this.updateMockups(activeLightboxPhotoUrl);
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
                        <canvas id="mockup-${p.id}" width="200" height="200"></canvas>
                        <h4 title="${p.name}">${p.name}</h4>
                        <div class="price">₺${p.price}</div>
                        <button class="btn-add" data-pid="${p.id}">Sepete Ekle</button>
                    </div>
                `;
            });
            
            container.innerHTML = html;
            
            // Add to cart listeners
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
            
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                filtered.forEach(p => {
                    const canvas = document.getElementById(`mockup-${p.id}`);
                    if(canvas) MockupRenderer.render(canvas, img, p.mockup);
                });
            };
            img.src = photoUrl;
        },
        
        hide() {
            const bar = document.getElementById(this.DOM_ID);
            if (bar) bar.classList.remove('active');
        }
    };

    const MockupRenderer = {
        render(canvas, img, config) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            const cw = canvas.width;
            const ch = canvas.height;
            
            // Basic centering logic
            const pad = config.padding || 0;
            
            if (config.shape === 'bundle') {
                ctx.fillStyle = '#f0f0f0';
                ctx.fillRect(0,0,cw,ch);
                ctx.fillStyle = '#333';
                ctx.font = '16px Outfit';
                ctx.textAlign = 'center';
                ctx.fillText(config.text, cw/2, ch/2);
                return;
            }

            let drawW = cw - (pad*2);
            let drawH = ch - (pad*2);
            
            // Adjust based on config ratio
            if (config.wRatio && config.hRatio) {
                const ratio = config.wRatio / config.hRatio;
                if (drawW / drawH > ratio) {
                    drawW = drawH * ratio;
                } else {
                    drawH = drawW / ratio;
                }
            }
            
            const dx = (cw - drawW) / 2;
            const dy = (ch - drawH) / 2;

            // Background
            if (config.bgColor) {
                ctx.fillStyle = config.bgColor;
                ctx.fillRect(dx, dy, drawW, drawH);
            }

            // Draw Image (Cover)
            const imgRatio = img.width / img.height;
            const targetRatio = drawW / drawH;
            
            let sx = 0, sy = 0, sw = img.width, sh = img.height;
            
            if (imgRatio > targetRatio) {
                sw = img.height * targetRatio;
                sx = (img.width - sw) / 2;
            } else {
                sh = img.width / targetRatio;
                sy = (img.height - sh) / 2;
            }
            
            if (config.shape === 'round') {
                ctx.save();
                ctx.beginPath();
                ctx.arc(cw/2, ch/2, Math.min(drawW, drawH)/2, 0, Math.PI * 2);
                ctx.clip();
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, drawW, drawH);
                ctx.restore();
            } else {
                ctx.drawImage(img, sx, sy, sw, sh, dx, dy, drawW, drawH);
            }

            // Frame / Border
            if (config.frameColor) {
                ctx.strokeStyle = config.frameColor;
                ctx.lineWidth = 4;
                if (config.shape === 'round') {
                    ctx.beginPath();
                    ctx.arc(cw/2, ch/2, Math.min(drawW, drawH)/2, 0, Math.PI * 2);
                    ctx.stroke();
                } else {
                    ctx.strokeRect(dx, dy, drawW, drawH);
                }
            }
            
            // Mockup overlays (simple visual hints)
            if (config.shape === 'mug') {
                // draw a handle hint
                ctx.beginPath();
                ctx.arc(dx + drawW, dy + drawH/2, drawW*0.2, -Math.PI/2, Math.PI/2);
                ctx.strokeStyle = config.bgColor || '#fff';
                ctx.lineWidth = 10;
                ctx.stroke();
            }
            
            if (config.shape === 'grid') {
                // draw cross lines
                ctx.strokeStyle = '#fff';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(dx + drawW/2, dy);
                ctx.lineTo(dx + drawW/2, dy + drawH);
                ctx.moveTo(dx, dy + drawH/2);
                ctx.lineTo(dx + drawW, dy + drawH/2);
                ctx.stroke();
            }
        }
    };

    // ==========================================
    // MODULE 5: Cart
    // ==========================================
    const Cart = {
        items: [],
        
        init() {
            const saved = localStorage.getItem('kps_cart');
            if (saved) {
                try { this.items = JSON.parse(saved); } catch(e){}
            }
            
            this.updateUI();
            
            // Listeners
            document.getElementById('cartFab').addEventListener('click', () => {
                document.getElementById('cartPanel').classList.add('active');
                document.getElementById('cartOverlay').classList.add('active');
                this.renderItems();
            });
            
            const closeCart = () => {
                document.getElementById('cartPanel').classList.remove('active');
                document.getElementById('cartOverlay').classList.remove('active');
            };
            
            document.getElementById('closeCartBtn').addEventListener('click', closeCart);
            document.getElementById('cartOverlay').addEventListener('click', closeCart);
            
            document.getElementById('checkoutBtn').addEventListener('click', () => {
                if(this.items.length === 0) return;
                closeCart();
                Checkout.open();
            });
        },
        
        save() {
            localStorage.setItem('kps_cart', JSON.stringify(this.items));
            this.updateUI();
            // Sadece panel açıksa renderItems çağır
            if (document.getElementById('cartPanel').classList.contains('active')) {
                this.renderItems();
            }
        },
        
        add(photoId, photoUrl, thumbUrl, product) {
            // Check if already exists
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
    
    // Global listeners for inline onclick handlers in cart
    document.addEventListener('cartQty', (e) => Cart.updateQty(e.detail.id, e.detail.d));
    document.addEventListener('cartRm', (e) => Cart.remove(e.detail));

    // ==========================================
    // MODULE 6: Checkout
    // ==========================================
    const Checkout = {
        init() {
            const modal = document.getElementById('checkoutModal');
            document.getElementById('closeCheckoutBtn').addEventListener('click', () => {
                modal.classList.add('hidden');
            });
            
            document.getElementById('closeSuccessBtn').addEventListener('click', () => {
                document.getElementById('successModal').classList.add('hidden');
            });
            
            const form = document.getElementById('checkoutForm');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const btn = document.getElementById('submitOrderBtn');
                const origText = btn.innerHTML;
                btn.innerHTML = 'Gönderiliyor...';
                btn.disabled = true;
                
                // Parse cart to readable string
                let orderDetails = "SİPARİŞ DETAYI\n-----------------\n";
                let total = 0;
                Cart.items.forEach((item, i) => {
                    orderDetails += `${i+1}. ${item.productName} (Foto: ${item.photoId}) - Adet: ${item.qty} - Fiyat: ₺${item.price * item.qty}\n`;
                    total += (item.price * item.qty);
                });
                orderDetails += `-----------------\nTOPLAM: ₺${total}`;
                
                document.getElementById('cartDataInput').value = orderDetails;
                
                try {
                    const response = await fetch(form.action, {
                        method: form.method,
                        body: new FormData(form),
                        headers: { 'Accept': 'application/json' }
                    });
                    if (response.ok) {
                        modal.classList.add('hidden');
                        document.getElementById('successModal').classList.remove('hidden');
                        Cart.clear();
                        form.reset();
                    } else {
                        alert('Bir hata oluştu, lütfen tekrar deneyin.');
                    }
                } catch (error) {
                    alert('Sunucu hatası, lütfen tekrar deneyin.');
                } finally {
                    btn.innerHTML = origText;
                    btn.disabled = false;
                }
            });
        },
        
        open() {
            document.getElementById('checkoutModal').classList.remove('hidden');
        }
    };

    // ==========================================
    // INITIALIZATION
    // ==========================================
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('pinGate')) {
            PinGate.init();
            Cart.init();
            Checkout.init();
        }
    });

})();
