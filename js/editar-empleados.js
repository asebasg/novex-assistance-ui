//En la carga de la página, se lee el parámetro de consulta "ID"
// y se configura el valor de entrada de ID de actualización
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  if (id) {
    const updateIdInput = document.getElementById("update-id");
    if (updateIdInput) {
      updateIdInput.value = id;
    }
    // Fetch employee data from backend API
    fetch(`http://localhost:3000/employee/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching employee data");
        }
        return response.json();
      })
      .then((employee) => {
        // Pre-fill form fields with employee data
        const nameInput = document.getElementById("update-name");
        const documentInput = document.getElementById("update-document");
        const noteInput = document.getElementById("update-note");
        if (nameInput) nameInput.value = employee.name || "";
        if (documentInput) documentInput.value = employee.document || "";
        if (noteInput) noteInput.value = employee.note || "";
      })
      .catch((error) => {
        console.error(error);
        alert("No se pudo cargar la información del empleado.");
      });
  }
});
