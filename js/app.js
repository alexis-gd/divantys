// Variables
// Listeners
document.getElementById("btn_armar").addEventListener('click', function(event) {
    var tam_mesa = document.querySelector("input[name=mesa]:checked").value;
    location.href = `index2.html?tam_mesa=${tam_mesa}`;
});
// Funciones