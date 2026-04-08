document.addEventListener("DOMContentLoaded", () => {
    // 1. Menú Móvil
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const headerCtas = document.getElementById('headerCtas');

    if (mobileMenuBtn && navLinks && headerCtas) {
        // Abrir y cerrar al tocar las 3 rayitas
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');
            headerCtas.classList.toggle('nav-active');
        });

        // Cerrar al tocar un enlace
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                headerCtas.classList.remove('nav-active');
            });
        });
    }

    // 2. Marcar página activa en el Menú
    const currentPage = window.location.pathname.split("/").pop();
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage || (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });


    // 4. Guardias
    const wrapperAlertas = document.getElementById('wrapper-alertas-guardia');
    if (wrapperAlertas) {
        const misGuardias = [
            { fecha: "2026-05-15", tipo: "nocturna" },
            { fecha: "2026-04-11", tipo: "diurna" },
            { fecha: "2026-05-08", tipo: "diurna" },
            { fecha: "2026-06-04", tipo: "diurna" }
        ];

        const hoy = new Date();
        const año = hoy.getFullYear();
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const diaStr = String(hoy.getDate()).padStart(2, '0');
        const diaSemana = hoy.getDay();
        const fechaHoyFormatoJSON = `${año}-${mes}-${diaStr}`;
        
        let guardiaHoy = misGuardias.find(g => g.fecha === fechaHoyFormatoJSON);

        if (guardiaHoy) {
            if (guardiaHoy.tipo === "diurna") {
                document.getElementById('alerta-guardia-diurna').style.display = 'block';
                document.getElementById('horario-guardia-diurna-fin').innerText = "22:00";
            } else if (guardiaHoy.tipo === "nocturna") {
                document.getElementById('alerta-guardia-nocturna').style.display = 'block';
                const esFinDeSemana = (diaSemana === 0 || diaSemana === 6);
                document.getElementById('horario-guardia-nocturna-fin').innerText = esFinDeSemana ? "10:00" : "9:30";
            }
        }

        const listaProx = document.getElementById('lista-proximas-guardias');
        const secProx = document.getElementById('proximas-guardias-section');
        
        if (listaProx && secProx) {
            const futuras = misGuardias.filter(g => g.fecha >= fechaHoyFormatoJSON).sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
            if (futuras.length > 0) {
                secProx.style.display = 'block';
                futuras.forEach(g => {
                    const fechaObj = new Date(g.fecha);
                    let str = fechaObj.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
                    str = str.charAt(0).toUpperCase() + str.slice(1);
                    const tipoStr = g.tipo === "diurna" ? "DÍA (9:30-22h)" : "NOCHE (22-9:30h)";
                    const li = document.createElement('li');
                    li.style.cssText = "margin-bottom: 15px; border-bottom: 1px solid #e2e8f0; padding-bottom: 10px;";
                    li.innerHTML = `${str} | <span style="font-weight:normal; color:#475569">${tipoStr}</span>`;
                    listaProx.appendChild(li);
                });
            }
        }
    }
});