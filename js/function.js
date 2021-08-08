var btnOp1 = document.getElementById('btnOp1'),
    btnOp2 = document.getElementById('btnOp2'),
    btnOp3 = document.getElementById('btnOp3'),
    btnOp4 = document.getElementById('btnOp4');
var main = document.querySelector('.main-carousel');

var flkty = new Flickity(main, {
    cellAlign: 'center',
    contain: true,
    wrapAround: false,
    draggable: true,
    groupCells: true,
    prevNextButtons: false,
    pageDots: true,
    lazyLoad: true,
    bgLazyLoad: true,
    hash: true
});

flkty.on('change', function(event, pointer, cellElement, cellIndex, select) {
    if (event == 0) {
        btnOp1.classList.add("zoom")
        btnOp2.classList.remove("zoom")
        btnOp3.classList.remove("zoom")
    } else if (event == 3) {
        btnOp1.classList.remove("zoom")
        btnOp2.classList.add("zoom")
        btnOp3.classList.remove("zoom")
    } else if (event == 7) {
        btnOp1.classList.remove("zoom")
        btnOp2.classList.remove("zoom")
        btnOp3.classList.add("zoom")
    }
});

document.addEventListener('DOMContentLoaded', function(event) {
    var hash = window.location.hash
    if (hash == "#table-1") {
        btnOp1.classList.add("zoom")
        btnOp2.classList.remove("zoom")
        btnOp3.classList.remove("zoom")
    } else if (hash == "#table-2") {
        btnOp1.classList.remove("zoom")
        btnOp2.classList.add("zoom")
        btnOp3.classList.remove("zoom")
    } else if (hash == "#table-3") {
        btnOp1.classList.remove("zoom")
        btnOp2.classList.remove("zoom")
        btnOp3.classList.add("zoom")
    }
});
AOS.init();