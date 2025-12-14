async function searchMeals(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
    query
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data.meals ?? [];
}

function getIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (name && name.trim()) {
      ingredients.push({
        name: name.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return ingredients;
}

function classifyMeal(meal) {
  const ingredients = getIngredients(meal);
  const count = ingredients.length;

  const tastyKeywords = [
    "cheese",
    "cheddar",
    "mozzarella",
    "parmesan",
    "cream",
    "butter",
    "garlic",
    "chili",
    "chilli",
    "herb",
    "bacon",
    "chocolate",
    "vanilla",
    "ginger",
    "bbq",
    "barbecue",
    "spice",
    "spices",
    "honey",
    "syrup",
    "caramel"
  ];


  let tastyHits = 0;
  const namesLower = ingredients.map((ing) => ing.name.toLowerCase());
  namesLower.forEach((name) => {
    tastyKeywords.forEach((word) => {
      if (name.includes(word)) {
        tastyHits++;
      }
    });
  });

  if (count <= 7) {
    return { label: "Fast", ingredients, count };
  }


  if (count <= 10) {
    if (tastyHits >= 3) {
      return { label: "Tasty", ingredients, count };
    }
    return { label: "Easy", ingredients, count };
  }


  return { label: "Tasty", ingredients, count };
}



function clearRecipes() {
  const resultsContainer = document.querySelector("#recipe-results");
  if (resultsContainer) {
    resultsContainer.innerHTML = "";
  }
}

function setStatus(message) {
  const status = document.querySelector("#recipe-status");
  if (status) {
    status.textContent = message;
  }
}


function renderRecipes(meals, pageType) {
  const resultsContainer = document.querySelector("#recipe-results");
  if (!resultsContainer) return 0;

  clearRecipes();

  let renderedCount = 0;

  meals.forEach((meal) => {
    const { label, ingredients, count } = classifyMeal(meal);


    if (pageType === "easy" && label !== "Easy") return;
    if (pageType === "fast" && label !== "Fast") return;
    if (pageType === "tasty" && label !== "Tasty") return;


    renderedCount++;

    const badgeClassMap = {
      Fast: "recipe-badge recipe-badge--fast",
      Easy: "recipe-badge recipe-badge--easy",
      Tasty: "recipe-badge recipe-badge--tasty",
    };

    const badgeClass = badgeClassMap[label] || "recipe-badge";

    const card = document.createElement("article");
    card.className = "recipe-card";

    card.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="recipe-image" />
      <div class="recipe-body">
        <span class="${badgeClass}">${label}</span>
        <h3>${meal.strMeal}</h3>
        <p class="recipe-meta">
          ${meal.strArea ? `<span>${meal.strArea}</span>` : ""}
          ${meal.strCategory ? `<span>${meal.strCategory}</span>` : ""}
        </p>
        <button type="button"
                class="recipe-ingredients-toggle"
                data-count="${count}">
          Show ingredients (${count})
        </button>
        <div class="recipe-ingredients" hidden>
          <ul>
            ${ingredients
              .map(
                (ing) =>
                  `<li>${ing.measure ? ing.measure + " " : ""}${ing.name}</li>`
              )
              .join("")}
          </ul>
        </div>
      </div>
    `;

    const toggleBtn = card.querySelector(".recipe-ingredients-toggle");
    const ingredientsDiv = card.querySelector(".recipe-ingredients");

    if (toggleBtn && ingredientsDiv) {
      toggleBtn.addEventListener("click", () => {
        const isHidden = ingredientsDiv.hasAttribute("hidden");
        const countText = toggleBtn.dataset.count || "";

        if (isHidden) {
          ingredientsDiv.removeAttribute("hidden");
          toggleBtn.textContent = `Hide ingredients (${countText})`;
        } else {
          ingredientsDiv.setAttribute("hidden", "true");
          toggleBtn.textContent = `Show ingredients (${countText})`;
        }
      });
    }

    resultsContainer.appendChild(card);
  });

  return renderedCount;
}


async function loadRecipes(query = "chicken", pageType = "all") {
  const resultsContainer = document.querySelector("#recipe-results");
  if (!resultsContainer) return; 

  const label =
    pageType === "easy"
      ? "easy recipes"
      : pageType === "fast"
      ? "fast recipes"
      : pageType === "tasty"
      ? "tasty recipes"
      : "recipes";

  setStatus(`Loading ${label}...`);

  try {
    const meals = await searchMeals(query);

    if (!meals || !meals.length) {
      clearRecipes();
      setStatus(`No ${label} found for "${query}". Try another search.`);
      return;
    }

    const shown = renderRecipes(meals, pageType);

    if (!shown) {
      setStatus(`No ${label} found for "${query}". Try another search.`);
      return;
    }

    setStatus(`Showing ${shown} ${label} for "${query}"`);
  } catch (error) {
    console.error(error);
    clearRecipes();
    setStatus("Sorry, something went wrong while loading recipes.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#recipe-search-form");
  const searchInput = document.querySelector("#recipe-search-input");
  const resultsContainer = document.querySelector("#recipe-results");


  if (!searchForm || !searchInput || !resultsContainer) return;

  const pageType = document.body.dataset.pageType || "all";

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim() || "chicken";
    loadRecipes(query, pageType);
  });

  loadRecipes("chicken", pageType);
});
