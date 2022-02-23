// IMPORTS
import { async } from 'regenerator-runtime';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

// STATE OBJECT
export const state = {
  // Storing Recipe
  recipe: {},
  // Storing Search
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
  // Storing Bookmarks
  bookmarks: [],
};

//////////////////////////////////////////////////

// Creating Recipe Object (converting raw API data)
//--- How do we add the key??
//--- we can use short-circuiting.
//--- If recipe.key exists, then the object after the && operator will be returned
//--- we then spread this object and it will become a key:value pair
//--- if recipe.key doesnot exist, then it simply shortcircuits as if nothing has happened
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

// LOADING RECIPE
export const loadRecipe = async function (id) {
  try {
    // Fetching recipe
    const data = await AJAX(`${API_URL}${id}?key=${KEY}`);

    // Storing recipe
    state.recipe = createRecipeObject(data);

    // Checking if a recipe with the same ID exists in the bookmarks array
    if (state.bookmarks.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

//////////////////////////////////////////////////

// SEARCHING RECIPE
export const loadSearchResults = async function (query) {
  try {
    // Storing search query
    state.search.query = query;

    // Fetching search results
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    // Storing search results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        publisher: rec.publisher,
        image: rec.image_url,
        title: rec.title,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
  } catch (err) {
    throw err;
  }
};

//////////////////////////////////////////////////

// PAGINATION
export const getSearchResultsPage = function (page = state.search.page) {
  // Storing current page number
  state.search.page = page;

  // Slicing the results array
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

//////////////////////////////////////////////////

// UPDATE SERVINGS
export const updateServings = function (newServings) {
  // Step 1 : For each ingredient, update the quantity as per the new servings
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity / state.recipe.servings) * newServings;
  });
  // Step 2 : we update the servings
  state.recipe.servings = newServings;
};

//////////////////////////////////////////////////

// STORE BOOKMARKS IN LOCAL STORAGE
const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

// ADD BOOKMARKS
export const addBookmark = function (recipe) {
  // Add Bookmark to State
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmarked
  //--- setting new property on the recipe object
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  // Local Storage
  persistBookmarks();
};

// DELETE BOOKMARKS
//--- this one simply recieves an ID. Its a pattern that when we add something we add the entire data. when we delete something we only get the id
export const deleteBookmark = function (id) {
  // Finding the index of the recipe
  const index = state.bookmarks.findIndex(el => el.id === id);
  // Deleting the recipe
  state.bookmarks.splice(index, 1);
  // Mark current recipe as NOT bookmarked
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  // Local Storage
  persistBookmarks();
};

// INITIALIZING BOOKMARKS ON LOAD
const init = function () {
  // Getting data from Local Storage
  const storage = localStorage.getItem('bookmarks');
  // Converting string to Object and storing in our App
  if (storage) state.bookmarks = JSON.parse(storage);
};

// DEBUGGING FUNCTION TO CLEAR BOOKMARK STORAGE
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();
init();

//////////////////////////////////////////////////

// UPLOADING RECIPE
// Task 1 : Take raw input data and convert it to the same format as we get out of the API
// Task 2 : Create ready-to-upload Object and upload
// Task 3 : Storing recipe in State, Bookmarks and Local storage

export const uploadRecipe = async function (newRecipe) {
  try {
    // Task 1
    // 1. Taking out ingredients and making an Array
    //--- Object.entries() converts object into an Array
    //--- we use filter() to filter out the ingredients we wanna work with
    const ingredientArr = Object.entries(newRecipe).filter(
      ent => ent[0].startsWith('ingredient') && ent[1] !== ''
    );

    // 2. Take the data out of the string and put them in an Object
    //--- we use map() to return a new Array
    const ingredients = ingredientArr.map(ing => {
      //--- .split() will return an Array of 3 elements
      //--- we use map() again to loop over the array and trim each element separately for white spaces
      const ingArr = ing[1].split(',').map(el => el.trim());
      // 3. Throw Error (if length is less than 3)
      //--- when we split the string, we want 3 parts
      if (ingArr.length !== 3)
        throw new Error(
          'Wrong ingredient format! Please use the correct format'
        );
      // 4. we destructure this Array and then return an Object
      const [quantity, unit, description] = ingArr;
      return { quantity: quantity ? +quantity : null, unit, description };
    });

    // Task 2
    // Creating the recipe Object (opp. of what we created while loading)
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      cooking_time: +newRecipe.cookingTime,
      publisher: newRecipe.publisher,
      servings: +newRecipe.servings,
      ingredients,
    };
    // Creating AJAX request using sendJSON()
    //--- this will send the recipe back to us
    const data = await AJAX(`${API_URL}?key=${KEY}`, recipe);

    // Task 3
    // Storing data in the State
    state.recipe = createRecipeObject(data);
    // Adding Bookmark and persisting it
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
