let workbook = null;
let hojaActual = "TABLA_ORIGINAL";

/* ALERTAS */
function mostrarAlerta(tipo, mensaje) {
    document.querySelectorAll('.alert.fixed-top').forEach(a => a.remove());

    const alerta = document.createElement("div");
    alerta.className = `alert alert-${tipo} alert-dismissible fade show fixed-top mt-5 mx-3`;
    alerta.style.zIndex = "9999";
    alerta.innerHTML = `
        <i class="fas ${tipo === "success" ? "fa-check-circle" : "fa-exclamation-circle"} me-2"></i>
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alerta);

    setTimeout(() => {
        alerta.classList.remove("show");
        setTimeout(() => alerta.remove(), 200);
    }, 5000);
}

/* INICIALIZAR */
function inicializarDataInternet() {

    fetch("assets/data/data_internet.xlsx")
        .then(res => res.arrayBuffer())
        .then(buffer => {
            workbook = XLSX.read(buffer, { type: "array" });
            cargarHojaDataInternet(hojaActual);
            mostrarAlerta("success", "Datos cargados correctamente.");
        });

    document.querySelectorAll("#hojasTabs .nav-link").forEach(tab => {
        tab.addEventListener("click", e => {
            e.preventDefault();

            document.querySelectorAll("#hojasTabs .nav-link")
                .forEach(t => t.classList.remove("active"));

            tab.classList.add("active");
            hojaActual = tab.dataset.hoja;
            cargarHojaDataInternet(hojaActual);
        });
    });
}

/* CARGAR TABLA */
function cargarHojaDataInternet(nombreHoja) {

    if (!workbook) return;

    const hoja = workbook.Sheets[nombreHoja];
    if (!hoja) return;

    const data = XLSX.utils.sheet_to_json(hoja, { header: 1, defval: "" });

    document.getElementById("encabezados").innerHTML =
        `<tr>${data[0].map(h => `<th>${h}</th>`).join("")}</tr>`;

    document.getElementById("contenido").innerHTML =
        data.slice(1).map(row =>
            `<tr>${row.map(col => `<td>${col}</td>`).join("")}</tr>`
        ).join("");
}

/* EXPORTAR */
function exportarDataInternet() {

    if (!workbook || !workbook.Sheets[hojaActual]) {
        mostrarAlerta("danger", "No hay datos para exportar.");
        return;
    }

    const data = XLSX.utils.sheet_to_json(
        workbook.Sheets[hojaActual],
        { header: 1, defval: "" }
    );

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, hojaActual);

    const buffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array"
    });

    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download =
        `data_internet_${hojaActual.toLowerCase().replace(/[^a-z0-9]/g, "_")}.xlsx`;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    mostrarAlerta("success", "Archivo Excel exportado correctamente.");
}


/* DOM READY */
document.addEventListener("DOMContentLoaded", () => {
    inicializarDataInternet();
    document.getElementById("btn-exportar")
        .addEventListener("click", exportarDataInternet);
});
