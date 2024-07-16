// Obtención de elementos del DOM
let container = document.getElementById("container");
let lista_input_ingredientes = document.getElementById("lista-input-ingredientes");
let guardar_receta = document.getElementById("guardar-receta");
let lista_recetas = document.getElementById("lista-recetas");
let nombre_receta_nueva = document.getElementById("nombre-nueva-receta") || "";
let lista_ingredientes = document.getElementById("lista-ingredientes");
let nuevo_precio = document.getElementById("nuevo-precio");
let menu_cambiar = document.getElementById("menu-cambiar-ingrediente");
let input_cambiar_nombre_ingrediente = document.getElementById("input-cambiar-nombre-ingrediente");
let input_cambiar_precio_ingrediente = document.getElementById("input-cambiar-precio-ingrediente");
let guardar_cambios = document.getElementById("guardar-cambio");
let input_beneficio_multiplicacion = document.getElementById("input-multiplicacion");
let input_beneficio_suma = document.getElementById("input-suma");

// Obtención de datos del localStorage
let ingredientes = JSON.parse(localStorage.getItem("Ingredientes_guardados")) || [];
let receta = JSON.parse(localStorage.getItem("recetas_guardadas")) || [];
let ingredientes_receta = JSON.parse(localStorage.getItem("ingredientes_receta")) || [];
input_beneficio_multiplicacion = localStorage.getItem("beneficio-multiplicar", input_beneficio_multiplicacion) || 1;
input_beneficio_suma = localStorage.getItem("beneficio-sumar", input_beneficio_suma) || 0;

//abrir menu 1
let menu_1 = document.getElementById("menu-ingredientes");
let btn_menu_1 = document.getElementById("btn-menu-1");
btn_menu_1.addEventListener("click", function (e) {
    menu_1.style.display = "flex";
    menu_2.style.display = "none";
});

//dropdown
let btn_dropdown = document.getElementById("btn-dropdown");
let menu_dropdown = document.getElementById("dropdown-menu");
btn_dropdown.addEventListener("click", function (e) {
    menu_dropdown.style.display = "flex";
});

//solo un checked a la vez
let radio_kilo = document.getElementById("radio-kilogramo");
let radio_gramo = document.getElementById("radio-gramo");
let radio_unidad = document.getElementById("radio-unidad");
radio_kilo.addEventListener("click", function (e) {
    menu_dropdown.style.display = "none";
    btn_dropdown.innerHTML = "Kilogramo";
});
radio_gramo.addEventListener("click", function (e) {
    menu_dropdown.style.display = "none";
    btn_dropdown.innerHTML = "Gramos";
});
radio_unidad.addEventListener("click", function (e) {
    menu_dropdown.style.display = "none";
    btn_dropdown.innerHTML = "Unidad";
});


