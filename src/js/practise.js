// SETTING UP THIS PROJECT

// SASS
//--- SASS is a better way of writing CSS
//--- It has nice features; makes writing CSS in a large project easier
//--- Browsers dont understand Sass. Must be converted to Css
//--- PARCEL converts SASS to CSS

// Step 1 : Initialize a new Project in the terminal
//--- npm init
//--- this command creates our package.json file
//--- we pass in the details for this project

// STEP 2 : Set up NPM Scripts
//--- first script is 'start'. We want to start parcel at index.html which is the entry point (parcel index.html)
//--- second script is 'build'. This we will run at the end once we are ready building the application. (parcel build index.html)
//--- sometimes, we dont have an html file. Then, our entry points can be JS files.

// STEP 3 : Install Parcel as DevDependency
//--- npm i  parcel@2 -D

// STEP 4 : Start Parcel by running our script
//--- npm run start / npm start
//--- start script is a special one in NPM.
//--- we dont need to write run in order to run it

// NOTE : If we run into an error installing SASS, we can simply quit the proces (CTRL + C) and manually install SASS by writing (npm install / npm install sass). This will install SASS as a dev-dependency. Then we can run (npm start) again and this time it will work

//--- we can see in our (dist) depository, we have a new index.html, js file, images, and a css file as well

// How does Parcel know it has to compile the sass file??
//--- In our index.html file, we have referenced the SASS file (.scss)
//--- It is because of this that Parcel knows it needs to complie the sass file to css
//--- same it true for all the images
//--- it copies all the images in the dist folder and gave them a new name and replaced their source in html as well

// NOTE
//--- The DIST folder is not important to us in the development
//--- everything we develop will be in the SRC folder
//--- only what we then see in the browser comes from the distribution
//--- That is the whole point of having a module bundler. It takes our raw source code and compiles it into a nice PACKAGE (the folder that is ready to ship to the browser)

// STEP 5 : Add Polyfills for ES6 features
//--- major package : core-js and regenerator-runtime
//--- npm i core-js regenerator-runtime
//--- they get added to package.json file as dependencies
//--- Next, we need to import them in our file
//--- import 'core-js/stable' , import 'regenerator-runtime/runtime'

// STEP 6 : Building the Project
//--- before running the build command, we can delete the dist folder and parcel-cache folder to get a fresh start
//--- the build command that we have in scripts is not complete.
//--- In build command, we need to specify that we want our output in the dist folder and then pass a name for the folder (parcel v2)
//--- Secondly, we get "main" : "index.html". Instead of main, we write "default"
//--- Now, it time to run the build command
//--- npm run build
//--- Once it is done, we are ready to deploy the folder that was just created to the NETLIFY server

// STEP 7 : Deploying the Project on NETLIFY / SURGE

////////////////////////////////////////////////////////////////////////////////
/*
// FUNCTIONS

const renderSpinner = function (parentEl) {
  // creating dynamic html markup
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}.svg#icon-loader"></use>
      </svg>
    </div> 
  `;
  // clearing the html element before rendering the spinner
  parentEl.innerHTML = '';
  // rendering the spinner
  parentEl.insertAdjacentHTML('afterbegin', markup);

  // Why does the spinner work??
  //--- In CSS, the icon inside of the spinner class has the rotation animation that keeps going forever (because it has infinite attribute in the animation property)
  //--- rotation animation has been created using keyframes. What it does is to rotate the element to 360 degrees.
};

const showRecipe = async function () {
  try {
    // Getting ID from the hash
    //--- window.location is the entire URL. From there we can take the hash.
    //--- as we only need the id, we need to slice it to remove the hash symbol.
    const id = window.location.hash.slice(1);
    // gaurd clause
    if (!id) return;

    // rendering the spinner
    renderSpinner(recipeContainer);

    ///////////////////////////
    // LOADING A RECIPE FROM AN API

    // recieved response object
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886'
    );
    // response converted to readable data
    const data = await res.json();
    // new Error thrown
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    // storing the resulting recipe into a variable of same name
    let { recipe } = data.data;
    // creating new recipe object based on the above
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    ////////////////////////
    // RENDERING RECIPE

    // Why are the icons not visible?
    //--- the page that is displayed in the browser is in the dist folder
    //--- all images and assets are coming from the dist folder
    //--- the icons are also coming from a different file now (icons.21bad73c.svg)
    //--- but in our template literal, we are still writing the old path to the icons, that's why JS is not able to find this

    // How do we tell JS about the new icons file??
    //--- Parcel will help us. We can simply import the icon file.
    //--- With parcel, we can import more than just JS files. We can import all kinds of assets.
    //--- basically, we are importing the icons from the original icons file from the view of the original controller file
    //--- the icons file is nothing more, but simply the path to the new icons file.

    // Creating a dynamic html
    const markup = `
      <figure class="recipe__fig">
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">${
            recipe.cookingTime
          }</span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">${
            recipe.servings
          }</span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button class="btn--tiny btn--increase-servings">
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <div class="recipe__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>
        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${
            // Looping over the ingredients array
            //--- we use map method as it will return a new array that will contain the markup below in each element
            //--- now, all we need to do is transform this array of strings into one big string (using join method)
            recipe.ingredients
              .map(ing => {
                return `
                <li class="recipe__ingredient">
                  <svg class="recipe__icon">
                    <use href="${icons}#icon-check"></use>
                  </svg>
                  <div class="recipe__quantity">${ing.quantity}</div>
                  <div class="recipe__description">
                    <span class="recipe__unit">${ing.unit}</span>
                    ${ing.description}
                  </div>
                </li>
              `;
              })
              .join('')
          }
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">${
            recipe.publisher
          }</span>. Please check out
          directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
    // Clearing DOM element
    recipeContainer.innerHTML = '';
    // Inserting html into DOM
    recipeContainer.insertAdjacentHTML('afterbegin', markup);
  } catch (err) {
    alert(err);
  }
};
// showRecipe();

////////////////////////////////////////////////////////////////////////////////

// EVENT HANDLERS

// 'hashchange'
//--- If we see in the URL, there is the hash symbol. Everything that comes after that symbol is the HASH
//--- In our case, it is the id of the recipe and all of it is the hash
// How does it work??
//--- whenever the hash changes, a new recipe is going to be loaded
//--- this changing of the hash is actually an event that we can listen for
// How to trigger a change of the hash??
//--- we can do that by adding a fake link (anchor) in the search results
//--- we can pass an id of recipe in the href property
//--- whenever we will click on the anchor, the HASH in the URL will change to the href attribute (id in this case).

// Listening for this event
//--- we can listen for this event on 'WINDOW'
// window.addEventListener('hashchange', showRecipe);

//////////////////////////////////////////

// 'load'
//--- what if we want to take the entire URL, copy it to another tab and then open it?
//--- no recipe shows up as this time, there is no change in the hash. We simply loaded the page
//--- we need a load event as well
// window.addEventListener('load', showRecipe);

//////////////////////////////////////////

// How to listen to multiple event at the same time??
//--- create an array of events as the elements and then looping over each element
['hashchange', 'load'].forEach(ev => window.addEventListener(ev, showRecipe));
*/
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// REFACTORING CODE FOR MVC ARCHITECTURE

