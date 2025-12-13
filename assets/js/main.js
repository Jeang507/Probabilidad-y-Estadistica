function exportarEncuestaIndividual(n) {
    const datos = obtenerRespuestas(n);
    if (!datos.length) {
        alert("No hay datos para exportar");
        return;
    }

    const hoja = XLSX.utils.json_to_sheet(datos);
    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, `Encuesta_${n}`);
    XLSX.writeFile(libro, `Encuesta_${n}.xlsx`);
}

function exportarAExcel() {
    const libro = XLSX.utils.book_new();

    [1, 2, 3].forEach(n => {
        const datos = obtenerRespuestas(n);
        if (datos.length) {
            const hoja = XLSX.utils.json_to_sheet(datos);
            XLSX.utils.book_append_sheet(libro, hoja, `Encuesta_${n}`);
        }
    });

    XLSX.writeFile(libro, "Todas_las_encuestas.xlsx");
}

function mostrarPanelAdministracion() {
    const panel = document.getElementById("panel-admin-container");
    const contenido = document.getElementById("panel-admin-contenido");

    const e1 = obtenerRespuestas(1).length;
    const e2 = obtenerRespuestas(2).length;
    const e3 = obtenerRespuestas(3).length;

    panel.style.display = "block";

    contenido.innerHTML = `
        <div class="row text-center">
            <div class="col-md-4 mb-3">
                <div class="p-3 border rounded">
                    <i class="fa-solid fa-wifi fa-2x mb-2" style="color:var(--accent);"></i>
                    <h5 class="fw-bold">Encuesta 1</h5>
                    <p class="fs-4 mb-0">${e1}</p>
                    <small class="text-secondary">Respuestas</small>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="p-3 border rounded">
                    <i class="fa-solid fa-robot fa-2x mb-2" style="color:var(--accent);"></i>
                    <h5 class="fw-bold">Encuesta 2</h5>
                    <p class="fs-4 mb-0">${e2}</p>
                    <small class="text-secondary">Respuestas</small>
                </div>
            </div>

            <div class="col-md-4 mb-3">
                <div class="p-3 border rounded">
                    <i class="fa-solid fa-atom fa-2x mb-2" style="color:var(--accent);"></i>
                    <h5 class="fw-bold">Encuesta 3</h5>
                    <p class="fs-4 mb-0">${e3}</p>
                    <small class="text-secondary">Respuestas</small>
                </div>
            </div>
        </div>
    `;

    panel.scrollIntoView({ behavior: "smooth" });
}


function mostrarDetallesRespuestas() {
    const panel = document.getElementById("panel-admin-container");
    const contenido = document.getElementById("panel-admin-contenido");

    const datos = [
        ...obtenerRespuestas(1).map(d => ({ encuesta: 1, ...d })),
        ...obtenerRespuestas(2).map(d => ({ encuesta: 2, ...d })),
        ...obtenerRespuestas(3).map(d => ({ encuesta: 3, ...d }))
    ];

    if (!datos.length) {
        contenido.innerHTML = `<p class="text-secondary">No hay datos registrados.</p>`;
        panel.style.display = "block";
        return;
    }

    const headers = Object.keys(datos[0]);

    panel.style.display = "block";

    contenido.innerHTML = `
        <div class="table-responsive" style="max-height:400px; overflow:auto;">
            <table class="table table-bordered table-hover align-middle">
                <thead class="table-light sticky-top">
                    <tr>
                        ${headers.map(h => `<th>${h}</th>`).join("")}
                    </tr>
                </thead>
                <tbody>
                    ${datos.map(row => `
                        <tr>
                            ${headers.map(h => `<td>${row[h] ?? ""}</td>`).join("")}
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `;

    panel.scrollIntoView({ behavior: "smooth" });
}

// EXPORTAR
window.exportarEncuestaIndividual = exportarEncuestaIndividual;
window.exportarAExcel = exportarAExcel;
window.mostrarPanelAdministracion = mostrarPanelAdministracion;
window.mostrarDetallesRespuestas = mostrarDetallesRespuestas;