let btn_agregar_ingrediente = document.getElementById("btn-agregar-ingrediente");
btn_agregar_ingrediente.addEventListener("click", function (e) {
    let input_nombre_nuevo_ingrediente = document.getElementById("nombre-nuevo-ingrediente");
    let input_precio_nuevo_ingrediente = document.getElementById("precio-nuevo-ingrediente");

    if (input_nombre_nuevo_ingrediente.value !== "" &&
        input_precio_nuevo_ingrediente.value !== "" && input_precio_nuevo_ingrediente.value > 0 &&
        (radio_gramo.checked || radio_kilo.checked || radio_unidad.checked)) {

        //creo el p, le asigno el valor del input
        let nombre_nuevo_ingrediente = document.createElement("p");
        nombre_nuevo_ingrediente.textContent = input_nombre_nuevo_ingrediente.value;
        nombre_nuevo_ingrediente.classList.add("nombre-ingrediente");

        //creo el p, le asigno el valor del input
        let precio_nuevo_ingrediente = document.createElement("p");
        precio_nuevo_ingrediente.classList.add("precio-ingrediente");

        //le doy formato al precio x unidad
        precio_nuevo_ingrediente.textContent = "$" + input_precio_nuevo_ingrediente.value + " x " + btn_dropdown.innerHTML;

        //creo el div y le asigno 2 clases 
        let div_nuevo_ingrediente = document.createElement("div");
        div_nuevo_ingrediente.classList.add("d-column", "ingredientes");
        div_nuevo_ingrediente.appendChild(nombre_nuevo_ingrediente);
        div_nuevo_ingrediente.appendChild(precio_nuevo_ingrediente);

        //creo div imagenes y le asigno una ruta de la img
        let div_imagenes_ingredientes = document.createElement("div");

        let img_editar = document.createElement("img")
        img_editar.src = "imgs/editar.png";
        img_editar.classList.add("imgs");

        let img_eliminar = document.createElement("img");
        img_eliminar.src = "imgs/eliminar.png";
        img_eliminar.classList.add("imgs");

        //le anexo las img al div
        div_imagenes_ingredientes.appendChild(img_editar);
        div_imagenes_ingredientes.appendChild(img_eliminar);
        div_imagenes_ingredientes.classList.add("d-row", "ingredientes");

        //agrego los 2 divs hijo al div padre y el padre a la lista
        let div_padre = document.createElement("div");
        div_padre.classList.add("div_padre");
        div_padre.appendChild(div_nuevo_ingrediente);
        div_padre.appendChild(div_imagenes_ingredientes);
        lista_ingredientes.appendChild(div_padre);

        //guardar los cambios
        ingredientes.push({
            nombre: input_nombre_nuevo_ingrediente.value,
            precio: input_precio_nuevo_ingrediente.value,
            unidad: btn_dropdown.innerHTML
        });
        localStorage.setItem("Ingredientes_guardados", JSON.stringify(ingredientes));

        //editar precio del array

        //eliminar datos del array
        img_eliminar.addEventListener("click", function (e) {
            let index = Array.from(lista_ingredientes.children).indexOf(div_padre);
            ingredientes.splice(index, 1);
            lista_ingredientes.removeChild(div_padre);
            console.log("Se elimino correctamente un elemento de la lista de ingredientes");
            localStorage.setItem("Ingredientes_guardados", JSON.stringify(ingredientes));
        });


        //limpiar los inputs
        input_nombre_nuevo_ingrediente.value = "";
        input_precio_nuevo_ingrediente.value = "";
        btn_dropdown.innerHTML = "Seleccionar Unidad";
        radio_gramo.checked = false;
        radio_kilo.checked = false;
        radio_unidad.checked = false;
        lista_ingredientes.style.display = "block";
        menu_1.style.display = "none";

        console.log("se guardo correctamente el ingrediente en el indice " + ingredientes.length + " con los datos:\n" +
            ingredientes[ingredientes.length - 1].nombre + "\n" +
            ingredientes[ingredientes.length - 1].precio + "\n" +
            ingredientes[ingredientes.length - 1].unidad
        );

    } else {
        alert("Asegurese de que todos los campos estén correctos");
    }
});

//cargar lista ingredientes
for (let i = 0; i<ingredientes.length; i++){
    lista_ingredientes.style.display="block";
    //creo el p, le asigno el valor del input
    let nombre_nuevo_ingrediente = document.createElement("p");
    nombre_nuevo_ingrediente.textContent = ingredientes[i].nombre;
    nombre_nuevo_ingrediente.classList.add("nombre-ingrediente");
    
    //creo el p, le asigno el valor del input
    let precio_nuevo_ingrediente = document.createElement("p");
    precio_nuevo_ingrediente.classList.add("precio-ingrediente");
    
    //le doy formato al precio x unidad
    precio_nuevo_ingrediente.textContent = "$" + ingredientes[i].precio + " x " + ingredientes[i].unidad;

    //creo el div y le asigno 2 clases 
    let div_nuevo_ingrediente = document.createElement("div");
    div_nuevo_ingrediente.classList.add("d-column", "ingredientes");
    div_nuevo_ingrediente.appendChild(nombre_nuevo_ingrediente);
    div_nuevo_ingrediente.appendChild(precio_nuevo_ingrediente);

    //creo div imagenes y le asigno una ruta de la img
    let div_imagenes_ingredientes = document.createElement("div");

    let img_editar = document.createElement("img")
    img_editar.src = "imgs/editar.png";
    img_editar.classList.add("imgs");

    let img_eliminar = document.createElement("img");
    img_eliminar.src = "imgs/eliminar.png";
    img_eliminar.classList.add("imgs");

    //le anexo las img al div
    div_imagenes_ingredientes.appendChild(img_editar);
    div_imagenes_ingredientes.appendChild(img_eliminar);
    div_imagenes_ingredientes.classList.add("d-row", "ingredientes");
    
    //agrego los 2 divs hijo al div padre y el padre a la lista
    let div_padre = document.createElement("div");
    div_padre.classList.add("div_padre");
    div_padre.appendChild(div_nuevo_ingrediente);
    div_padre.appendChild(div_imagenes_ingredientes);
    lista_ingredientes.appendChild(div_padre);

    //editar precio del array
    img_editar.addEventListener("click", function (e) {
        menu_cambiar.style.display = "flex";
        input_cambiar_nombre_ingrediente.placeholder = ingredientes[i].nombre;
        input_cambiar_precio_ingrediente.placeholder = ingredientes[i].precio;

        guardar_cambios.onclick = function () {
            if (input_cambiar_nombre_ingrediente.value != "") {
                ingredientes[i].nombre = input_cambiar_nombre_ingrediente.value;
                nombre_nuevo_ingrediente.textContent = ingredientes[i].nombre;
            }
            if (input_cambiar_precio_ingrediente.value != "") {
                ingredientes[i].precio = input_cambiar_precio_ingrediente.value;
                precio_nuevo_ingrediente.textContent = "$" + ingredientes[i].precio + " x " + ingredientes[i].unidad;
            }
            localStorage.setItem("Ingredientes_guardados", JSON.stringify(ingredientes));
            menu_cambiar.style.display = "none";
            input_cambiar_nombre_ingrediente.value = "";
            input_cambiar_precio_ingrediente.value = "";

            actualizarPreciosRecetas();

        };
    });

    //eliminar datos del array
    img_eliminar.addEventListener("click", function (e) {
        let index = Array.from(lista_ingredientes.children).indexOf(div_padre);
        ingredientes.splice(index, 1);
        lista_ingredientes.removeChild(div_padre);
        console.log("Se elimino correctamente un elemento de la lista de ingredientes");
        localStorage.setItem("Ingredientes_guardados", JSON.stringify(ingredientes));
    });

    console.log("se cargó correctamente el ingrediente en el indice " + i + " con los datos:\n" +
                    "Nombre: " + ingredientes[i].nombre + "\n" +
                    "Precio : " + ingredientes[i].precio + "\n" +
                    "Unidad: " + ingredientes[i].unidad
                );
};




