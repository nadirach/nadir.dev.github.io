document.addEventListener('DOMContentLoaded', function () {

    // ===== PAGE LOADER =====
    var loader = document.getElementById('pageLoader');
    if (loader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                loader.classList.add('hidden');
            }, 800);
        });
        // Fallback si le load est déjà passé
        setTimeout(function () {
            loader.classList.add('hidden');
        }, 3000);
    }

    // ===== CURSEUR PERSONNALISÉ =====
    var cursor = document.getElementById('cursor');
    var cursorDot = document.getElementById('cursorDot');

    if (cursor && cursorDot && window.innerWidth > 768) {
        document.addEventListener('mousemove', function (e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        // Hover effect sur les éléments cliquables
        var hoverTargets = document.querySelectorAll('a, button, .skill-card, .project-card, .service-card, .language-card, .btn, input, textarea');
        hoverTargets.forEach(function (el) {
            el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
            el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
        });
    }

    // ===== PARTICULES =====
    var particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        var colors = ['#6c5ce7', '#00cec9', '#fd79a8', '#a29bfe'];
        for (var i = 0; i < 25; i++) {
            var p = document.createElement('div');
            p.className = 'particle';
            var size = Math.random() * 6 + 2;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.left = Math.random() * 100 + '%';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.animationDuration = (Math.random() * 20 + 15) + 's';
            p.style.animationDelay = (Math.random() * 20) + 's';
            particlesContainer.appendChild(p);
        }
    }

    // ===== THEME TOGGLE =====
    var themeToggle = document.getElementById('themeToggle');
    var themeIcon = document.getElementById('themeIcon');
    var savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeIcon) themeIcon.className = 'bi-moon-fill';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            document.body.classList.toggle('light-mode');
            var isLight = document.body.classList.contains('light-mode');
            if (themeIcon) {
                themeIcon.className = isLight ? 'bi-moon-fill' : 'bi-sun-fill';
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // ===== NAVBAR SCROLL + ACTIVE LINK =====
    var navbar = document.getElementById('navbar');
    var scrollTopBtn = document.getElementById('scrollTop');

    window.addEventListener('scroll', function () {
        if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
        if (scrollTopBtn) scrollTopBtn.classList.toggle('visible', window.scrollY > 500);

        // Active nav link
        document.querySelectorAll('section[id]').forEach(function (section) {
            var top = section.offsetTop - 200;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');
            if (window.scrollY >= top && window.scrollY < bottom) {
                document.querySelectorAll('.nav-links a').forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) link.classList.add('active');
                });
            }
        });

        animateCounters();
        animateLangBars();
        animateSkillBars();
        revealOnScroll();
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== MENU MOBILE =====
    var menuToggle = document.getElementById('menuToggle');
    var navLinks = document.getElementById('navLinks');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        document.querySelectorAll('.nav-links a').forEach(function (link) {
            link.addEventListener('click', function () {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ===== TYPEWRITER =====
    var typewriterEl = document.getElementById('typewriter');
    if (typewriterEl) {
        var isEnglish = document.documentElement.lang === 'en';
        var words = isEnglish
            ? [
                'Industrial Engineer',
                'Logistics Manager',
                'Web Developer',
                'Graphic Designer',
                'Technology Enthusiast'
            ]
            : [
                'Ingénieur Industriel',
                'Gestionnaire Logistique',
                'Développeur Web',
                'Designer Graphique',
                'Passionné de Technologie'
            ];
        var wordIdx = 0, charIdx = 0, deleting = false;

        function type() {
            var word = words[wordIdx];
            if (deleting) { charIdx--; } else { charIdx++; }
            typewriterEl.textContent = word.substring(0, charIdx);

            var speed = deleting ? 50 : 100;
            if (!deleting && charIdx === word.length) {
                speed = 2000; deleting = true;
            } else if (deleting && charIdx === 0) {
                deleting = false;
                wordIdx = (wordIdx + 1) % words.length;
                speed = 500;
            }
            setTimeout(type, speed);
        }
        type();
    }

    // ===== REVEAL ON SCROLL =====
    function revealOnScroll() {
        var reveals = document.querySelectorAll('.reveal');
        var windowHeight = window.innerHeight;
        for (var i = 0; i < reveals.length; i++) {
            var elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - 80) {
                reveals[i].classList.add('visible');
            }
        }
    }
    window.addEventListener('resize', revealOnScroll);
    revealOnScroll();
    setTimeout(revealOnScroll, 200);

    // ===== COMPTEURS =====
    var countersStarted = false;
    function animateCounters() {
        if (countersStarted) return;
        var statsBar = document.querySelector('.stats-bar');
        if (!statsBar) return;
        var rect = statsBar.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            countersStarted = true;
            document.querySelectorAll('.stat-number').forEach(function (counter) {
                var target = parseInt(counter.getAttribute('data-target'));
                var current = 0;
                var step = Math.max(1, target / 60);
                var interval = setInterval(function () {
                    current += step;
                    if (current >= target) {
                        counter.textContent = target + '+';
                        clearInterval(interval);
                    } else {
                        counter.textContent = Math.floor(current) + '+';
                    }
                }, 30);
            });
        }
    }
    animateCounters();

    // ===== BARRES DE LANGUES =====
    var langAnimated = false;
    function animateLangBars() {
        if (langAnimated) return;
        var langSection = document.getElementById('languages');
        if (!langSection) return;
        var rect = langSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            langAnimated = true;
            document.querySelectorAll('.lang-bar-fill').forEach(function (bar) {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
        }
    }
    animateLangBars();

    // ===== BARRES DE COMPÉTENCES WEB =====
    var skillBarsAnimated = false;
    function animateSkillBars() {
        if (skillBarsAnimated) return;
        var skillSection = document.querySelector('.skills-progress-section');
        if (!skillSection) return;
        var rect = skillSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            skillBarsAnimated = true;
            document.querySelectorAll('.skill-progress-fill').forEach(function (bar) {
                bar.style.width = bar.getAttribute('data-width') + '%';
            });
        }
    }
    animateSkillBars();

    // ===== FORMULAIRE =====
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            var btn = form.querySelector('.btn-submit');
            var originalHTML = btn.innerHTML;

            btn.innerHTML = '<i class="bi-hourglass-split"></i> Envoi en cours...';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            setTimeout(function () {
                btn.innerHTML = '<i class="bi-check-circle-fill"></i> Message envoyé !';
                btn.style.background = 'linear-gradient(135deg, #00cec9, #55efc4)';
                btn.style.opacity = '1';

                setTimeout(function () {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                    form.reset();
                }, 3000);
            }, 2000);
        });
    }

    // ===== ANNÉE FOOTER =====
    if (footerYear) {
        var year = new Date().getFullYear();
        footerYear.textContent = isEnglish
            ? '\u00A9 ' + year + ' Bouchouicha Acheraf Nadir \u2014 All rights reserved'
            : '\u00A9 ' + year + ' Bouchouicha Acheraf Nadir \u2014 Tous droits r\u00E9serv\u00E9s';
    }

});
