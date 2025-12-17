const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

menuBtn.addEventListener("click", () => {
    nav.classList.toggle("hide");
    menuBtn.classList.toggle("change");
});

document.querySelector("#year").textContent = `© ${new Date().getFullYear()}`;