//abrir menu 2
let menu_2 = document.getElementById("menu-receta");
let btn_menu_2 = document.getElementById("btn-menu-2");

btn_menu_2.addEventListener("click", function (e) {
    if (ingredientes.length >= 2) {
        menu_2.style.display = "flex";
        menu_1.style.display = "none";
        
        // Limpiar la lista de ingredientes antes de agregar los nuevos
        let lista_input_ingredientes = document.getElementById("lista-input-ingredientes");
        while (lista_input_ingredientes.firstChild) {
            lista_input_ingredientes.removeChild(lista_input_ingredientes.firstChild);
        }
    } else {
        alert("Debes agregar 2 o más ingredientes para agregar una receta");
    }
});


//-------------------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------------------------------


// Agregar ingredientes en menu_2
let btn_agregar_ingrediente_menu_2 = document.getElementById("agregar-ingrediente-menu-2");
btn_agregar_ingrediente_menu_2.addEventListener("click", function (e) {
    let lista_input_ingredientes = document.getElementById("lista-input-ingredientes");

    // Creo el div que contendrá todo
    let div_ingrediente_receta = document.createElement("div");
    div_ingrediente_receta.classList.add("d-row", "mitad-mitad", "dropdown");

    // El botón que tiene el dropdown con los nombres de los ingredientes
    let btn_ingrediente_receta = document.createElement("button");
    btn_ingrediente_receta.classList.add("hover-blanco", "dropdown");
    btn_ingrediente_receta.innerHTML = "Ingredientes";
    btn_ingrediente_receta.style.width="10rem";

    // Crear y agregar div_lista_input_ingredientes dentro de div_ingrediente_receta
    let div_lista_input_ingredientes = document.createElement("div");
    div_lista_input_ingredientes.classList.add("dropdown", "menu-dropdown-ingredientes");
    div_lista_input_ingredientes.id = "dropdown-menu2";
    div_lista_input_ingredientes.style.zIndex=100;

    btn_ingrediente_receta.addEventListener("click", function (e) {
        // Abre el menú
        div_lista_input_ingredientes.style.display = "flex";

        // Limpiar el div_lista_input_ingredientes antes de agregar los botones
        while (div_lista_input_ingredientes.firstChild) {
            div_lista_input_ingredientes.removeChild(div_lista_input_ingredientes.firstChild);
        }

        for (let i = 0; i < ingredientes.length; i++) {
            let btn_ingrediente = document.createElement("button");
            btn_ingrediente.innerHTML = ingredientes[i].nombre;
            btn_ingrediente.addEventListener("click", function (e) {
                btn_ingrediente_receta.innerHTML = ingredientes[i].nombre;
                input_cantidad_ingredientes.placeholder = `Cantidad de ${ingredientes[i].unidad}`;
                div_lista_input_ingredientes.style.display = "none";
            });
            btn_ingrediente.classList.add("hover-blanco");
            div_lista_input_ingredientes.appendChild(btn_ingrediente);
        }

        // Cierra el menú
        document.addEventListener("click", function (e) {
            if (!div_lista_input_ingredientes.contains(e.target) && !btn_ingrediente_receta.contains(e.target)) {
                div_lista_input_ingredientes.style.display = "none";
            }
        });
    });

    // Input de la cantidad
    let input_cantidad_ingredientes = document.createElement("input");
    input_cantidad_ingredientes.type = "number";
    input_cantidad_ingredientes.classList.add("hover-blanco");
    input_cantidad_ingredientes.placeholder = "Cantidad";
    input_cantidad_ingredientes.style.width="20rem";

    // Botón para eliminar un ingrediente
    let btn_eliminar_ingrediente = document.createElement("button");
    btn_eliminar_ingrediente.innerHTML = "X";
    btn_eliminar_ingrediente.id = "max-w-25";
    btn_eliminar_ingrediente.classList.add("hover-blanco");
    btn_eliminar_ingrediente.title = "Eliminar ingrediente";
    btn_eliminar_ingrediente.addEventListener("click", function (e) {
        lista_input_ingredientes.removeChild(div_ingrediente_receta);
    });

    // Uniones
    div_ingrediente_receta.appendChild(btn_ingrediente_receta);
    div_ingrediente_receta.appendChild(input_cantidad_ingredientes);
    div_ingrediente_receta.appendChild(div_lista_input_ingredientes);
    div_ingrediente_receta.appendChild(btn_eliminar_ingrediente);
    lista_input_ingredientes.appendChild(div_ingrediente_receta);
});

