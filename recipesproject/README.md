# Cook's Companion

A small recipe web app that pulls real meal data from TheMealDB API and organizes recipes into three helpful groups: **Fast**, **Easy**, and **Tasty**.

This project was built for my WDD131 course to practice HTML, CSS, and JavaScript (including working with APIs, arrays, and conditional logic).

---

## 1. Project Overview

Cook's Companion has:

- A home page with a large hero image and a short “Why Choose Us?” section.
- A Recipes page where users can search for meals (using an API).
- Three category pages:
  - `fast.html` – shows meals that are quick (few ingredients).
  - `easy.html` – shows meals with a medium number of ingredients.
  - `tasty.html` – shows complex or extra-flavorful meals.

Meals are fetched live from the API and displayed as cards with an image, title, cuisine information, and a button to show/hide the full ingredient list.

---

## 2. Pages and File Structure

Main files

- `index.html` – Home page with:
  - Logo and navigation
  - Hero section with a full-width kitchen image and CTA button
  - “Why Choose Us?” cards (Fast, Easy, Tasty) that link to their own pages

- `recipes.html` – General recipes search page  
  Uses `data-page-type="all"` so all recipes are shown (no filtering besides the search).

- `fast.html` – Shows only Fast recipes  
  Uses `data-page-type="fast"` so JS filters to recipes with 7 or fewer ingredients.

- `easy.html` – Shows only Easy recipes  
  Uses `data-page-type="easy"` so JS filters to recipes with 8–10 ingredients.

- `tasty.html` – Shows only Tasty recipes  
  Uses `data-page-type="tasty"` so JS filters to recipes with more than 10 ingredients or “extra flavorful” ones (see logic below).

- `style.css` – Shared styling for all pages:
  - Layout, hero image, cards, footer, etc.
  - Re-used header and footer styles
  - Styles for the recipe cards and labels
  - Light / dark theme styling driven by a hidden checkbox

- `main.js` – Shared JavaScript:
  - Fetches data from TheMealDB API
  - Builds ingredient arrays
  - Classifies each meal as Fast / Easy / Tasty
  - Renders recipe cards to the page
  - Handles the search form and ingredient toggles

---

## 3. How the Recipes and Categories Work

All recipe data in this app comes from TheMealDB public API.  
When a user searches (or when a page first loads with the default search `"chicken"`), the app:

1. Calls the API using `searchMeals(query)` to get an array of meal objects.
2. Builds an ingredient list for each meal by looping through `strIngredient1..20` and `strMeasure1..20`.
3. Classifies each meal into one of three categories based on the number of ingredients:
   - Fast– recipes with 7 or fewer ingredients
   - Easy – recipes with 8 to 10 ingredients
   - Tasty – recipes with 11+ ingredients (these are usually richer or more complex)

4. The results are then filtered by page type:
   - `recipes.html` (All Recipes) → shows every recipe that matches the search.
   - `fast.html` → shows only meals classified as Fast.
   - `easy.html` → shows only meals classified as Easy.
   - `tasty.html` → shows only meals classified as Tasty.

5. Finally, the app renders recipe cards using JavaScript:
   - Each card displays a category badge (FAST / EASY / TASTY), the meal name, cuisine, and type.
   - A “Show ingredients (N)” button lets users toggle a list of all ingredients for that recipe.

This logic uses arrays, a for loop, and array methods like `filter` and `forEach` to process and display the recipes dynamically based on the user’s search and the current page.


### 3.1. Fetching recipes

In `main.js`, recipes are loaded from TheMealDB:

```js
async function searchMeals(query) {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.meals ?? [];
}
