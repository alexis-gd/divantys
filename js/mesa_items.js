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
                console.log("si soy mayor o igual a 0")
                input_less.value = valor_pre_final_input;
                document.querySelector('.mesa_suma_span').innerHTML = valor_pre_final_storage;
                localStorage.setItem("live_mesa", valor_pre_final_storage);
                const objeto = JSON.parse(localStorage.getItem("titulos" + tipo_less + ""));
                objeto[opcion_less].valor = valor_pre_final_input;
                console.log(objeto);
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
    $('#vistaMesaModal').modal("show");
});