function actualizarPreciosRecetas() {
    recetas_guardadas.forEach((recetaGuardada, index) => {
        let costoReceta = calcularCostoReceta(recetaGuardada.ingredientes);
        let recetaDiv = lista_recetas.children[index];

        let suma_precio_costo = recetaDiv.querySelector(".d-row .justify-content-between p:nth-child(2)");
        suma_precio_costo.innerHTML = `$${costoReceta.toFixed(2)}`;

        let suma_precio_beneficio = recetaDiv.querySelector(".d-row .justify-content-between:nth-child(2) p:nth-child(2)");
        suma_precio_beneficio.innerHTML = `$${(costoReceta * input_beneficio_multiplicacion + input_beneficio_suma).toFixed(2)}`;
    });
    location.reload();
}

// Función para verificar si los botones de ingredientes han cambiado
function verificarCambiosIngredientes() {
    let botones_ingredientes = document.querySelectorAll("#lista-input-ingredientes .dropdown button");
    for (let boton of botones_ingredientes) {
        if (boton.innerHTML === "Ingredientes") {
            return false; // Si algún botón no ha cambiado, devuelve falso
        }
    }
    return true; // Si todos los botones han cambiado, devuelve verdadero
}

// Función para verificar si todos los inputs de cantidad tienen valores
function verificarCantidadIngredientes() {
    let inputs = document.querySelectorAll("#lista-input-ingredientes input[type='number']");
    for (let input of inputs) {
        if (input.value === "") {
            return false; // Si algún input de cantidad está vacío, devuelve falso
        }
    }
    return true; // Si todos los inputs de cantidad tienen valores, devuelve verdadero
}

function calcularCostoReceta(ingredientesReceta) {
    let costoTotal = 0;
    ingredientesReceta.forEach(ingredienteReceta => {
        let ingrediente = ingredientes.find(ing => ing.nombre === ingredienteReceta.Nombre);
        if (ingrediente) {
            let precioUnidad = parseFloat(ingrediente.precio);
            let cantidad = parseFloat(ingredienteReceta.Cantidad);
            costoTotal += precioUnidad * cantidad;
        }
    });
    return costoTotal;
}



function guardar_ingredientes_receta(){
    let ingredientesDivs = document.querySelectorAll("#lista-input-ingredientes .d-row");
    ingredientesDivs.forEach(div => {
        let ingredienteNombre = div.querySelector("button").innerHTML;
        let cantidad = parseFloat(div.querySelector("input").value);
        ingredientes_receta.push({
            Nombre: ingredienteNombre,
            Cantidad: cantidad
        })
    });
    return ingredientes_receta;
}

