// Crear empleado
document.addEventListener("DOMContentLoaded", () => {
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

/*
async function actualizarEmpleado() {
  const id = document.querySelector('.actualizar-empleados #id-empleado').value.trim();
  const name = document.querySelector('.actualizar-empleados input[name="name"]').value.trim();
  const documentValue = document.querySelector('.actualizar-empleados input[name="document"]').value.trim();
  const note = document.querySelector('.actualizar-empleados textarea[name="note"]').value.trim();

  if (!id) {
    alert('Por favor ingresa la ID del empleado a actualizar.');
    return;
  }

  const data = {
    name,
    document: parseInt(documentValue, 10),
    note: note !== "" ? note : undefined,
  };

  try {
    const response = await fetch(`http://localhost:3000/employee/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el empleado');
    }
    alert('Empleado actualizado con éxito');
  } catch (error) {
    alert(error.message);
  }
}

async function eliminarEmpleado() {
  const id = document.querySelector('.eliminar-empleados #id-empleado').value.trim();

  if (!id) {
    alert('Por favor ingresa la ID del empleado a eliminar.');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/employee/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el empleado');
    }
    alert('Empleado eliminado con éxito');
  } catch (error) {
    alert(error.message);
  }
}

*/
