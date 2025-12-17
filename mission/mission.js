let selectElem = document.querySelector("select");
let logo = document.querySelector("img.logo");

selectElem.addEventListener("change", changeTheme);

function changeTheme() {
    let current = selectElem.value;

    if (current == "dark") {
        document.body.classList.add("dark");
        logo.src = "https://wddbyui.github.io/wdd131/images/byui-logo-white.png";
        logo.alt = "BYU-Idaho logo (white)";
    } else if (current == "light") {
        document.body.classList.remove("dark");
        logo.src = "image/byui-logo_blue.webp";
        logo.alt = "BYU-Idaho logo";
    }
}
