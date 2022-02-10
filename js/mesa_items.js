document.addEventListener('DOMContentLoaded', function(event) {
    const btn_less_clicked = document.querySelectorAll('.btn_opciones_menos');
    const btn_plus_clicked = document.querySelectorAll('.btn_opciones_mas');
    document.querySelector('.mesa_suma_span').innerHTML = localStorage.getItem("live_mesa");

    // cuando le den click alguno de los botones suma al elemento
    btn_plus_clicked.forEach(element => {
        element.addEventListener('click', function(event) {
            // almacenamos valores
            const unidad = 12;
            const tipo_plus = element.previousSibling.previousSibling.dataset.tipo;
            const opcion_plus = element.previousSibling.previousSibling.dataset.opcion;
            const input_plus = element.previousSibling.previousSibling;
            const valor_actual_input = Number(input_plus.value);
            const valor_pre_final_input = valor_actual_input + unidad;
            const valor_pre_final_storage = Number(localStorage.getItem("live_mesa")) + unidad;
            // validamos que sea correcta la operación
            if (valor_pre_final_storage <= getParameterByName("tam_mesa")) {
                input_plus.value = valor_pre_final_input;
                document.querySelector('.mesa_suma_span').innerHTML = valor_pre_final_storage;
                localStorage.setItem("live_mesa", valor_pre_final_storage);
                const objeto = JSON.parse(localStorage.getItem("titulos" + tipo_plus + ""));
                objeto[opcion_plus].valor = valor_pre_final_input;
                localStorage.setItem("titulos" + tipo_plus + "", JSON.stringify(objeto));
            } else {
                element.parentNode.parentNode.style.animation = "shake 0.5s ease";
                element.parentNode.parentNode.addEventListener("animationend", () => {
                    element.parentNode.parentNode.style.animation = "";
                });
            }
            if (localStorage.getItem("live_mesa") == getParameterByName("tam_mesa")) {                
                mesaLlena(tipo_plus);                
            }
        });
    });
    btn_less_clicked.forEach(element => {
        // cuando le den click alguno de los botones resta al elemento
        element.addEventListener('click', function(event) {
            // almacenamos valores
            const unidad = 12;
            const tipo_less = element.nextSibling.nextSibling.dataset.tipo;
            const opcion_less = element.nextSibling.nextSibling.dataset.opcion;
            const input_less = element.nextSibling.nextSibling;
            const valor_actual_input = Number(input_less.value);
            const valor_pre_final_input = valor_actual_input - unidad;
            const valor_pre_final_storage = Number(localStorage.getItem("live_mesa")) - unidad;
            // validamos que sea correcta la operación
            if (valor_pre_final_storage >= 0 && valor_pre_final_input >= 0) {
                input_less.value = valor_pre_final_input;
                document.querySelector('.mesa_suma_span').innerHTML = valor_pre_final_storage;
                localStorage.setItem("live_mesa", valor_pre_final_storage);
                const objeto = JSON.parse(localStorage.getItem("titulos" + tipo_less + ""));
                objeto[opcion_less].valor = valor_pre_final_input;
                localStorage.setItem("titulos" + tipo_less + "", JSON.stringify(objeto));
            } else {
                element.parentNode.parentNode.style.animation = "shake 0.5s ease";
                element.parentNode.parentNode.addEventListener("animationend", () => {
                    element.parentNode.parentNode.style.animation = "";
                });
            }
        });
    });
});
document.querySelector('.mesa_suma').addEventListener('click', function(event) {
    const objeto1 = JSON.parse(localStorage.getItem("titulos1"));
    const objeto2 = JSON.parse(localStorage.getItem("titulos2"));
    const objeto3 = JSON.parse(localStorage.getItem("titulos3"));
    let articulo1 = '';
    let articulo2 = '';
    let articulo3 = '';
    let tipo1 = '';
    let tipo2 = '';
    let tipo3 = '';
    // resetear
    document.querySelector('.color1').innerHTML = "";
    document.querySelector('.color2').innerHTML = "";
    document.querySelector('.color3').innerHTML = "";
    // existe
    let vtotal1 = 0;
    let vtotal2 = 0;
    let vtotal3 = 0;
    // si alguno de esta sección tiene un valor imprime la sección y los elementos que tengan valor
    objeto1.forEach(element => {
        // evaluamos si tienen valor los elementos
        if (element.valor > 0) {   
            document.querySelector('.color1').classList.remove('d-none');
            tipo1 = `<div class="tipo_opcion"><img src="img/iconos/1-postres.svg" class="img_opcion" alt=""></div>`;
            articulo1 += `<div class="articulo_opcion"><div><p class="p_articulo">${element.titulo}</p></div><span class="span_articulo">${element.valor}</span></div>`;            
            document.querySelector('.color1').innerHTML = tipo1;            
            document.querySelector('.color1').innerHTML += articulo1;
            vtotal1 += element.valor;             
        }
    });
    objeto2.forEach(element => {
        // evaluamos si tienen valor los elementos
        if (element.valor > 0) {  
            document.querySelector('.color2').classList.remove('d-none');
            tipo2 = `<div class="tipo_opcion"><img src="img/iconos/1-dulces.svg" class="img_opcion" alt=""></div>`;
            articulo2 += `<div class="articulo_opcion"><div><p class="p_articulo">${element.titulo}</p></div><span class="span_articulo">${element.valor}</span></div>`;            
            document.querySelector('.color2').innerHTML = tipo2;            
            document.querySelector('.color2').innerHTML += articulo2;
            vtotal2 += element.valor;        
        }
    });
    objeto3.forEach(element => {
        // evaluamos si tienen valor los elementos
        if (element.valor > 0) {  
            document.querySelector('.color3').classList.remove('d-none');
            tipo3 = `<div class="tipo_opcion"><img src="img/iconos/1-enchilosos.svg" class="img_opcion" alt=""></div>`;
            articulo3 += `<div class="articulo_opcion"><div><p class="p_articulo">${element.titulo}</p></div><span class="span_articulo">${element.valor}</span></div>`;            
            document.querySelector('.color3').innerHTML = tipo3;            
            document.querySelector('.color3').innerHTML += articulo3;
            vtotal3 += element.valor;          
        }
    });
    const img_mesa = `${vtotal1 + vtotal2 + vtotal3} <img src="img/iconos/ic-mesa.svg" class="total_img" alt="">`
    document.querySelector('.span_total').innerHTML = img_mesa;
    $('#vistaMesaModal').modal("show");
});
// avisar mesa llena
function mesaLlena(tipo) {
    const mesa_aviso = document.querySelector('.mesa_aviso');
    mesa_aviso.classList.remove('d-none');
    mesa_aviso.style.animation = "mesa_aviso 2s ease";
    mesa_aviso.addEventListener("animationend", () => {
        mesa_aviso.classList.add('d-none');
        mesa_aviso.style.animation = "";
    });
}