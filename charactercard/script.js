const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "images/snortleblat.webp",

    attacked() {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            alert("The character has died.");
        }

        updateDisplay();
    },

    levelUp() {
        this.level += 1;
        updateDisplay();
    }
};

function updateDisplay() {
    document.getElementById("name").textContent = character.name;
    document.getElementById("class").textContent = `Class: ${character.class}`;
    document.getElementById("level").textContent = `Level: ${character.level}`;
    document.getElementById("health").textContent = `Health: ${character.health}`;
}

updateDisplay();

updateDisplay();
