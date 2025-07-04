// Asociar eventos a los formularios de crear, actualizar y eliminar
document.addEventListener("DOMContentLoaded", () => {
  // Crear empleado
  const form = document.getElementById("create-employee");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const documentValue = document.getElementById("document").value.trim();
      const note = document.getElementById("note").value.trim();

      const data = {
        name,
        document: parseInt(documentValue, 10),
        note: note !== "" ? note : undefined,
      };

      try {
        const response = await fetch("http://localhost:3000/employee", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (!response.ok) {
          throw new Error("Error al crear el empleado");
        }
        const result = await response.json();
        alert("Empleado creado con éxito");
        form.reset();
      } catch (error) {
        alert(error.message);
      }
    });
  }
});

// Obtener empleado
async function obtenerEmpleados() {
  const employeeTable = document.getElementById("employeeTable");
  if (employeeTable) {
    try {
      const res = await fetch("http://localhost:3000/employee");
      const data = await res.json();
      employeeTable.innerHTML =
        "<tr><th>ID</th><th>Nombre</th><th>Identificación</th><th>Nota</th></tr>" +
        data
          .map(
            (employee) =>
              `<tr><td>${employee.id}</td><td>${employee.name}</td><td>${employee.document}</td><td>${employee.note}</td></tr>`
          )
          .join("");
    } catch (error) {
      console.error(error);
      employeeTable.innerHTML =
        '<tr><td colspan="3">Error al cargar empleados</td></tr>';
      employeeTable.style.backgroundColor = "rgba(220, 53, 70, 0.4)";
    }
  }
}

// Asociar eventos a los formularios de actualizar y eliminar empleados
document.addEventListener("DOMContentLoaded", () => {
  // ...existing code for create employee...

  // Actualizar empleado
  const updateForm = document.getElementById("update-employee-form");
  if (updateForm) {
    updateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await actualizarEmpleado();
    });
  }

  // Eliminar empleado
  const deleteForm = document.getElementById("delete-employee-form");
  if (deleteForm) {
    deleteForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      await eliminarEmpleado();
    });
  }
});

// Actualizar empleado
async function actualizarEmpleado() {
  const id = document.getElementById("update-id").value.trim();
  const name = document.getElementById("update-name").value.trim();
  const documentValue = document.getElementById("update-document").value.trim();
  const note = document.getElementById("update-note").value.trim();

  if (!id) {
    alert("Por favor ingresa la ID del empleado a actualizar.");
    return;
  }

  const data = {};
  if (name) data.name = name;
  if (documentValue) data.document = parseInt(documentValue, 10);
  if (note) data.note = note;

  try {
    const response = await fetch(`http://localhost:3000/employee/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al actualizar el empleado");
    }
    alert("Empleado actualizado con éxito");
  } catch (error) {
    alert(error.message);
  }
}

// Eliminar empleado
async function eliminarEmpleado() {
  const id = document.getElementById("delete-id").value.trim();

  if (!id) {
    alert("Por favor ingresa la ID del empleado a eliminar.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/employee/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Error al eliminar el empleado");
    }
    alert("Empleado eliminado con éxito");
  } catch (error) {
    alert(error.message);
  }
}
