// Asociar eventos a los formularios de crear, actualizar y eliminar reportes
document.addEventListener("DOMContentLoaded", () => {
  // Crear reporte
  const createForm = document.getElementById("create-report");
  if (createForm) {
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await crearReporte();
    });
  }

  // Botón obtener reportes
  const getReportsBtn = document.getElementById("get-reports-btn");
  if (getReportsBtn) {
    getReportsBtn.addEventListener("click", obtenerReportes);
  }

  // Actualizar reporte
  const updateForm = document.getElementById("update-report-form");
  if (updateForm) {
    updateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await actualizarReporte();
    });
  }

  // Eliminar reporte
  const deleteForm = document.getElementById("delete-report-form");
  if (deleteForm) {
    deleteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await eliminarReporte();
    });
  }
});

// Crear reporte
async function crearReporte() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();

  if (!title || !description || !employeeId) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  // Encapsular los datos en un objeto "data"
  const data = {
    title,
    description,
    employeeId: parseInt(employeeId, 10),
  };

  try {
    const response = await fetch("http://localhost:3000/report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Error al crear el reporte: " + errorText);
    }
    alert("Reporte creado con éxito");
    document.getElementById("create-report").reset();
  } catch (error) {
    alert(error.message);
  }
}

// Obtener reportes
async function obtenerReportes() {
  const reportTable = document.getElementById("reportTable");
  if (reportTable) {
    try {
      const res = await fetch("http://localhost:3000/report");
      const data = await res.json();
      reportTable.innerHTML =
        "<tr><th>ID</th><th>Título</th><th>Descripción</th><th>Fecha</th><th>Nombre del empleado</th><th>ID del empleado</th><th>Acciones</th></tr>" +
        data
          .map(
            (report) =>
              `
            <tr>
            <td>${report.id}</td>
            <td>${report.title}</td>
            <td>${report.description}</td>
            <td>${new Date(report.createdAt).toLocaleString()}</td>
            <td></td>
            <td>${report.employeeId}</td>
            <td><button class="btn-edit" data-id="">Editar reporte</button><button class="btn-delete" data-id="">Eliminar reporte</button></td>
              </tr>`
          )
          .join("");
    } catch (error) {
      reportTable.innerHTML =
        '<tr><td colspan="6">Error al cargar reportes</td></tr>';
      reportTable.style.backgroundColor = "rgba(220, 53, 70, 0.4)";
    }
  }
}

// Actualizar reporte
async function actualizarReporte() {
  const id = document.getElementById("update-id").value.trim();
  const title = document.getElementById("update-title").value.trim();
  const description = document
    .getElementById("update-description")
    .value.trim();
  const employeeId = document.getElementById("update-employeeId").value.trim();

  if (!id) {
    alert("Por favor ingresa la ID del reporte a actualizar.");
    return;
  }

  const data = {};
  if (title) data.title = title;
  if (description) data.description = description;
  if (employeeId) data.employeeId = parseInt(employeeId, 10);

  try {
    const response = await fetch(`http://localhost:3000/report/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el reporte");
    }
    alert("Reporte actualizado con éxito");
  } catch (error) {
    alert(error.message);
  }
}

// Eliminar reporte
async function eliminarReporte() {
  const id = document.getElementById("delete-id").value.trim();
  if (!id) {
    alert("Por favor ingresa la ID del reporte a eliminar.");
    return;
  }
  try {
    const response = await fetch(`http://localhost:3000/report/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el reporte");
    }
    alert("Reporte eliminado con éxito");
  } catch (error) {
    alert(error.message);
  }
}
