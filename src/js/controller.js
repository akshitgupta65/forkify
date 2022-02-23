//////////////////////////
// IMPORTS
import * as model from './model.js'; // importing everything as model object
import recipeView from './views/recipeView.js'; // importing new recipeView
import searchView from './views/searchView.js';
import resultsView from './views/resultView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView.js';
import addRecipeView from './views/addRecipeView.js';
import { MODAL_CLOSE_SEC } from './config.js';

import 'core-js/stable'; // polyfilling everything else
import 'regenerator-runtime'; // polyfilling async/await

// Module Reload
if (module.hot) {
  module.hot.accept();
}

// Variables
// const { default: anymatch } = require('anymatch');
const recipeContainer = document.querySelector('.recipe');

///////////////////////////////////////////////////////////
// RECIPES CONTROL-CENTER
const controlRecipes = async function () {
  try {
    // ID
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Spinner
    recipeView.renderSpinner(recipeContainer);

    // Update resultsView to mark selected search result
    resultsView.update(model.getSearchResultsPage());

    // Update Bookmarks view
    bookmarkView.update(model.state.bookmarks);

    // Loading recipe (async function)
    await model.loadRecipe(id);

    // Rendering Recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // Rendering Error
    recipeView.renderError();
    console.error(err);
  }
};

/////////////////////////////////////////////////////////
// SEARCH CONTROL-CENTER
const controlSearchResults = async function () {
  try {
    // Getting query
    const query = searchView.getQuery();
    // Gaurd clause(if no query)
    if (!query || query === '') return;

    // render spinner
    resultsView.renderSpinner();

    // Loading search result (async function)
    await model.loadSearchResults(query);

    // Render search Result
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());

    // Render Initial Pagination
    //--- for pagination, we need details from the state object. That's why we pass it as an argument in the render method
    paginationView.render(model.state.search);
  } catch (err) {
    resultsView.renderError();
  }
};

/////////////////////////////////////////////////////////////
// PAGINATION CONTROL-CENTER
//--- both the render methods will work. Even though there is already some content there on that element, this render method will override the previous render.
//--- This is because the render method used clear method and clears the element before adding new markup to the element
const controlPagination = function (page) {
  // Render search Result
  resultsView.render(model.getSearchResultsPage(page));

  // Render new Pagination
  paginationView.render(model.state.search);
};

//////////////////////////////////
// SERVINGS CONTROL-CENTER

// Porblem with re-rendering entire recipeView?
//--- puts too much stress and extra work on the browser
// Solution?
//--- an update method that will only update texts and attributes in the DOM
//--- just like render method, update method will also be a part of View class(parent) as we will want this method on all the child Views
// Update()
//--- just like render(), we want to generate new markup as if we want to render a new View, but we are only going to update the markup
// GOAL??
//--- take both new and current markups and compare both html and then only change texts and attributes that has actually changed
// Converting new markup string into a DOM object
//--- it is very tedious to compare strings and DOM elements. So we convert string into a virtual DOM element

const controlServings = function (newServings) {
  // Update recipe servings and ingredients (in state)
  model.updateServings(newServings);

  // Update the recipeView (re-rendering the recipe)
  recipeView.update(model.state.recipe);
};

///////////////////////////////////////////////
// BOOKMARK CONTROL-CENTER
const controlAddBookmark = function () {
  // Adding bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // Deleting bookmark
  else model.deleteBookmark(model.state.recipe.id);

  // Updating Recipe View
  recipeView.update(model.state.recipe);

  // Rendering Bookmark
  bookmarkView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarkView.render(model.state.bookmarks);
};

//////////////////////////////////////////
// ADD RECIPE CONTROL-CENTER

const closeAndResetForm = function () {
  // Close form
  setTimeout(function () {
    addRecipeView.toggleWindow();
  }, MODAL_CLOSE_SEC * 1000);

  // Resetting the Form
  setTimeout(function () {
    addRecipeView.resetParentElement();
  }, (MODAL_CLOSE_SEC + 0.5) * 1000);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success Message
    addRecipeView.renderMessage();

    // Render Bookmark View
    bookmarkView.render(model.state.bookmarks);

    // Change ID in the URL
    //--- we can do this using the HISTORY API that is on the browsers
    //--- window.history is the HISTORY API. On this history object, we can call the pushState(), which allowsto change URL without page reloading
    //--- pushState(1,2,3) takes 2 arguement. 1st one is called State. it doesnot matter. we can pass null.
    //--- 2nd one is the Title (also not relavant). 3rd one is important. It is the URL, we can simply put # and then the id
    //--- we can do other stuff with Hstory API like going back or forward
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    closeAndResetForm();
  } catch (err) {
    console.error('😀', err);
    // Error Message
    addRecipeView.renderError(err.message);

    // Close form window
    closeAndResetForm();
  }
};

/////////////////////////////////////////////////////
// PUBLISHER-SUBSCRIBER PATTERN
const init = function () {
  bookmarkView.addHandlerRenderBookmark(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
