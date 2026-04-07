document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Sticky Trigger
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
        nav.classList.toggle('stuck', window.scrollY > 50);
    });

    // 2. Mobile Menu Handling
    const hamBtn = document.getElementById('hamBtn');
    const mobMenu = document.getElementById('mobMenu');
    const mobOverlay = document.getElementById('mobOverlay');
    const closeMobBtn = document.getElementById('closeMobBtn');

    const toggleMenu = () => {
        mobMenu.classList.toggle('open');
        mobOverlay.classList.toggle('open');
    };

    if (hamBtn) hamBtn.addEventListener('click', toggleMenu);
    if (closeMobBtn) closeMobBtn.addEventListener('click', toggleMenu);
    if (mobOverlay) mobOverlay.addEventListener('click', toggleMenu);
    document.querySelectorAll('.mob-link').forEach(link => {
        link.addEventListener('click', toggleMenu);
    });

    // 3. Formspree Form Submission via Fetch API
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('formBtn');
            const origText = btn.innerHTML;
            btn.innerHTML = '⏳ Gönderiliyor...';
            btn.disabled = true;
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    btn.innerHTML = '✅ Gönderildi!';
                    btn.style.background = 'var(--bento-green)';
                    contactForm.reset();
                } else {
                    btn.innerHTML = '❌ Bir Hata Oluştu';
                    btn.style.background = 'var(--bento-red)';
                }
            } catch (error) {
                btn.innerHTML = '❌ Sunucu Hatası';
                btn.style.background = 'var(--bento-red)';
            }
            setTimeout(() => {
                btn.innerHTML = origText;
                btn.style.background = 'var(--text-dark)';
                btn.disabled = false;
            }, 3500);
        });
    }

    // 4. Scroll Reveal Animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 5. Initialize GLightbox
    if (typeof GLightbox !== 'undefined') {
        GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
    }

    // 6. Gallery Filter System
    const filterBtns = document.querySelectorAll('.filter-btn');
    const photoCards = document.querySelectorAll('.photo-card[data-category]');

    if (filterBtns.length > 0) {
        const photoGrid = document.querySelector('.photo-grid');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.dataset.filter;

                photoCards.forEach(card => {
                    if (filter === 'all' || card.dataset.category === filter) {
                        card.classList.remove('hidden');
                        card.style.position = '';
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // 7. Animated Counter (Count-Up)
    const counters = document.querySelectorAll('.stat-num');
    let countersStarted = false;

    const animateCounter = (el) => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            el.textContent = Math.floor(current).toLocaleString('tr-TR');
        }, 16);
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersStarted) {
                countersStarted = true;
                counters.forEach(counter => animateCounter(counter));
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) counterObserver.observe(statsSection);

    // 8. Pricing Wizard Calculator
    const studentSlider = document.getElementById('studentSlider');
    const studentDisplay = document.getElementById('studentDisplay');
    const serviceChips = document.querySelectorAll('#productChips .chip');
    const droneToggle = document.getElementById('droneToggle');
    const videoToggle = document.getElementById('videoToggle');

    const calcPrice = () => {
        const pMin = document.getElementById('priceMin');
        const pMax = document.getElementById('priceMax');
        if (!pMin || !pMax || !studentSlider) return;
        
        const studentCount = parseInt(studentSlider.value);
        if (studentDisplay) studentDisplay.textContent = studentCount;

        const chips = document.querySelectorAll('#productChips .chip.selected');
        const numProducts = chips.length;
        
        const perStudentBase = numProducts * 500;
        let subtotal = perStudentBase * studentCount;
        
        if (videoToggle && videoToggle.checked) subtotal += 28000;
        if (droneToggle && droneToggle.checked) subtotal += 16000;
        
        if (numProducts === 0 && subtotal === 0) {
            pMin.textContent = "0";
            pMax.textContent = "0";
            return;
        }

        const maxTotal = subtotal;
        const minTotal = Math.floor(subtotal * 0.8);
        
        pMin.textContent = minTotal.toLocaleString('tr-TR');
        pMax.textContent = maxTotal.toLocaleString('tr-TR');
    };

    if (studentSlider) {
        studentSlider.addEventListener('input', calcPrice);
        if (droneToggle) droneToggle.addEventListener('change', calcPrice);
        if (videoToggle) videoToggle.addEventListener('change', calcPrice);

        serviceChips.forEach(chip => {
            chip.addEventListener('click', () => {
                chip.classList.toggle('selected');
                calcPrice();
            });
        });

        calcPrice(); // initial render
    }

    // =============================================
    // 9. PAGE LOADER
    // =============================================
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => pageLoader.classList.add('hidden'), 2000);
        });
    }

    // =============================================
    // 10. PARALLAX FLOATING SHAPES
    // =============================================
    const parallaxShapes = document.querySelectorAll('.parallax-shape');
    if (parallaxShapes.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            parallaxShapes.forEach(shape => {
                const speed = parseFloat(shape.dataset.speed) || 0.03;
                const yOff = scrollY * speed * 30;
                const xOff = Math.sin(scrollY * 0.003) * 20;
                shape.style.transform = `translate(${xOff}px, ${-yOff}px) rotate(${scrollY * speed * 2}deg)`;
            });
        });
    }

    // =============================================
    // 11. TESTIMONIALS CAROUSEL
    // =============================================
    const tmTrack = document.getElementById('testimonialTrack');
    const tmPrev = document.getElementById('tmPrev');
    const tmNext = document.getElementById('tmNext');

    if (tmTrack && tmPrev && tmNext) {
        let tmIndex = 0;
        const tmCards = tmTrack.querySelectorAll('.testimonial-card');
        const tmGap = 24;

        const getCardW = () => tmCards.length ? tmCards[0].offsetWidth + tmGap : 384;
        const getMaxIdx = () => {
            const vis = tmTrack.parentElement.offsetWidth;
            return Math.max(0, Math.ceil((tmCards.length * getCardW() - vis) / getCardW()));
        };
        const scrollTo = (i) => {
            tmIndex = Math.max(0, Math.min(i, getMaxIdx()));
            tmTrack.style.transform = `translateX(-${tmIndex * getCardW()}px)`;
        };

        tmPrev.addEventListener('click', () => scrollTo(tmIndex - 1));
        tmNext.addEventListener('click', () => scrollTo(tmIndex + 1));

        let auto = setInterval(() => {
            tmIndex >= getMaxIdx() ? scrollTo(0) : scrollTo(tmIndex + 1);
        }, 4000);
        tmTrack.addEventListener('mouseenter', () => clearInterval(auto));
        tmTrack.addEventListener('mouseleave', () => {
            auto = setInterval(() => {
                tmIndex >= getMaxIdx() ? scrollTo(0) : scrollTo(tmIndex + 1);
            }, 4000);
        });
    }

    // =============================================
    // 12. BEFORE / AFTER SLIDER
    // =============================================
    const baSlider = document.getElementById('baSlider');
    const baHandle = document.getElementById('baHandle');
    const baAfter = document.getElementById('baAfter');

    if (baSlider && baHandle && baAfter) {
        let dragging = false;
        const update = (x) => {
            const rect = baSlider.getBoundingClientRect();
            let pct = ((x - rect.left) / rect.width) * 100;
            pct = Math.max(5, Math.min(95, pct));
            baAfter.style.clipPath = `inset(0 0 0 ${pct}%)`;
            baHandle.style.left = `${pct}%`;
        };
        baSlider.addEventListener('mousedown', e => { dragging = true; update(e.clientX); });
        window.addEventListener('mousemove', e => { if (dragging) update(e.clientX); });
        window.addEventListener('mouseup', () => { dragging = false; });
        baSlider.addEventListener('touchstart', e => { dragging = true; update(e.touches[0].clientX); }, { passive: true });
        baSlider.addEventListener('touchmove', e => { if (dragging) update(e.touches[0].clientX); }, { passive: true });
        baSlider.addEventListener('touchend', () => { dragging = false; });
    }

    // =============================================
    // 13. MULTI-STEP FORM WIZARD
    // =============================================
    const formNavBtns = document.querySelectorAll('.btn-form-next, .btn-form-prev');
    const formPanels = document.querySelectorAll('.form-panel');
    const formIndicators = document.querySelectorAll('.form-step-indicator');
    const formFill = document.getElementById('formProgressFill');

    if (formNavBtns.length > 0) {
        const goStep = (step) => {
            formPanels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById('formStep' + step);
            if (target) target.classList.add('active');

            formIndicators.forEach(ind => {
                const s = parseInt(ind.dataset.step);
                ind.classList.remove('active', 'done');
                if (s < step) ind.classList.add('done');
                else if (s === step) ind.classList.add('active');
            });
            if (formFill) formFill.style.width = ((step - 1) / 2 * 100) + '%';
        };

        formNavBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const goto = parseInt(btn.dataset.goto);
                // Validate before going forward
                if (goto > 1 && btn.classList.contains('btn-form-next')) {
                    const cur = btn.closest('.form-panel');
                    const reqs = cur.querySelectorAll('[required]');
                    let ok = true;
                    reqs.forEach(inp => {
                        if (!inp.value.trim()) {
                            inp.style.borderColor = 'var(--bento-red)';
                            ok = false;
                            setTimeout(() => inp.style.borderColor = '', 2000);
                        }
                    });
                    if (!ok) return;
                }
                goStep(goto);
            });
        });
    }


    // =============================================
    // 14. PROMO POPUP
    // =============================================
    const promoPopup = document.getElementById('promoPopup');
    if (promoPopup) {
        setTimeout(() => promoPopup.classList.add('show'), 4000);
        document.getElementById('closePopup')?.addEventListener('click', () => promoPopup.classList.remove('show'));
        document.getElementById('popupBtn')?.addEventListener('click', () => promoPopup.classList.remove('show'));
        promoPopup.addEventListener('click', (e) => {
            if(e.target === promoPopup) promoPopup.classList.remove('show');
        });
    }

});
