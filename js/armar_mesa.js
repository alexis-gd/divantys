// variables estaticas de opciones
const titulos1 = [{
        titulo: 'Vaso Mixto',
        descripcion: '(pulparindo, cachuate conchile, cacahuate japonés)',
        tipo: 1,
        opcion: 0,
        valor: 0
    },
    {
        titulo: 'Banderillas de coco',
        descripcion: '',
        tipo: 1,
        opcion: 1,
        valor: 0
    }
];
const titulos2 = [{
        titulo: 'Vaso Mixto',
        descripcion: '(pulparindo, cachuate conchile, cacahuate japonés)',
        tipo: 2,
        opcion: 0,
        valor: 0
    },
    {
        titulo: 'Banderillas de coco',
        descripcion: '',
        tipo: 2,
        opcion: 1,
        valor: 0
    },
    {
        titulo: 'Bombones',
        descripcion: '',
        tipo: 2,
        opcion: 2,
        valor: 0
    },
];
const titulos3 = [{
        titulo: 'Vaso Mixto',
        descripcion: '(pulparindo, cachuate conchile, cacahuate japonés)',
        tipo: 3,
        opcion: 0,
        valor: 0
    },
    {
        titulo: 'Banderillas de coco',
        descripcion: '',
        tipo: 3,
        opcion: 1,
        valor: 0
    },
    {
        titulo: 'Bombones',
        descripcion: '',
        tipo: 3,
        opcion: 2,
        valor: 0
    },
    {
        titulo: 'Chocoretas',
        descripcion: '',
        tipo: 3,
        opcion: 3,
        valor: 0
    },
    {
        titulo: 'Frutitas',
        descripcion: '(granel)',
        tipo: 3,
        opcion: 4,
        valor: 0
    },
];
const btn_tipo = document.querySelectorAll('.tipo_img');
// crear mensaje al cotizar
document.getElementById('cotizar').addEventListener('click', function(event) {
    var p_articulo = document.querySelectorAll(".p_articulo");
    var span_articulo = document.querySelectorAll(".span_articulo");
    const articulos = [];
    const cantidad = [];
    p_articulo.forEach(element => {
            span_articulo.forEach(element2 => {
                articulos.push("%0AA: " + element.innerHTML + " U: " + element2.innerHTML)
            })
        })
        // Almacenar la cotización en el servidor
    const mensaje = '¡Hola me gustaría cotizar esta mesa que he creado!%0A Cotización: 874358';
    S(mensaje);
});
// listener añadir a localStorage el tamaño de la mesa
document.addEventListener('DOMContentLoaded', function(event) {
    if (getLocalStorage("live_mesa") == null) {
        // const live_mesa = new Number(getParameterByName("tam_mesa"));
        // localStorage.setItem("live_mesa", live_mesa);
        localStorage.setItem("live_mesa", 0);
    }
    if (getLocalStorage("titulos1") == null) {
        localStorage.setItem("titulos1", JSON.stringify(titulos1));
    }
    if (getLocalStorage("titulos2") == null) {
        localStorage.setItem("titulos2", JSON.stringify(titulos2));
    }
    if (getLocalStorage("titulos3") == null) {
        localStorage.setItem("titulos3", JSON.stringify(titulos3));
    }
});
// listener renviar al tipo
btn_tipo.forEach(element => {
    element.addEventListener('click', function(event) {
        document.querySelectorAll('.tipo_img').forEach(element => element.classList.remove('clicked'));
        const live_mesa = getParameterByName('live_mesa')
        this.classList.add('clicked');
        const tam_mesa = getParameterByName('tam_mesa');
        location.href = `armar_mesa.html?tam_mesa=${tam_mesa}&tipo_mesa=${this.dataset.type}`;
    });
});
// si entran directo
document.addEventListener('DOMContentLoaded', function(event) {
    if (getParameterByName('tam_mesa') == "" || getParameterByName('tipo_mesa') == "") {
        location.href = `index.html`;
    }
});
// listener setear el tipo
document.addEventListener('DOMContentLoaded', function(event) {
    const tipo_mesa = getParameterByName('tipo_mesa');
    document.querySelectorAll('.tipo_img').forEach(element => {
        element.classList.remove('clicked')
        if (element.dataset.type == tipo_mesa) {
            element.classList.add('clicked')
        }
    });
    const objeto = JSON.parse(localStorage.getItem("titulos" + tipo_mesa + ""));
    if (tipo_mesa == 1) {
        changeType('#D15F81', '#F09C82', 'postres');
        createOptions(objeto);
    }
    if (tipo_mesa == 2) {
        changeType('#A2C439', '#935EA4', 'dulces');
        createOptions(objeto);
    }
    if (tipo_mesa == 3) {
        changeType('#F4971E', '#DD4B1A', 'enchilosos');
        createOptions(objeto);
    }
});
// obtener el tamaño de la mesa del localStorage
function getLocalStorage(name) {
    let live_mesa_storage = localStorage.getItem(name);
    return live_mesa_storage;
}
// actualizar el valor de un localStorage
// function setLocalStorage(name, valor) {
//     localStorage.setItem(name, valor);
// }
// borrar un item localStorage
// function removeItemStorage(name) {
//     localStorage.removeItem(name);
// }
// borrar todo el local storage
// function clearLocalStorage() {
//     localStorage.clear();
// }
// obtener variables de la url pasandole el nombre de la variable
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
// crear las opciones
function createOptions(array) {
    const box_opciones = document.querySelector('.box_opciones');
    array.forEach(element => {
        const opcion = `<div class="opciones op_color1">
        <div class="opciones_col1">
            <span class="opciones_titulo">${element.titulo}</span>
            <span class="opciones_descripcion">${element.descripcion}</span>
        </div>
        <div class="opciones_col2">
            <button class="btn btn_opciones_menos"><img src="img/iconos/less.svg" class="img_less" alt=""></button>
            <input type="text" class="btn opciones_btn" value="${element.valor}" data-tipo="${element.tipo}" data-opcion="${element.opcion}" readonly="readonly">
            <button class="btn btn_opciones_mas"><img src="img/iconos/plus.svg" class="img_plus" alt=""></button>
        </div>
        </div>`;
        box_opciones.innerHTML += opcion;
    });
}
// cambiar a la opción seleccionada
function changeType(hex1, hex2, nombre) {
    document.documentElement.style.setProperty('--color-striped1', hex1);
    document.documentElement.style.setProperty('--color-striped2', hex2);
    var img_header = document.querySelector(".bg");
    var img_logo = document.querySelector(".logo_img");
    var img_texto = document.querySelector(".tipo_img_texto");
    var img_body = document.querySelector("body");
    img_header.style.backgroundImage = "url('img/header-" + nombre + ".png')";
    img_logo.src = "img/iconos/divantys_" + nombre + ".svg";
    img_texto.src = "img/iconos/2-" + nombre + ".svg";
    img_body.style.backgroundImage = "url('img/fondo-" + nombre + ".jpg')";
}
// usar api por dispositivo
const S = (mensaje) => {
        if (DM()) {
            window.open("https://api.whatsapp.com/send?phone=5216692402399&text=" + mensaje + "&app_absent=0", "_blank");
        } else {
            window.open("https://web.whatsapp.com/send?phone=5216692402399&text=" + mensaje + "&app_absent=0", "_blank");
        }
    }
    // validar dispositivo
function DM() {
    const tm = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return tm.some((tmi) => {
        return navigator.userAgent.match(tmi);
    });
}