# Forkify App is a search engine for recipes

**How does it work?**

_Adding a recipe_

- We can also add our own recipe to the recipe database. This recipe can be only viewed by the person who has uploaded it. The uploaded recipe gets bookmarked automatically.
- This is done using "`fetch` API `post` request".
- The purpose is to save our personal recipe at a place for future reference.

_Bookmark Recipe_

- We can bookmark and unbookmark any recipe we want by simply clicking bookmark icon. When we bookmark a recipe, it gets stored in our local storage. Whenever we reload the page, bookmarked data will always be saved.

_Search and Display Recipe_

- It has a text input field that allows you to search for recipes. You can enter any food items (eg- pizza).
- Especially for this project, Jonas has created a [Forkify API](https://forkify-api.herokuapp.com/). This API is a database of thousands of recipes to search from.
- We fetch the result from the API and briefly display all the relevant recipes on the smaller half of the page.
- We can then click on any recipe and that will be displayed on the bigger half of the page. It contains details like name and image of recipe, servings, cooking time, ingredients with quantity and link to its source.

_Update Servings_

- It has the feature of updating no of servings. As we increae or decrease the number of servings, the quantity of ingredients also gets updated in the same proportion.

**Key Features**

- Bookmarking (saving our favourite recipes for future use)
- Loading spinner (while fetching recipe data)
- Pagination (no. of recipes per page)
- Search engine
- Updating quantity of ingredients on the basis of no of servings
- Uploading data (adding recipe)

**Things learnt**

- _Converting Markup String to a DOM element(**Creating Virtual DOM**)_ : used `.createContextualFragment(newMarkup)` to convert string into real DOM Node Object.
- _ES6 Classes_ : Created my child classes. Then, I took out all the common properties and methods from child classes and put them in 1 parent class. This made my code neat and efficient.
- _fetch API `post` request_ : Used it to upload recipe data to the forkify API.
- _JS Module_ : Every JS file in the project is `type="module"`. The purpose is to break the project into smaller files. This allows us to only import relavant data and make our code more understandable.
- _Project architecture_ : used the **MVC framework (Model-View-Controller)**. Model included a state object that stored data such as recipes, search results, bookmarks, etc. View contained all the code that can be viewed and interacted with on the browser. Lastly, controller acted as the control center for the application.
- _SASS_ : In this project, I got familiar with SASS.

**Imp Skills**

- AJAX calls
- APIs
- async / await
- DOM Manipulation
- import and export
- localStorage
- Promise
- refactoring Code
- throw new Error
- try and catch statement

> Note 1 : This project is a part of 'The Complete JavaScript Course 2022: From Zero To Expert!' on Udemy by 'Jonas Schmedtmann'. All rights reserved by [Jonas Schmedtmann](https://github.com/jonasschmedtmann).
>
> Note 2 : Lists are written in alphabetical order.
