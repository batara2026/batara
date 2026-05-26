/* ================================================
   RIHLAH AKBAR JILID 2 - BINJAI MENGAJI
   Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // -----------------------------------------------
    // 1. Navbar Scroll Effect
    // -----------------------------------------------
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // initial check


    // -----------------------------------------------
    // 2. Smooth Scroll for Anchor Links
    // -----------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                // Bounding rect + pageYOffset gives absolute document position on all screen sizes
                var absoluteTop = targetEl.getBoundingClientRect().top + window.pageYOffset;
                var offsetTop = absoluteTop - 70; // offset for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile navbar if open (robust hide mechanism for BS5)
                var navCollapse = document.querySelector('.navbar-collapse');
                if (navCollapse && navCollapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    } else {
                        var collapseInstance = new bootstrap.Collapse(navCollapse, { toggle: false });
                        collapseInstance.hide();
                    }
                }
            }
        });
    });


    // -----------------------------------------------
    // 3. Gallery Lightbox
    // -----------------------------------------------
    var lightboxOverlay = document.getElementById('lightboxOverlay');
    var lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.gallery-img').forEach(function (img) {
        img.addEventListener('click', function () {
            if (lightboxOverlay && lightboxImg) {
                lightboxImg.src = this.src;
                lightboxImg.alt = this.alt;
                lightboxOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', function (e) {
            if (e.target !== lightboxImg) {
                closeLightbox();
            }
        });
    }

    var lightboxCloseBtn = document.getElementById('lightboxClose');
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        if (lightboxOverlay) {
            lightboxOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    }


    // -----------------------------------------------
    // 4. Jadwal Tab Fade Effect (Diambil alih secara native & mulus oleh Bootstrap 5 CSS .fade)
    // -----------------------------------------------


    // 5. Scroll Reveal Animation (Intersection Observer)
    // -----------------------------------------------
    var animatedElements = document.querySelectorAll('.scroll-animate');

    if ('IntersectionObserver' in window) {
        var isMobile = window.innerWidth < 768;
        var observerOptions = {
            threshold: isMobile ? 0.02 : 0.10, // lower threshold on mobile for seamless reveal
            rootMargin: isMobile ? '0px 0px -20px 0px' : '0px 0px -40px 0px'
        };
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(function (el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements immediately
        animatedElements.forEach(function (el) {
            el.classList.add('visible');
        });
    }


    // -----------------------------------------------
    // 6. Form WhatsApp Integration
    // -----------------------------------------------
    var btnSubmitWA = document.getElementById('btnSubmitWA');

    if (btnSubmitWA) {
        btnSubmitWA.addEventListener('click', function () {
            var nama = document.getElementById('formNama').value.trim();
            var wa = document.getElementById('formWA').value.trim();
            var paketSelect = document.getElementById('formPaket');
            var paket = paketSelect.value;
            
            // Ambil data detail jumlah peserta
            var ud = parseInt(document.getElementById('formUtamaDewasa').value) || 1;
            var ua = parseInt(document.getElementById('formUtamaAnak').value) || 0;
            var ub = parseInt(document.getElementById('formUtamaBalita').value) || 0;
            var td = parseInt(document.getElementById('formTambahanDewasa').value) || 0;
            var ta = parseInt(document.getElementById('formTambahanAnak').value) || 0;
            var catatan = document.getElementById('formCatatan').value.trim() || 'Tidak ada catatan khusus';

            // Validasi dasar
            if (!nama || !wa || !paket) {
                showFormAlert('Afwan, mohon lengkapi Nama, No. WhatsApp, dan Pilihan Paket terlebih dahulu!');
                return;
            }

            // Hitung harga real-time untuk validasi pesan
            var paketPrice = 0;
            if (paket === 'New Cabin') paketPrice = 650000;
            else if (paket === 'Tenda Pondok') paketPrice = 250000;
            else if (paket === 'Tenda Nyaman') paketPrice = 250000;
            else if (paket === 'Tenda Sedang') paketPrice = 200000;

            var tiketUtamaPrice = (ud * 20000) + (ua * 10000);
            var tiketTambahanPrice = (td * 20000) + (ta * 10000);
            var totalCost = paketPrice + tiketUtamaPrice + tiketTambahanPrice;

            // Format nomor WA (bersihkan karakter non-digit)
            var cleanWA = wa.replace(/\D/g, '');

            // Nomor Admin WhatsApp
            var targetPhone = '6285359090206'; // Admin Binjai Mengaji

            // Buat Kode Booking / Nomor Tiket Unik secara otomatis
            var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
            var ticketCode = 'RA2-';
            for (var i = 0; i < 4; i++) {
                ticketCode += chars.charAt(Math.floor(Math.random() * chars.length));
            }

            // Susun pesan WhatsApp terperinci
            var message = "Assalamu'alaikum Admin Binjai Mengaji,\n" +
                "Saya ingin mendaftar Rihlah Akbar Jilid 2 (1447H/2026M).\n\n" +
                "*--- DATA REGISTER PESERTA ---*\n" +
                "*Kode Booking:* " + ticketCode + "\n" +
                "*Nama Lengkap:* " + nama + "\n" +
                "*No. WhatsApp:* " + cleanWA + "\n" +
                "*Pilihan Paket:* " + paket + "\n\n" +
                "*--- RINCIAN PESERTA ---*\n" +
                "- Peserta Utama: " + ud + " Dewasa, " + ua + " Anak, " + ub + " Balita\n" +
                "- Tambahan Peserta: " + td + " Dewasa, " + ta + " Anak\n" +
                "- Catatan Khusus: " + catatan + "\n\n" +
                "*--- RINCIAN ESTIMASI BIAYA ---*\n" +
                "- Biaya Paket (" + paket + "): Rp " + paketPrice.toLocaleString('id-ID') + "\n" +
                "- Tiket Utama: Rp " + tiketUtamaPrice.toLocaleString('id-ID') + "\n" +
                "- Tiket Tambahan: Rp " + tiketTambahanPrice.toLocaleString('id-ID') + "\n" +
                "*TOTAL ESTIMASI BIAYA:* Rp " + totalCost.toLocaleString('id-ID') + "\n\n" +
                "*Rekening Pembayaran:*\n" +
                "Bank Muamalat Indonesia\n" +
                "No. Rek: 4670016812\n" +
                "A.n. Raden Arie Sandriawan Wijaya\n\n" +
                "Mohon konfirmasi setelah transfer dilakukan. Syukron.";

            var waURL = 'https://api.whatsapp.com/send?phone=' + targetPhone + '&text=' + encodeURIComponent(message);

            // Buat objek data pendaftaran dalam format JSON
            var registrationData = {
                ticketCode: ticketCode,
                nama: nama,
                wa: cleanWA,
                paket: paket,
                pesertaUtama: {
                    dewasa: ud,
                    anak: ua,
                    balita: ub
                },
                pesertaTambahan: {
                    dewasa: td,
                    anak: ta
                },
                catatan: catatan,
                totalCost: totalCost,
                timestamp: new Date().toLocaleString('id-ID')
            };

            // Simpan data pendaftaran ke database localStorage (sebagai JSON string)
            var currentRegs = JSON.parse(localStorage.getItem('rihlah_registrations') || '[]');
            currentRegs.push(registrationData);
            localStorage.setItem('rihlah_registrations', JSON.stringify(currentRegs));

            // Perbarui state registrations Alpine.js secara reaktif di DOM
            try {
                var bodyEl = document.querySelector('body');
                if (bodyEl) {
                    if (bodyEl.__x && bodyEl.__x.$data) {
                        bodyEl.__x.$data.registrations = currentRegs;
                    } else if (bodyEl._x_dataStack && bodyEl._x_dataStack.length > 0) {
                        bodyEl._x_dataStack[0].registrations = currentRegs;
                    }
                }
            } catch (syncErr) {
                console.log('Gagal memperbarui state Alpine secara instan:', syncErr);
            }

            // Buat file JSON dan trigger download otomatis untuk file pendaftaran ini
            try {
                var blob = new Blob([JSON.stringify(registrationData, null, 4)], { type: 'application/json' });
                var downloadUrl = URL.createObjectURL(blob);
                var downloadLink = document.createElement('a');
                downloadLink.href = downloadUrl;
                downloadLink.download = 'pendaftaran_' + ticketCode + '.json';
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
                URL.revokeObjectURL(downloadUrl);
            } catch (downloadErr) {
                console.error('Gagal men-download JSON pendaftaran:', downloadErr);
            }

            // Buka WhatsApp di tab baru
            window.open(waURL, '_blank');

            // Redirect tab ini ke halaman tiket.html dengan parameter lengkap untuk cetak langsung
            var ticketURL = 'tiket.html?code=' + encodeURIComponent(ticketCode) +
                '&nama=' + encodeURIComponent(nama) +
                '&wa=' + encodeURIComponent(cleanWA) +
                '&paket=' + encodeURIComponent(paket) +
                '&ud=' + ud + '&ua=' + ua + '&ub=' + ub +
                '&td=' + td + '&ta=' + ta +
                '&catatan=' + encodeURIComponent(catatan);

            setTimeout(function() {
                window.location.href = ticketURL;
            }, 500);
        });
    }


    // -----------------------------------------------
    // 7. Form Alert Helper
    // -----------------------------------------------
    function showFormAlert(message) {
        // Cek apakah sudah ada alert sebelumnya
        var existingAlert = document.getElementById('formValidationAlert');
        if (existingAlert) existingAlert.remove();

        var alertDiv = document.createElement('div');
        alertDiv.id = 'formValidationAlert';
        alertDiv.className = 'alert alert-warning alert-dismissible fade show mt-3';
        alertDiv.setAttribute('role', 'alert');
        alertDiv.innerHTML = '<i class="fa fa-exclamation-triangle me-2"></i>' + message +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';

        var form = document.getElementById('rihlahRegisterForm');
        if (form) {
            form.insertBefore(alertDiv, form.firstChild);
            // Auto-dismiss setelah 5 detik
            setTimeout(function () {
                if (alertDiv.parentNode) alertDiv.remove();
            }, 5000);
        }
    }


    // -----------------------------------------------
    // 8. Bank Account Copy Interaction (Helper)
    // -----------------------------------------------
    window.copyRekening = function (number, buttonEl) {
        if (!navigator.clipboard) {
            // Fallback for older browsers
            var tempInput = document.createElement("input");
            tempInput.value = number;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand("copy");
            document.body.removeChild(tempInput);
            showFeedback(buttonEl);
            return;
        }

        navigator.clipboard.writeText(number).then(function () {
            showFeedback(buttonEl);
        }).catch(function (err) {
            console.error('Gagal menyalin rekening: ', err);
        });

        function showFeedback(btn) {
            var originalHTML = btn.innerHTML;
            var originalStyle = btn.getAttribute('style');
            btn.innerHTML = '<i class="fa fa-check me-1"></i> Tersalin!';
            btn.style.backgroundColor = '#28a745';
            btn.style.color = 'white';
            btn.style.border = 'none';
            
            setTimeout(function () {
                btn.innerHTML = originalHTML;
                if (originalStyle) {
                    btn.setAttribute('style', originalStyle);
                } else {
                    btn.removeAttribute('style');
                }
            }, 2000);
        }
    };

    // -----------------------------------------------
    // 9. Floating Back to Top Button Toggle
    // -----------------------------------------------
    const backToTopBtn = document.getElementById('backToTop');

    if (backToTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 200) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});
