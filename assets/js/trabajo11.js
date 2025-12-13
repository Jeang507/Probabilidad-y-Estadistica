document.addEventListener("DOMContentLoaded", () => {

    let workbook = null;
    let hojaActual = null;

    const encabezadosEl = document.getElementById("encabezados");
    const contenidoEl = document.getElementById("contenido");
    const btnExportar = document.getElementById("btn-exportar");

    // CARGAR EXCEL COMPLETO
    fetch("../assets/data/data_grafica.xlsx")
        .then(res => res.arrayBuffer())
        .then(buffer => {
            workbook = XLSX.read(buffer, { type: "array" });

            // Cargar primera hoja por defecto
            hojaActual = workbook.SheetNames[0];
            cargarHoja(hojaActual);
        })
        .catch(err => console.error(" Error cargando Excel:", err));

    // CARGAR HOJA EN TABLA
    function cargarHoja(nombreHoja) {
        const hoja = workbook.Sheets[nombreHoja];

        const data = XLSX.utils.sheet_to_json(hoja, {
            header: 1,
            defval: ""
        });

        const encabezados = data[0];
        const filas = data.slice(1);

        encabezadosEl.innerHTML =
            `<tr>${encabezados.map(col => `<th>${col}</th>`).join("")}</tr>`;

        contenidoEl.innerHTML =
            filas.map(fila =>
                `<tr>${fila.map(col => `<td>${col}</td>`).join("")}</tr>`
            ).join("");
    }

    // MANEJO DE TABS
    document.querySelectorAll("#hojasTabs .nav-link").forEach(tab => {
        tab.addEventListener("click", () => {

            document
                .querySelectorAll("#hojasTabs .nav-link")
                .forEach(t => t.classList.remove("active"));

            tab.classList.add("active");

            hojaActual = tab.dataset.hoja;
            cargarHoja(hojaActual);
        });
    });

    // EXPORTAR HOJA ACTUAL
    btnExportar.addEventListener("click", () => {

        if (!workbook || !hojaActual) {
            alert("No hay datos para exportar.");
            return;
        }

        const wbNuevo = XLSX.utils.book_new();
        const hoja = workbook.Sheets[hojaActual];

        XLSX.utils.book_append_sheet(wbNuevo, hoja, hojaActual);

        XLSX.writeFile(
            wbNuevo,
            `data_grafica_${hojaActual}.xlsx`
        );
    });

});
