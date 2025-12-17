import recipes from "./recipes.mjs";

function random(num) {
  return Math.floor(Math.random() * num);
}

function getRandomListEntry(list) {
    const listLength = list.length;
        const randomNum = random(listLength);
    return list[randomNum];
}

function tagsTemplate(tags) {
    if (!Array.isArray(tags) || tags.length === 0) return "";
    const html = tags.map((tag) => `<li>${tag}</li>`).join("");
    return `<ul class="recipe__tags">${html}</ul>`;
}

function ratingTemplate(rating) {
    const safeRating = Math.max(0, Math.min(5, Math.round(Number(rating) || 0)));

    let html = `<span class="rating" role="img" aria-label="Rating: ${safeRating} out of 5 stars">`;

    for (let i = 1; i <= 5; i += 1) {
    if (i <= safeRating) {
        html += `<span aria-hidden="true" class="icon-star">⭐</span>`;
    } else {
        html += `<span aria-hidden="true" class="icon-star-empty">☆</span>`;
    }
}

    html += `</span>`;
    return html;
}

function recipeTemplate(recipe) {
    const name = recipe?.name ?? "Recipe";
    const image = recipe?.image ?? "";
    const description = recipe?.description ?? "";
    const tags = recipe?.tags ?? [];
    const rating = recipe?.rating ?? 0;

    return `
    <figure class="recipe">
        <img src="${image}" alt="image of ${name}" />
        <figcaption>
        ${tagsTemplate(tags)}
        <h2><a href="#">${name}</a></h2>
        <p class="recipe__ratings">
        ${ratingTemplate(rating)}
        </p>
        <p class="recipe__description">
        ${description}
        </p>
    </figcaption>
    </figure>
`;}

function renderRecipes(recipeList) {
    const output = document.querySelector("#resultsList");
    const html = recipeList.map(recipeTemplate).join("");
    output.innerHTML = html;
}

function init() {
    const recipe = getRandomListEntry(recipes);
    renderRecipes([recipe]); 
}

init();

function filterRecipes(query) {
    const q = query.trim().toLowerCase();

const filtered = recipes.filter((recipe) => {
    if (!q) return true;

    const name = (recipe.name || "").toLowerCase();
    const desc = (recipe.description || "").toLowerCase();

    const tagMatch = Array.isArray(recipe.tags)
        ? recipe.tags.find((t) => String(t).toLowerCase().includes(q))
        : false;

    const ingredientMatch = Array.isArray(recipe.recipeIngredient)
        ? recipe.recipeIngredient.find((i) => String(i).toLowerCase().includes(q))
        : false;

    return (
        name.includes(q) ||
        desc.includes(q) ||
        Boolean(tagMatch) ||
        Boolean(ingredientMatch)
    );
});

filtered.sort((a, b) => {
    const aName = (a.name || "").toLowerCase();
    const bName = (b.name || "").toLowerCase();
    return aName.localeCompare(bName);});
return filtered;
}

function searchHandler(e) {
    e.preventDefault();
    const input = document.querySelector("#searchInput");
    const query = input ? input.value : "";
    const results = filterRecipes(query);
    renderRecipes(results);
}

const form = document.querySelector(".search");
if (form) form.addEventListener("submit", searchHandler);