//--- we need multiple views. We will have 1 view for each feature. As we are working on displaying the recipe, it will be called recipeView
//--- we have 1 module for whole controller and model, but different module for each view. This is because each view will have many lines of code

//////////////// MODEL

//--- It will have a big state object, that will contain objects for recipes, searches and bookmarks
//--- There will also be a function for loading the recipes. That function will be called inside the controller.

// 1. We will create the state object which contains the recipe object and then export it in order to use it in the controller
//--- loadRecipe() will not return anything. It will simply change the state object
//--- this state object will contain the recipe and the controller will then grab the recipe from inside this object
//--- This will work as there is a LIVE connection b/w exports and imports

// 2. Create the load recipe function as well and export it
//--- This function is responsible for fetching recipe from the API, therefore an async function
//--- the id that we need to fetch the recipe. We have no idea of where to get it from. That's why we pass it into the function. So, when the controller will call loadRecipe, it will get the id and pass into this function

//////////////// CONTROLLER

// Defining Subscriber
//--- we are creating an init() and calling it immediately. We wanna do it in the beginning. Also, we dont wanna pollute the global scope, thats why init()
//--- inside, we call the addHandlerRender (the publisher) and pass in the control recipes (the subscriber)

// Defining Publisher
//--- addHandlerRender when called, will render all the event handlers(Publish all the event handlers)
//--- This method will get access to the subscriber, that is the function that needs to be handled
//--- Now, when an event will be listened (publisher publishes an event), the handler will be called as callback (subscriber will be called)

//////////////// VIEWS

///// RECIPEVIEW
// Why are we using classes to set up Views??
//--- Firstly, later on, we also need a Parent class for all the views (RecipeView, BookmarkView, SearchView, etc)
//--- we will need a Parent class to make sure all the views inherit some common methods. And so, using classes make it very simple to implement.
//--- Secondly, we want some views to have a couple of private methods and properties, and so, classes make it quite easy to implement again.

// parent element
//--- the first private property will be the parent Element. The parent element of recipeView is the Recipe container (element with class 'recipe')
//--- this will make it really easy to render the spinner, success/error message, and the recipe itself
//--- So, if each view will have a parent Element, it will become really easy to render stuff

// why dont we export the class itself??
//--- we have to export something from this view in order for controller to import it.
//--- we can export the class. Then, in the controller, we import the class and then create a new object there of the class.
//--- but, we might create multiple views which we dont want. And that would bring unnecessary work to the controller
//--- Instead, we create an object here, then use default export to export that object to controller. Using default, we make sure there are not multiple recipeView objects

// How to pass data in the new Object??
//--- Instead of passing data into the function, we will create a method called render. We will call this method to render all the views
//--- the render method will accept the data and also store it in the object
//--- this render method and these 2 private properties will be common to all the views

// A private method to generate markup
//--- instead of putting the dynamic html code in render method, we create a new method that will generate the markup for us
//--- this is because we need render method to be common to all the view
//--- this method is going to generate the markup and we straighaway return the markup

// A private method to clear the parent element
//--- this method will again be common to all the views as long as that view has a parent element property

// Rendering Spinner
//--- this method will also be a part of RecipeView object
//--- the controller will call this method as soon as the model start fetching data

// The ICONS variable
//--- we need to grab this also from the controller

// Fracty (Another API)
//--- right now, all our recipes are shown using (0.5, 1.5)
//--- fractions looks much better than using decimals, and to do that, we need to install one more package from npm
//--- npm install fracty
//--- after that we can import it.
//--- any libraries or packages that we import, we dont even have to specify their path. Just their name and what they export

///////////////////////////////////////////////

// SEARCH VIEW

//--- There will be different views for searching a query and a different one for displaying the search result
//--- This is done to keep all the views into proper focus and also because they are located in different areas in the UI
//--- This view will not render anything. It will only give us the content of the input field

//////////////////////////////////////////////

// PAGINATION VIEW