//agregar receta al dom
guardar_receta.addEventListener("click", function(e){
    if (nombre_receta_nueva.value !="" &&
        lista_input_ingredientes.childElementCount >=2 &&
        verificarCambiosIngredientes() &&
        verificarCantidadIngredientes()
    ){
        // guardar ingredientes
        let ingredientesDivs = document.querySelectorAll("#lista-input-ingredientes .d-row");
        ingredientesDivs.forEach(div => {
            let ingredienteNombre = div.querySelector("button").innerHTML;
            let cantidad = parseFloat(div.querySelector("input").value);
            ingredientes_receta.push({
                Nombre: ingredienteNombre,
                Cantidad: cantidad
            })
        });  

        //creo el div contenedor
        let div_receta=document.createElement("div");
        div_receta.classList.add("div-receta");
        div_receta.style.marginBottom="20px";
        div_receta.style.padding="20px";
        div_receta.style.zIndex="-100";
        
        //creo el nombre de la receta
        let nombre_receta = document.createElement("h3");
        nombre_receta.innerHTML=nombre_receta_nueva.value;
        nombre_receta_nueva.value="";
        nombre_receta.style.textAlign="center";
        div_receta.appendChild(nombre_receta);
    
        //creo el div que contendrá el precio costo
        let div_precio_costo=document.createElement("div");
        div_precio_costo.classList.add("d-row", "justify-content-between");
        let precio_costo=document.createElement("p");
        precio_costo.innerHTML="Precio costo:";
        precio_costo.style.paddingLeft="10px";
        let suma_precio_costo=document.createElement("p");
        suma_precio_costo.innerHTML= `$asd`;
        suma_precio_costo.style.paddingRight="10px";
        div_precio_costo.appendChild(precio_costo);
        div_precio_costo.appendChild(suma_precio_costo);
        div_receta.appendChild(div_precio_costo);
    
        //creo el div que contendrá el precio beneficio
        let div_precio_beneficio=document.createElement("div");
        div_precio_beneficio.classList.add("d-row", "justify-content-between");
        let precio_beneficio=document.createElement("p");
        precio_beneficio.innerHTML="Precio beneficio:";
        precio_beneficio.style.paddingLeft="10px";
        let suma_precio_beneficio=document.createElement("p");
        suma_precio_beneficio.innerHTML=`$asd`;
        suma_precio_beneficio.style.paddingRight="10px";
        div_precio_beneficio.appendChild(precio_beneficio);
        div_precio_beneficio.appendChild(suma_precio_beneficio);
        div_receta.appendChild(div_precio_beneficio);   

        receta.push({
            nombre: nombre_receta.innerHTML,
            ingredientes: ingredientes_receta
        });
        localStorage.setItem("recetas_guardadas", JSON.stringify(receta));

        //creo el boton de detalles y eliminar
        let div_botones_receta=document.createElement("div");
        div_botones_receta.classList.add("d-row", "justify-content-evenly");
        // let boton_detalles=document.createElement("button");
        // boton_detalles.innerHTML="Ver detalles";
        // boton_detalles.classList.add("hover-blanco");
        let boton_eliminar=document.createElement("button");
        boton_eliminar.innerHTML="Eliminar";
        boton_eliminar.classList.add("hover-blanco")
        boton_eliminar.addEventListener("click", function(e){
            let index = Array.from(lista_recetas.children).indexOf(div_receta);
            receta.splice(index,1),
            lista_recetas.removeChild(div_receta);
            console.log(`Se elimino correctamente la receta: ${nombre_receta.innerHTML} `)
            localStorage.setItem("recetas_guardadas", JSON.stringify(receta));
        });



        // div_botones_receta.appendChild(boton_detalles);
        div_botones_receta.appendChild(boton_eliminar);
        div_receta.appendChild(div_botones_receta);
        lista_recetas.appendChild(div_receta);
    
        nombre_receta_nueva.value="";
        menu_2.style.display="none";
    
        console.log(`Se agregó correctamente la receta: ${nombre_receta.innerHTML}\n
            con los ingredientes: ${JSON.stringify(ingredientes_receta)}`);

            location.reload();
    }else{
        alert("Corrige algo");
    }
})

