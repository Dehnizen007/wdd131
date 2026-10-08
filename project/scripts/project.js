const recipes = [
  {
    id: "jollof-rice",
    name: "Smoky tomato jollof",
    image: "images/jollof.jpg",
    width: 720,
    height: 426,
    alt: "Jollof rice served with vegetables",
    time: "ONE-POT FAVORITE · ABOUT 50 MIN",
    summary: "Rice simmers in a fragrant tomato-and-pepper base. Add chicken or serve with extra vegetables.",
    ingredients: ["2 cups parboiled rice", "3 tomatoes and 1 red bell pepper", "1 onion, garlic, and ginger", "2 cups low-sodium stock", "Thyme, curry powder, and cooking oil"],
    steps: ["Blend tomatoes and pepper; cook with onion until thickened.", "Stir in seasonings, stock, and rinsed rice.", "Cover and simmer gently until rice is tender, adding a splash of water if needed."],
    tags: ["rice", "tomato", "vegetarian", "more-veg", "lower-sodium"]
  },
  {
    id: "egusi-soup",
    name: "Egusi & leafy greens",
    image: "images/egusi.jpg",
    width: 720,
    height: 717,
    alt: "Egusi soup with ponmo and beef",
    time: "COMFORTING STEW · ABOUT 45 MIN",
    summary: "Ground melon seeds make a nutty, satisfying soup with greens and your choice of fish or beans.",
    ingredients: ["1 cup ground egusi (melon seeds)", "3 cups chopped leafy greens", "1 onion and 2 tomatoes", "4 cups water or low-sodium stock", "Smoked fish or cooked beans, to taste"],
    steps: ["Soften onion and tomatoes in a little oil.", "Mix ground egusi with water to form a smooth paste; stir into the pot.", "Simmer until thick, fold in greens and fish or beans, and cook until the greens are tender."],
    tags: ["leafy greens", "fish", "beans", "vegetarian", "more-veg", "plant-protein", "lower-sodium"]
  },
  {
    id: "suya",
    name: "Peppery grilled suya",
    image: "images/suya.jpg",
    width: 676,
    height: 507,
    alt: "Grilled Nigerian suya skewers",
    time: "GRILL FAVORITE · ABOUT 35 MIN",
    summary: "Thin slices of beef meet a fragrant peanut-and-spice coating; serve with fresh vegetables.",
    ingredients: ["450 g lean beef, thinly sliced", "3 tbsp ground roasted peanuts", "Paprika, ginger, garlic, and cayenne", "1 tbsp oil", "Sliced onion and tomato, to serve"],
    steps: ["Mix ground peanuts with spices and a little oil.", "Coat beef strips and thread onto skewers.", "Grill or broil, turning once, until cooked through. Serve with fresh onion and tomato."],
    tags: ["beef", "tomato", "more-veg"]
  },
  {
    id: "moi-moi",
    name: "Peppery moi moi",
    image: "images/moi-moi.jpg",
    width: 584,
    height: 928,
    alt: "Moi moi, a steamed Nigerian bean pudding",
    time: "BEAN-BASED · ABOUT 60 MIN",
    summary: "A savory steamed bean pudding made with black-eyed peas, pepper, and aromatics.",
    ingredients: ["2 cups peeled black-eyed peas", "1 red bell pepper", "1 onion and 1 small chili", "2 tbsp oil and 1½ cups water", "Optional: flaked fish"],
    steps: ["Soak and rinse beans, then blend with pepper, onion, and water until smooth.", "Stir in oil and optional fish; season to taste.", "Pour into heat-safe cups and steam until set, about 45 minutes."],
    tags: ["beans", "vegetarian", "plant-protein", "lower-sodium"]
  },
  {
    id: "efo-riro",
    name: "Everyday efo riro",
    image: "images/efo-riro.jpg",
    width: 960,
    height: 667,
    alt: "Efo riro with fried mackerel and roasted cow skin",
    time: "GREENS & TOMATO · ABOUT 40 MIN",
    summary: "A vibrant Yoruba-style spinach stew with tomatoes, peppers, and a protein of your choice.",
    ingredients: ["5 cups chopped spinach or other leafy greens", "3 tomatoes and 1 red bell pepper", "1 onion and 1 tbsp oil", "Smoked fish, beans, or mushrooms", "Optional: ground crayfish"],
    steps: ["Blend tomatoes and pepper; simmer with onion until the mixture reduces.", "Add your choice of fish, beans, or mushrooms and cook briefly.", "Fold in greens and simmer just until tender."],
    tags: ["leafy greens", "fish", "beans", "vegetarian", "more-veg", "plant-protein"]
  },
  {
    id: "yam-vegetables",
    name: "Yam with garden vegetables",
    image: "images/yam-porridge.jpg",
    width: 717,
    height: 717,
    alt: "Nigerian yam porridge with vegetable soup",
    time: "SIMPLE SUPPER · ABOUT 30 MIN",
    summary: "Tender yam with a quick pepper, tomato, and greens topping for an easy, flexible meal.",
    ingredients: ["2 cups peeled yam cubes", "2 tomatoes and 1 bell pepper", "1 onion and 2 cups leafy greens", "1 tbsp cooking oil", "Optional: cooked beans or fish"],
    steps: ["Boil yam until tender and drain.", "Cook onion, tomato, and pepper in a little oil until softened.", "Stir in greens and optional protein, cook until wilted, and spoon over the yam."],
    tags: ["yam", "leafy greens", "fish", "beans", "vegetarian", "more-veg", "plant-protein"]
  }
];

let storageWarning = "";

