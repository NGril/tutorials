import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { clearLoader, elements, renderLoader } from "./views/base";

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// SEARCH CONTROLLER
const controlSearch = async () => {
  // 1. get query from view
  const query = searchView.getInput();

  if (query) {
    // 2. new search object and add it to state
    state.search = new Search(query);

    // 3. prepare UI for results
    searchView.clearInput();
    searchView.clearResults();
    renderLoader(elements.searchRes);

    try {
      // 4. search for recipes
      await state.search.getResults();

      // 5. render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      clearLoader();
      alert(error);
    }
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
  const btn = e.target.closest('.btn-inline');
  if (btn) {
    const gotoPage = parseInt(btn.dataset.goto, 10); // lolz, we have data-goto property in html
    searchView.clearResults();
    searchView.renderResults(state.search.result, gotoPage);
  }
});


// RECIPE CONTROLLER
const controlRecipe = async () => {
  // read id from url
  const id = window.location.hash.replace('#', ''); // window.location reads the entire url, .hash reads the hash part

  if (id) {
    // prepare UI for changes
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // highlight selected
    if (state.search) {
      searchView.highlightSelected(id);
    }

    // create new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe data and parse ingredients
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calc time and servings
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render the recipe
      clearLoader();
      recipeView.renderRecipe(
        state.recipe,
        state.likes.isLiked(id)
      );

    } catch (error) {
      alert(error);
    }

  }
};

// Handling the selected recipe
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe)); // whenever the url hash part changes, whenever the page is reloaded




// SEARCH CONTROLLER
const controlList = () => {
  //create a new list if there is none yet
  if (!state.list) {
    state.list = new List();
  }

  // Add each ingredient to list and UI
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
  const id = e.target.closest('.shopping__item').dataset.itemid;

  // Handle the delete button
  if (e.target.matches('.shopping__delete, .shopping__delete *')) {
    // delete from state
    state.list.deleteItem(id);

    // delete from ui
    listView.deleteItem(id);

    //handle count
  } else if (e.target.matches('.shopping__count-value')) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});



// LIKE CONTROLLER
const controlLike = () => {
  if (!state.likes) {
    state.likes = new Likes();
  }
  const currentID = state.recipe.id;

  //User has NOT yet liked the recipe
  if (!state.likes.isLiked(currentID)) {
    // Add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );

    // Toggle the like button
    likesView.toggleLikeBtn(true);

    // Add like to the UI list
    likesView.renderLike(newLike);

    // User has liked the current recipe
  } else {
    // Remove like from state
    state.likes.deleteLike(currentID);

    // Toggle the like button
    likesView.toggleLikeBtn(false);

    // Remove like from the UI list
    likesView.deleteLike(currentID);
  }
  likesView.toggleLikeMenu(state.likes.getNumLikes());
}

// Restore liked recipes on page load
window.addEventListener('load', () => {
  state.likes = new Likes();
  
  // Restore likes
  state.likes.readStorage();

  // Toggle like menu button
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // Render the existing likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
});


// Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    // Decrease button is clicked
    if (state.recipe.servings > 1) {
      state.recipe.updateServings('dec');
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches('.btn-increase, .btn-increase *')) {
    // Increase button is clicked
    state.recipe.updateServings('inc');
    recipeView.updateServingsIngredients(state.recipe);
  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
    // Like controller
    controlLike();
  }
});