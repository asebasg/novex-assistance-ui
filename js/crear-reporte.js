document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (id) {
    const updateIdInput = document.getElementById("employeeId");
    if (updateIdInput) {
      updateIdInput.value = id;
    }

    fetch(`http://localhost:3000/employee/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al hacer fetching de datos");
        }
        return response.json();
      })
      .then((employee) => {
        const idInput = document.getElementById("employeeId");
        if (idInput) idInput.value = employee.id || "";
      })
      .catch((error) => {
        console.error(error);
        alert("No se pudo cargar la información del empleado.");
      });
  }
});
