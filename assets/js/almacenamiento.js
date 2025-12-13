function guardarRespuesta(datos, numeroEncuesta) {
    const key = `encuesta_${numeroEncuesta}`;
    const respuestas = JSON.parse(localStorage.getItem(key)) || [];
    respuestas.push(datos);
    localStorage.setItem(key, JSON.stringify(respuestas));
    return true;
}

function obtenerRespuestas(numeroEncuesta) {
    return JSON.parse(localStorage.getItem(`encuesta_${numeroEncuesta}`)) || [];
}

function limpiarTodasLasRespuestas() {
    localStorage.clear();
    alert("Todos los datos fueron eliminados");
}

// EXPORTAR
window.guardarRespuesta = guardarRespuesta;
window.obtenerRespuestas = obtenerRespuestas;
window.limpiarTodasLasRespuestas = limpiarTodasLasRespuestas;
