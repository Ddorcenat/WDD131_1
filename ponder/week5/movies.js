const yearSpan = document.querySelector("#year");
if (yearSpan) {
    yearSpan.textContent = `© ${new Date().getFullYear()}`;
}
