function $(el) {
    return document.getElementById(el);
}

// This toggles the navigation on mobile
$("navbar-toggle").addEventListener("click", () => {
    $("navbar-nav").classList.toggle("show");
    $("navbar-toggle").classList.toggle("active");
});