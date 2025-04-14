// frontend.js

const frontend = {
    nombreTareaInput: document.getElementById('nombre-tarea'),
    mensajeDiv: document.getElementById('mensaje'),
    tareasListaUl: document.getElementById('tareas-lista'),

    inicializar: function() {
        this.nombreTareaInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.agregarTarea();
            }
        });
        this.mostrarTareasGuardadas();
    },

    agregarTarea: async function() {
        const nombreTarea = this.nombreTareaInput.value.trim();

        if (nombreTarea !== "") {
            const respuesta = backend.recibirTarea(nombreTarea);
            this.mensajeDiv.textContent = respuesta;
            this.nombreTareaInput.value = ""; // Limpiar el input
            this.mostrarTareasGuardadas(); // Actualizar la lista de tareas
        } else {
            this.mensajeDiv.textContent = "Por favor, ingresa un nombre para la tarea.";
        }
    },

    mostrarTareasGuardadas: function() {
        this.tareasListaUl.innerHTML = ''; // Limpiar la lista anterior
        const tareas = database.obtenerTareas();
        tareas.forEach(tarea => {
            const li = document.createElement('li');
            li.textContent = tarea;
            this.tareasListaUl.appendChild(li);
        });
    }
};

// Inicializar el frontend al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    frontend.inicializar();
});