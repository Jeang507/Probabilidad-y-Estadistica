document.addEventListener("DOMContentLoaded", () => {

    const rutaExcel = "../assets/data/estructuraEncuesta.xlsx";

    fetch(rutaExcel)
        .then(res => res.arrayBuffer())
        .then(buffer => {
            const workbook = XLSX.read(buffer, { type: "array" });
            console.log("✔ estructuraEncuesta.xlsx cargado");

            const hoja = workbook.Sheets[workbook.SheetNames[0]];
            const data = XLSX.utils.sheet_to_json(hoja, { header: 1, defval: "" });

            const headers = data[0];
            const rows = data.slice(1);

            // Render encabezados
            document.getElementById("encabezados-estructura").innerHTML =
                `<tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>`;

            // Render filas
            document.getElementById("contenido-estructura").innerHTML =
                rows.map(row =>
                    `<tr>${row.map(col => `<td>${col}</td>`).join("")}</tr>`
                ).join("");
        })
        .catch(err => console.error("Error cargando estructuraEncuesta:", err));
});
