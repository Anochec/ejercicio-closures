// ejercicio funciones-closures.js

/* este script demuestra :
    - Closures: para crear un estado privado ( lista "tareas").
    -Arrow functions: para todos los metodos del gestor.
    -Parametros Rest: Para agregar multiples tareas a la vez.
    -parametros por defecto: para filtrar tareas.
    -Encapsulamiento: El estado "tareas" no puede ser modificado desde fuera.
*/


console.log("=== INICIANDO GESTOR DE TAREAS\n");

function crearGestorDeTareas() {
    // estado privado
    let tareas = [];
    let proximoId = 1;

    // METODO PUBLICO (RETURN) 
    
    return {

        // agregar tareas (acepta multiples tareas)
        /**
         * @param {...string} textos - Textos de las tareas a agregar (REST)
         */
        agregarTareas: (...textos) => {
            textos.forEach(texto => {
                const nuevaTarea = {
                    id: proximoId,
                    texto: texto,
                    completada: false
                };
                tareas.push(nuevaTarea);
                proximoId++;
                console.log(`[TAREA CREADA] (ID: ${nuevaTarea.id}) "${texto}"`);
      });
      console.log("---------------------------------");
    },

    /**
     *  Marca una tarea como completada por su ID
     * @param {number} id - ID de la tarea a marcar como completada
     */
    completarTarea: (id) => {
        const tarea = tareas.find(t => t.id === id);

        if (tarea && !tarea.completada) {
            tarea.completada = true;
            console.log(`[TAREA COMPLETADA] (ID: ${id}) "${tarea.texto}"`);
        } else if (tarea && !tarea.completada) {
            console.log(`[TAREA YA COMPLETADA] (ID: ${id}) "${tarea.texto}"`);
          } else {
            console.log(`[ERROR] No se encontró la tarea con el ID: ${id})`);
        }
        console.log("---------------------------------");
    },
     /** 
      * filtra las tareas por su estado
      * @param {string} estado - "todas", "completadas", "pendientes" (por defecto: "todas")
      * @returns {Array} - Lista de tareas filtradas
       
     */
    filtrarTareas: (estado = "pendientes") => {
        let filtradas;

        if (estado === "completadas") {
            filtradas = tareas.filter(t => t.completada);
        } else if (estado === "pendientes") {
            filtradas = tareas.filter(t => !t.completada);
        } else {
            filtradas = tareas;
        }

        return [...filtradas];
    },

    /**
     * Devuelve estadisticas sonre el estado de las tareas. 
     * @returns {Object} - Estadisticas de tareas
     */
    obtenerEstadisticas: () => {
        const total = tareas.length;
        const completadas = tareas.filter(t => t.completada).length;
        const pendientes = total - completadas;

        return { total, completadas, pendientes };
      }
    };
}

 // ---- USO DEL GESTOR DE TAREAS ----
 
  // Crear una instancia del gestor de tareas
    const miGestor = crearGestorDeTareas();

    // Agregar tareas
    miGestor.agregarTareas(
        "Aprender Closures",
        "practicar Arrow Functions",
        "implementar un List"
    );

    // Obtener estadisticas 

    let stats = miGestor.obtenerEstadisticas();
console.log("ESTADISTICAS ACTUALES:", stats);
console.log("---------------------------------");


 // completar una tarea
    miGestor.completarTarea(1);
    miGestor.completarTarea(3);
    miGestor .completarTarea(99); // ID no existente


    // vemos las estadisticas actualizadas

    stats = miGestor.obtenerEstadisticas();
    console.log("ESTADISTICAS ACTUALIZADAS:", stats);
    console.log("---------------------------------");

    // filtrar tareas ( parametros por defect)

    console.log("Tareas pendientes (por defecto):", miGestor.filtrarTareas());
    console.log("Tareas completadas:", miGestor.filtrarTareas("completadas"));
    console.log("Todas las tareas:", miGestor.filtrarTareas("todas"));
    console.log("---------------------------------");

    // prueba de encapsulacion

    console.log("\n--- Prueba de Encapsulamiento ---");
    const tareasfiltradas = miGestor.filtrarTareas("todas");
    tareasfiltradas.push({ id: 5, texto: "Tarea falsa", completada: false });


    console.log("Tareas despues de intentar modificar externamente:", tareasfiltradas.length);
    console.log("Tareas Reales sin cambios):", miGestor.obtenerEstadisticas().total);
    console.log(" El estado interno se mantiene seguro y sin cambios.");