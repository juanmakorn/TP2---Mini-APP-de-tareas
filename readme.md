<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Aplicación de Tareas</title>
    <style>
        body { font-family: sans-serif; }
        #formulario-tarea { margin-bottom: 20px; }
        #mensaje { font-weight: bold; margin-bottom: 10px; }
        #lista-tareas ul { list-style-type: none; padding: 0; }
        #lista-tareas li { border: 1px solid #ccc; padding: 8px; margin-bottom: 5px; }
    </style>
</head>
<body>
    <h1>Lista de Tareas</h1>

    <div id="formulario-tarea">
        <label for="nombre-tarea">Nueva Tarea:</label>
        <input type="text" id="nombre-tarea">
        <button onclick="agregarTarea()">Agregar</button>
    </div>

    <div id="mensaje"></div>

    <div id="lista-tareas">
        <h2>Tareas Guardadas:</h2>
        <ul id="tareas-lista">
            </ul>
    </div>

    <script>
        // Frontend (interacción del usuario)
        const nombreTareaInput = document.getElementById('nombre-tarea');
        const mensajeDiv = document.getElementById('mensaje');
        const tareasListaUl = document.getElementById('tareas-lista');

        // Evento para agregar tarea al presionar Enter
        nombreTareaInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                agregarTarea();
            }
        });

        async function agregarTarea() {
            const nombreTarea = nombreTareaInput.value.trim();

            if (nombreTarea !== "") {
                const respuesta = await enviarTareaAlBackend(nombreTarea);
                mensajeDiv.textContent = respuesta;
                nombreTareaInput.value = ""; // Limpiar el input
                mostrarTareasGuardadas(); // Actualizar la lista de tareas
            } else {
                mensajeDiv.textContent = "Por favor, ingresa un nombre para la tarea.";
            }
        }

        async function enviarTareaAlBackend(tarea) {
            // Simulación de la comunicación con el backend (podría ser una llamada fetch a una API real)
            const respuestaBackend = await Backend.recibirTarea(tarea);
            return respuestaBackend;
        }

        function mostrarTareasGuardadas() {
            tareasListaUl.innerHTML = ''; // Limpiar la lista anterior
            Database.tareas.forEach(tarea => {
                const li = document.createElement('li');
                li.textContent = tarea;
                tareasListaUl.appendChild(li);
            });
        }

        // Backend (lógica de la aplicación)
        const Backend = {
            async recibirTarea(tarea) {
                if (!tarea) {
                    return "Error: El nombre de la tarea no puede estar vacío.";
                }

                // Simulación de la interacción con la base de datos
                const resultadoGuardado = await Database.guardarTarea(tarea);
                if (resultadoGuardado) {
                    return `Tarea guardada: ${tarea}`;
                } else {
                    return "Error al guardar la tarea.";
                }
            }
        };

        // Base de datos (simulada en memoria)
        const Database = {
            tareas: [],
            async guardarTarea(tarea) {
                this.tareas.push(tarea);
                console.log("Tarea guardada en la base de datos (simulada):", this.tareas);
                return true; // Simula una operación exitosa de guardado
            }
        };

        // Mostrar las tareas guardadas al cargar la página
        mostrarTareasGuardadas();

        /*
        Comentarios sobre Escalabilidad, Mantenibilidad y Seguridad:

        Escalabilidad: Permite que el sistema crezca y se adapte a mayores demandas.
        - Frontend:
            - Se podría implementar una paginación si la lista de tareas se vuelve muy grande.
            - Utilizar un framework como React, Angular o Vue.js facilitaría la creación de interfaces más complejas y reactivas, mejorando la experiencia del usuario a medida que la aplicación crece.
            - Se podrían añadir más campos a la tarea (descripción, fecha límite, etc.) sin modificar significativamente la estructura actual del frontend.
        - Backend:
            - **Escalabilidad:** En un backend real, se utilizaría un framework como Node.js con Express, Python con Flask/Django, o Java con Spring, que están diseñados para manejar múltiples peticiones concurrentes.
            - **Escalabilidad:** La lógica de la aplicación podría distribuirse en múltiples servidores o contenedores para manejar una mayor carga.
            - **Escalabilidad:** Se podrían implementar colas de mensajes (como RabbitMQ o Kafka) para manejar tareas asíncronas o picos de demanda.
        - Base de datos:
            - **Escalabilidad:** En lugar de una lista en memoria, se utilizaría una base de datos real (SQL como PostgreSQL o MySQL, o NoSQL como MongoDB) que ofrecen mecanismos de escalabilidad horizontal y vertical.
            - **Escalabilidad:** Se podrían implementar técnicas de caching (como Redis o Memcached) para reducir la carga en la base de datos.

        Mantenibilidad: Facilita la modificación y actualización del sistema.
        - Frontend:
            - La separación de la lógica de la interfaz (HTML) y la interacción (JavaScript) facilita la modificación de cada parte independientemente.
            - El uso de componentes reutilizables (si se utilizara un framework) mejoraría la mantenibilidad.
        - Backend:
            - La separación de la lógica de negocio en módulos (como el `Backend` simulado) hace que el código sea más organizado y fácil de entender y modificar.
            - El uso de pruebas unitarias y de integración garantizaría que los cambios no introduzcan errores.
        - Base de datos:
            - El uso de una base de datos dedicada proporciona una estructura clara y herramientas para la gestión y el mantenimiento de los datos.
            - La abstracción de la capa de datos (el objeto `Database` simulado) permite cambiar la implementación de la base de datos sin afectar significativamente el backend.

        Seguridad: Protege los datos y las comunicaciones.
        - Frontend:
            - **Seguridad:** Se debe tener cuidado al mostrar datos dinámicos para evitar vulnerabilidades XSS (Cross-Site Scripting). En frameworks modernos, esto se maneja automáticamente.
            - **Seguridad:** Es importante validar los datos del lado del cliente para proporcionar una mejor experiencia de usuario, pero la validación principal siempre debe realizarse en el backend.
        - Backend:
            - **Seguridad:** Es crucial validar y sanitizar todas las entradas del usuario para prevenir ataques como la inyección SQL (si se usara una base de datos SQL) o ataques de comandos.
            - **Seguridad:** Se deben implementar mecanismos de autenticación y autorización para proteger el acceso a los recursos.
            - **Seguridad:** La comunicación entre el frontend y el backend (en una aplicación real) debería realizarse a través de HTTPS para cifrar los datos en tránsito.
        */
    </script>
</body>
</html>