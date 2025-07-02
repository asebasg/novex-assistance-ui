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
      employeeTable.innerHTML = '<tr><td colspan="3">Error al cargar empleados</td></tr>';
      employeeTable.style.backgroundColor = 'rgba(220, 53, 70, 0.4)';
    }
  }
}
