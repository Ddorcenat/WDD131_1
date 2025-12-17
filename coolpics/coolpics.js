const menuButton = document.querySelector(".menu-button");

function toggleMenu() {
    const menu = document.querySelector(".menu");
    menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
    const menu = document.querySelector(".menu");
    if (window.innerWidth > 1000) {
        menu.classList.remove("hide");
    } else {
        menu.classList.add("hide");
    }
}

handleResize();
window.addEventListener("resize", handleResize);

const gallery = document.querySelector(".gallery");

const modal = document.createElement("dialog");
document.body.appendChild(modal);

function viewImage(event) {
    const img = event.target.closest("img");
    if (!img) return;

    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt") || "";

    let fullSrc = src.replace("-sm.", "-full.");

    modal.innerHTML = `<img alt="${alt}"><button class="close-viewer">X</button>`;

    const modalImg = modal.querySelector("img");
    const closeBtn = modal.querySelector(".close-viewer");

    modalImg.src = fullSrc;

    closeBtn.addEventListener(
        "click",
        () => {
            modal.close();
        },
        { once: true }
    );

    modal.showModal();
}

gallery.addEventListener("click", viewImage);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});
