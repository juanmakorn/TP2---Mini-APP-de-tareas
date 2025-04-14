// database.js

const database = {
    claveLocalStorage: 'listaDeTareas',

    guardarTarea: function(tarea) {
        try {
            const tareas = this.obtenerTareas();
            tareas.push(tarea);
            localStorage.setItem(this.claveLocalStorage, JSON.stringify(tareas));
            return true;
        } catch (error) {
            console.error("Error al guardar la tarea:", error);
            return false;
        }
    },

    obtenerTareas: function() {
        const tareasJSON = localStorage.getItem(this.claveLocalStorage);
        return tareasJSON ? JSON.parse(tareasJSON) : [];
    }
};

// No es necesario inicializar nada aquí, los datos se cargan bajo demanda.