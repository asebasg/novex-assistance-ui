// Asociar eventos a los formularios de crear, actualizar y eliminar asisencias
document.addEventListener("DOMContentLoaded", () => {
  // Crear asistencias
  const createForm = document.getElementById("create-attendance");
  if (createForm) {
    createForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await crearAsistencia();
    });
  }

  // Boton de obtener asistencias
  const getReportsBtn = document.getElementById("get-attendances-btn");
  if (getReportsBtn) {
    getReportsBtn.addEventListener("click", obtenerAsistencias);
  }

  // Actualizar asistencia
  const updateForm = document.getElementById("update-attendance");
  if (updateForm) {
    updateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await actualizarAsistencia();
    });
  }

  // Eliminar asistencia
  const deleteForm = document.querySelector(".delete-attendance");
  if (deleteForm) {
    deleteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await eliminarAsistencia();
    });
  }
});

// Crear asistencia
async function crearAsistencia() {
  const date = document.getElementById("date").value.trim();
  const entryTime = document.getElementById("entryTime").value.trim();
  const exitTime = document.getElementById("exitTime").value.trim();
  const status = document.getElementById("status").value.trim();
  const employeeId = document.getElementById("employeeId").value.trim();

  if (!date || !entryTime || !status || !employeeId) {
    alert("Por favor, ingresa todos los datos obligatorios.");
    return;
  }

  // Encapsular todos los datos en el objeto "data"
  const data = {
    date: new Date().toISOString(),
    entryTime: new Date().toISOString(),
    exitTime: new Date().toISOString(),
    status,
    employeeId: parseInt(employeeId, 10),
  };

  try {
    const response = await fetch("http://localhost:3000/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error al crear la asistencia: ${errorText}`);
    }
    alert("Asistencia creada con exito");
    document.getElementById("create-attendance").reset(); // Limpia los campos del formulario luego de crear la asistencia
  } catch (error) {
    alert(error.message);
  }
}

// Obtener asistencias
async function obtenerAsistencias() {
  const attendanceTable = document.getElementById("attendanceTable");
  if (attendanceTable) {
    try {
      const res = await fetch("http://localhost:3000/attendance");
      const data = await res.json();
      attendanceTable.innerHTML =
        "<tr><th>ID asistencia</th><th>ID empleado</th><th>Fecha</th><th>Hora de entrada</th><th>Hora de salida</th><th>Estado de la asistencia</th></tr>" +
        data
          .map((attendance) => {
            let statusClass = "";
            if (attendance.status === "PRESENT") statusClass = "status-present";
            else if (attendance.status === "ABSENT")
              statusClass = "status-absent";
            else if (attendance.status === "LATE") statusClass = "status-late";
            else if (attendance.status === "DAY_OFF")
              statusClass = "status-off";
            else if (attendance.status === "VACATIONS")
              statusClass = "status-vacations";
            else if (attendance.status === "PERMIT")
              statusClass = "status-permit";
            return `<tr>
          <td>${attendance.id}</td>
          <td>${attendance.employeeId}</td>
          <td>${attendance.date}</td>
          <td>${attendance.entryTime}</td>
          <td>${attendance.exitTime}</td>
          <td class="${statusClass}">${attendance.status}</td>
        </tr>`;
          })
          .join("");
    } catch (error) {
      attendanceTable.innerHTML =
        '<tr><td colspan="6">Error al cargar asisencias</td></tr>';
      attendanceTable.style.backgroundColor = "rgba(220, 53, 70, 0.4)";
    }
  }
}

// Actualizar asistencias
async function actualizarAsistencia() {
  const id = document.getElementById("update-id").value.trim();
  const date = document.getElementById("update-date").value.trim();
  const entryTime = document.getElementById("update-entrytime").value.trim();
  const exitTime = document.getElementById("update-exittime").value.trim();
  const status = document.getElementById("update-status").value.trim();

  if (!id) {
    alert("Por favor ingresa la ID de la asistencia a actualizar.");
    return;
  }

  const data = {};
  if (date) data.date = new Date(date).toISOString();
  if (date && entryTime)
    data.entryTime = new Date(`${date}T${entryTime}:00`).toISOString();
  if (date && exitTime)
    data.exitTime = new Date(`${date}T${exitTime}:00`).toISOString();
  if (status) data.status = status;

  try {
    const response = await fetch(`http://localhost:3000/attendance/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar la asistencia");
    }
    alert("Asistencia actualizada con exito");
  } catch (error) {
    alert(error.message);
  }
}

//Eliminar asistencia
async function eliminarAsistencia() {
  const id = document.getElementById("delete-id").value.trim();
  if (!id) {
    alert("Por favor ingresa la ID de la asistencia a eliminar.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/attendance/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar la asistencia");
    }
    alert("Asistencia eliminada con exito");
  } catch (error) {
    alert(error.message);
  }
}