//cargar la receta guardada
let recetas_guardadas = JSON.parse(localStorage.getItem("recetas_guardadas")) || [];
// Cargar la receta guardada
for (let i = 0; i < recetas_guardadas.length; i++) {
    // Crear el div contenedor
    let div_receta = document.createElement("div");
    div_receta.classList.add("div-receta");
    div_receta.style.marginBottom = "20px";
    div_receta.style.padding = "20px";
    div_receta.style.zIndex = "-100";
    
    // Crear el nombre de la receta
    let nombre_receta = document.createElement("h3");
    nombre_receta.innerHTML = recetas_guardadas[i].nombre;
    nombre_receta.style.textAlign = "center";
    div_receta.appendChild(nombre_receta);

    // Calcular el costo de la receta
    let costoReceta = calcularCostoReceta(recetas_guardadas[i].ingredientes);

    // Crear el div que contendrá el precio costo
    let div_precio_costo = document.createElement("div");
    div_precio_costo.classList.add("d-row", "justify-content-between");
    let precio_costo = document.createElement("p");
    precio_costo.innerHTML = "Precio costo:";
    precio_costo.style.paddingLeft = "10px";
    let suma_precio_costo = document.createElement("p");
    suma_precio_costo.innerHTML = `$${costoReceta.toFixed(2)}`;
    suma_precio_costo.style.paddingRight = "10px";
    div_precio_costo.appendChild(precio_costo);
    div_precio_costo.appendChild(suma_precio_costo);
    div_receta.appendChild(div_precio_costo);

    // Crear el div que contendrá el precio beneficio
    let div_precio_beneficio = document.createElement("div");
    div_precio_beneficio.classList.add("d-row", "justify-content-between");
    let precio_beneficio = document.createElement("p");
    precio_beneficio.innerHTML = "Precio beneficio:";
    precio_beneficio.style.paddingLeft = "10px";
    let suma_precio_beneficio = document.createElement("p");
    suma_precio_beneficio.innerHTML = `$${(costoReceta * 2 + 20 ).toFixed(2)}`; // Ejemplo: beneficio del 20%
    suma_precio_beneficio.style.paddingRight = "10px";
    div_precio_beneficio.appendChild(precio_beneficio);
    div_precio_beneficio.appendChild(suma_precio_beneficio);
    div_receta.appendChild(div_precio_beneficio);

    // Crear el botón de detalles y eliminar
    let div_botones_receta = document.createElement("div");
    div_botones_receta.classList.add("d-row", "justify-content-evenly");
    // let boton_detalles = document.createElement("button");
    // boton_detalles.innerHTML = "Ver detalles";
    // boton_detalles.classList.add("hover-blanco");
    let boton_eliminar = document.createElement("button");
    boton_eliminar.innerHTML = "Eliminar";
    boton_eliminar.classList.add("hover-blanco");

    boton_eliminar.addEventListener("click", function(e) {
        let index = Array.from(lista_recetas.children).indexOf(div_receta);
        receta.splice(index, 1),
        lista_recetas.removeChild(div_receta);
        console.log(`Se eliminó correctamente la receta: ${nombre_receta.innerHTML}`);
        localStorage.setItem("recetas_guardadas", JSON.stringify(receta));
    });

    // div_botones_receta.appendChild(boton_detalles);
    div_botones_receta.appendChild(boton_eliminar);
    div_receta.appendChild(div_botones_receta);
    lista_recetas.appendChild(div_receta);

    console.log(`Se cargó correctamente la receta en el índice: ${i} \n
        Con el nombre: ${recetas_guardadas[i].nombre} \n
        Con los ingredientes: ${JSON.stringify(recetas_guardadas[i].ingredientes)}`)
}

// Cerrar listas
let btn_cerrar_menus = document.getElementById("cerrar");
btn_cerrar_menus.addEventListener("click", function (e) {
    
    menu_1.style.display = "none";
});
let btn_cerrar_menu_2 = document.getElementById("cerrar2");
btn_cerrar_menu_2.addEventListener("click", function (e) {
    
    menu_2.style.display = "none";
});
let btn_cerrar_menu_3 = document.getElementById("cerrar3");
btn_cerrar_menu_3.addEventListener("click", function(e){
    
    menu_cambiar.style.display = "none"
});
document.addEventListener("click", function (e) {
    if (!menu_dropdown.contains(e.target) && !btn_dropdown.contains(e.target)) {
        menu_dropdown.style.display = "none";
    }
    if (!menu_1.contains(e.target) && !btn_menu_1.contains(e.target)) {
        menu_1.style.display = "none";
    }
});

