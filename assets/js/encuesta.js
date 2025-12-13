function generarId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function mostrarAlerta(tipo, mensaje) {
    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} position-fixed top-0 end-0 m-4`;
    alerta.style.zIndex = 9999;
    alerta.innerHTML = `<strong>${mensaje}</strong>`;
    document.body.appendChild(alerta);
    setTimeout(() => alerta.remove(), 4000);
}

// -------- ENCUESTA 1 --------
function guardarEncuesta1() {
    const form = document.getElementById("encuesta1");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const datos = Object.fromEntries(new FormData(form));
    datos.id = generarId();
    datos.fecha = new Date().toLocaleString("es-PA");

    guardarRespuesta(datos, 1);
    mostrarAlerta("success", "Encuesta 1 guardada");
    form.reset();
}

// -------- ENCUESTA 2 --------
function guardarEncuesta2() {
    const form = document.getElementById("encuesta2");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const datos = Object.fromEntries(new FormData(form));
    datos.id = generarId();
    datos.fecha = new Date().toLocaleString("es-PA");

    guardarRespuesta(datos, 2);
    mostrarAlerta("success", "Encuesta 2 guardada");
    form.reset();
}

// -------- ENCUESTA 3 --------
function guardarEncuesta3() {
    const form = document.getElementById("encuesta3");
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const datos = Object.fromEntries(new FormData(form));
    datos.id = generarId();
    datos.fecha = new Date().toLocaleString("es-PA");

    guardarRespuesta(datos, 3);
    mostrarAlerta("success", "Encuesta 3 guardada");
    form.reset();
}

// EXPORTAR
window.guardarEncuesta1 = guardarEncuesta1;
window.guardarEncuesta2 = guardarEncuesta2;
window.guardarEncuesta3 = guardarEncuesta3;
