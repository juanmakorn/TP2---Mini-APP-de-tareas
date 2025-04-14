// backend.js

const backend = {
    recibirTarea: function(tarea) {
        if (!tarea) {
            return "Error: El nombre de la tarea no puede estar vacío.";
        }

        // Simulación de la interacción con la base de datos
        const resultadoGuardado = database.guardarTarea(tarea);
        if (resultadoGuardado) {
            return `Tarea guardada: ${tarea}`;
        } else {
            return "Error al guardar la tarea.";
        }
    },

    obtenerTareas: function() {
        return database.obtenerTareas();
    }
};

// Importar la capa de datos (asegúrate de que este script se cargue después de database.js en el HTML si fuera necesario en un entorno más complejo)
// En este caso, como están en el mismo contexto del navegador, la referencia es directa.