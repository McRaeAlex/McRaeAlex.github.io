var toggle = document.getElementById("toggle");
var nav = document.getElementById("nav");

toggle.addEventListener("click", function (event) {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
});