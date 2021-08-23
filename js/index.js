// Variables
const btn_redes = document.querySelectorAll('.btn_redes');
const botones_mesa = document.querySelectorAll(".btn_card");
// Listeners
btn_redes.forEach(element => {
    console.log(element)
    element.addEventListener('click', function(event) {
        element.previousSibling.previousSibling.classList.toggle('d-none');
    });
});
botones_mesa.forEach(btn_card => {
    btn_card.addEventListener('click', function(event) {
        const btnPress = this.dataset.type;
        document.querySelector("input[name=tipo]").value = btnPress;
        $('#mesaModal').modal("show");
    });
});
document.getElementById("btn_armar").addEventListener('click', function(event) {
    var tipo_mesa = document.querySelector("input[name=tipo]").value;
    var tam_mesa = document.querySelector("input[name=mesa]:checked").value;
    location.href = `armar_mesa.html?tam_mesa=${tam_mesa}&tipo_mesa=${tipo_mesa}`;
});
// Funciones