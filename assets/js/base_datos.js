document.addEventListener("DOMContentLoaded", () => {

    // Guardar datasets en memoria
    const datasets = {};

    function cargarExcel(rutaExcel, idEncabezados, idContenido, keyDataset) {
        console.log("Cargando Excel:", rutaExcel);

        fetch(rutaExcel)
            .then(res => res.arrayBuffer())
            .then(buffer => {
                const libro = XLSX.read(buffer, { type: "array" });
                const hoja = libro.Sheets[libro.SheetNames[0]];

                const data = XLSX.utils.sheet_to_json(hoja, {
                    header: 1,
                    defval: ""
                });

                datasets[keyDataset] = data; // ⬅️ guardar para exportar

                const encabezados = data[0];
                const filas = data.slice(1);

                document.getElementById(idEncabezados).innerHTML =
                    `<tr>${encabezados.map((c, i) =>
                        `<th class="${i === 0 ? 'sticky-col' : ''}">${c}</th>`
                    ).join("")}</tr>`;

                document.getElementById(idContenido).innerHTML =
                    filas.map(fila =>
                        `<tr>${fila.map((col, i) =>
                            `<td class="${i === 0 ? 'sticky-col' : ''}">${col}</td>`
                        ).join("")}</tr>`
                    ).join("");

                console.log(`✔ Excel cargado (${rutaExcel})`);
            })
            .catch(e => console.error("❌ Error cargando Excel:", e));
    }

    // Exportar dataset a Excel
    function exportarExcel(keyDataset, nombreArchivo) {
        if (!datasets[keyDataset]) {
            alert("No hay datos para exportar.");
            return;
        }

        const ws = XLSX.utils.aoa_to_sheet(datasets[keyDataset]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Datos");

        XLSX.writeFile(wb, `${nombreArchivo}.xlsx`);
    }

    // Cargar tablas
    cargarExcel(
        "assets/data/base_datos.xlsx",
        "encabezados-cuantic",
        "contenido-cuantic",
        "cuantica"
    );

    cargarExcel(
        "assets/data/data_maria.xlsx",
        "encabezados-maria",
        "contenido-maria",
        "maria"
    );

    // Botones exportar
    document
        .getElementById("btn-exportar-cuantic")
        .addEventListener("click", () =>
            exportarExcel("cuantica", "base_datos_encuesta_cuantica")
        );

    document
        .getElementById("btn-exportar-maria")
        .addEventListener("click", () =>
            exportarExcel("maria", "base_datos_videojuegos")
        );
});
