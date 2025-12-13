/**
 * Panel de Datos – Data Gráfica
 * Archivo: assets/js/data_grafica.js
 * Función: cargar hojas de Excel y exportar la tabla visible
 */

let workbook = null;
let hojaActual = "Información";

/* INICIALIZACIÓN*/
document.addEventListener("DOMContentLoaded", () => {

    const rutaExcel = "../assets/data/data_grafica.xlsx";

    // Cargar Excel
    fetch(rutaExcel)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            workbook = XLSX.read(buffer, { type: "array" });
            console.log("Excel cargado con éxito");

            // Primera hoja por defecto
            cargarHoja(hojaActual);
        })
        .catch(err => console.error("Error cargando Excel:", err));

    // Detectar clics en tabs
    document.querySelectorAll("#hojasTabs .nav-link").forEach(tab => {
        tab.addEventListener("click", e => {
            e.preventDefault();

            document.querySelectorAll("#hojasTabs .nav-link")
                .forEach(t => t.classList.remove("active"));

            tab.classList.add("active");

            hojaActual = tab.dataset.hoja;
            cargarHoja(hojaActual);
        });
    });

});

/* CARGAR HOJA EN TABLA*/
function cargarHoja(nombreHoja) {
    if (!workbook) return;

    const hoja = workbook.Sheets[nombreHoja];
    if (!hoja) {
        console.error("Hoja NO encontrada:", nombreHoja);
        return;
    }

    const data = XLSX.utils.sheet_to_json(hoja, {
        header: 1,
        defval: ""
    });

    const headers = data[0] || [];
    const rows = data.slice(1);

    document.getElementById("encabezados").innerHTML =
        `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

    document.getElementById("contenido").innerHTML =
        rows.map(row =>
            `<tr>${row.map(col => `<td>${col}</td>`).join("")}</tr>`
        ).join("");

    console.log("Hoja cargada:", nombreHoja);
}

/* EXPORTAR TABLA VISIBLE (CSV – INFALIBLE) */
function exportarTablaGrafica() {

    const tabla = document.getElementById("tabla-excel");

    if (!tabla || tabla.rows.length === 0) {
        alert("No hay datos para exportar.");
        return;
    }

    let csv = [];

    for (let i = 0; i < tabla.rows.length; i++) {
        let fila = [];
        for (let j = 0; j < tabla.rows[i].cells.length; j++) {
            let texto = tabla.rows[i].cells[j].innerText
                .replace(/"/g, '""');
            fila.push(`"${texto}"`);
        }
        csv.push(fila.join(","));
    }

    const csvContent = csv.join("\n");

    const blob = new Blob([csvContent], {
        type: "text/csv;charset=utf-8;"
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "data_grafica.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(link.href);
}

/* EXPORTAR FUNCIÓN AL SCOPE GLOBAL*/
window.exportarTablaGrafica = exportarTablaGrafica;