function readSavedList(key, statusElement) {
  try {
    const stored = JSON.parse(localStorage.getItem(key) ?? "[]");
    if (!Array.isArray(stored)) {
      throw new TypeError(`Saved data for ${key} is not a list.`);
    }
    storageWarning = "";
    return stored;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    storageWarning = `Saved data could not be read. New changes may not be available after you leave this page.`;
    if (statusElement) {
      statusElement.textContent = storageWarning;
    }
    return [];
  }
}

function saveList(key, values, statusElement) {
  try {
    localStorage.setItem(key, JSON.stringify(values));
    storageWarning = "";
    return true;
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
    storageWarning = `Your browser could not save this change. Check your storage settings and try again.`;
    if (statusElement) {
      statusElement.textContent = storageWarning;
    }
    return false;
  }
}

function renderRecipeCards() {
  const grid = document.querySelector("#recipe-grid");
  if (!grid) return;

  const ingredient = document.querySelector("#ingredient-filter").value;
  const goal = document.querySelector("#goal-filter").value;
  const favoritesOnly = document.querySelector("#favorites-only").checked;
  const saved = readSavedList("hnc-favorites", document.querySelector("#recipe-status"));
  const matchingRecipes = recipes.filter((recipe) =>
    (ingredient === "all" || recipe.tags.includes(ingredient)) &&
    (goal === "all" || recipe.tags.includes(goal)) &&
    (!favoritesOnly || saved.includes(recipe.id))
  );

  grid.replaceChildren();
  if (matchingRecipes.length === 0) {
    grid.innerHTML = `<p class="empty-state">No recipes match those filters yet. Try another ingredient or clear your filters.</p>`;
  } else {
    const template = document.querySelector("#recipe-card-template");
    matchingRecipes.forEach((recipe) => {
      const card = template.content.cloneNode(true);
      const image = card.querySelector("img");
      const titleLink = card.querySelector(".recipe-title");
      const imageLink = card.querySelector(".recipe-image");
      const details = card.querySelector(".recipe-details");
      const saveButton = card.querySelector(".save-button");
      image.src = recipe.image;
      image.width = recipe.width;
      image.height = recipe.height;
      image.alt = recipe.alt;
      imageLink.href = `#${recipe.id}`;
      titleLink.href = `#${recipe.id}`;
      titleLink.id = recipe.id;
      titleLink.textContent = recipe.name;
      card.querySelector(".card-kicker").textContent = recipe.time;
      card.querySelector(".recipe-summary").textContent = recipe.summary;
      details.innerHTML = `<h4>Ingredients</h4><ul>${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}</ul><h4>Method</h4><ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>`;
      saveButton.dataset.recipeId = recipe.id;
      saveButton.setAttribute("aria-pressed", String(saved.includes(recipe.id)));
      saveButton.textContent = saved.includes(recipe.id) ? `Saved to favorites` : `Save to favorites`;
      grid.append(card);
    });
  }
  const status = document.querySelector("#recipe-status");
  status.textContent = `${matchingRecipes.length} ${matchingRecipes.length === 1 ? `recipe` : `recipes`} found. Your favorites stay on this device.${storageWarning ? ` ${storageWarning}` : ``}`;
}

function toggleFavorite(recipeId) {
  const status = document.querySelector("#recipe-status");
  const saved = readSavedList("hnc-favorites", status);
  if (storageWarning) return;
  const nextSaved = saved.includes(recipeId)
    ? saved.filter((id) => id !== recipeId)
    : [...saved, recipeId];
  if (saveList("hnc-favorites", nextSaved, status)) {
    renderRecipeCards();
  }
}

function renderSuggestions() {
  const list = document.querySelector("#suggestions-list");
  if (!list) return;
  const suggestions = readSavedList("hnc-suggestions", document.querySelector("#suggestion-status"));
  list.replaceChildren();
  suggestions.forEach((suggestion) => {
    const item = document.createElement("li");
    item.textContent = `${suggestion.dish} — suggested by ${suggestion.name}`;
    list.append(item);
  });
}

const year = document.querySelector("#current-year");
if (year) year.textContent = `${new Date().getFullYear()}`;

const filters = document.querySelector("#recipe-filters");
if (filters) {
  filters.addEventListener("change", renderRecipeCards);
  document.querySelector("#clear-filters").addEventListener("click", () => {
    filters.reset();
    renderRecipeCards();
  });
  document.querySelector("#recipe-grid").addEventListener("click", (event) => {
    const button = event.target.closest(".save-button");
    if (button) toggleFavorite(button.dataset.recipeId);
  });
  renderRecipeCards();
}

const suggestionForm = document.querySelector("#suggestion-form");
if (suggestionForm) {
  const status = document.querySelector("#suggestion-status");
  renderSuggestions();
  suggestionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameField = suggestionForm.querySelector("#suggestion-name");
    const dishField = suggestionForm.querySelector("#suggestion-dish");
    nameField.setCustomValidity(nameField.value.trim() ? "" : `Please enter your name.`);
    dishField.setCustomValidity(dishField.value.trim() ? "" : `Please enter a dish or recipe idea.`);
    if (!suggestionForm.reportValidity()) return;
    const formData = new FormData(suggestionForm);
    const suggestions = readSavedList("hnc-suggestions", status);
    if (storageWarning) return;
    suggestions.push({
      name: formData.get("name").trim(),
      dish: formData.get("dish").trim(),
      note: formData.get("note").trim(),
      submittedAt: new Date().toISOString()
    });
    if (saveList("hnc-suggestions", suggestions, status)) {
      renderSuggestions();
      suggestionForm.reset();
      status.textContent = `Thank you. Your recipe idea has been saved on this device.`;
    }
  });
  suggestionForm.querySelectorAll("#suggestion-name, #suggestion-dish").forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
  });
}
