# Forkify App is a search engine for recipes

> **IMP** : This project is a part of 'The Complete JavaScript Course 2022: From Zero To Expert!' on Udemy by 'Jonas Schmedtmann'. All rights reserved by [Jonas Schmedtmann](https://github.com/jonasschmedtmann).

**How does it work?**  
  
*Search and Display Recipe*
- It has a text input field that allows you to search for recipes. You can enter any food items (eg- pizza).
- Especially for this project, Jonas has created a [Forkify API](https://forkify-api.herokuapp.com/). This API is a database of thousands of recipes to search from.
- We fetch the result from the API and briefly display all the relevant recipes on the smaller half of the page. 
- We can then click on any recipe and that will be displayed on the bigger half of the page. It contains details like name and image of recipe, servings, cooking time, ingredients with quantity and link to its source.

*Update Servings*
- It has the feature of updating no of servings. As we increae or decrease the number of servings, the quantity of ingredients also gets updated in the same proportion.

*Bookmark Recipe*
- We can bookmark and unbookmark any recipe we want by simply clicking bookmark icon. When we bookmark a recipe, it gets stored in our local storage. Whenever we reload the page, bookmarked data will always be saved.

*Adding a recipe*
- We can also add our own recipe to the recipe database. This recipe can be only viewed by the person who has uploaded it. The uploaded recipe gets bookmarked automatically.
- This is done using "`fetch` API `post` request".
- The purpose is to save our personal recipe at a place for future reference.

**Key Features**
- Pagination (no. of recipes per page)
- Loading spinner (while fetching recipe data)
- Search engine
- Bookmarking (saving our favourite recipes for future use)
- Uploading data (adding recipe)
- Updating quantity of ingredients on the basis of no of servings

**Things learnt**
1. *Project architecture* - used the **MVC framework (Model-View-Controller)**. Model included a state object that stored data such as recipes, search results, bookmarks, etc. View contained all the code that can be viewed and interacted with on the browser. Lastly, controller acted as the control center for the application.
2. *JS Module* - Every JS file in the project is `type="module"`. The purpose is to break the project into smaller files. This allows us to only import relavant data and make our code more understandable. 
3. *fetch API `post` request* - Used it to upload recipe data to the forkify API
4. *ES6 Classes* - Created my child classes. Then, I took out all the common properties and methods from child classes and put them in 1 parent class. This made my code neat and efficient.
5. *SASS* - In this project, I got familiar with SASS. 
6. *Converting Markup String to a DOM element(**Creating Virtual DOM**)* - used `.createContextualFragment(newMarkup)` to convert string into real DOM Node Object.

**Imp Skills**
- async / await
- AJAX calls
- APIs
- DOM Manipulation
- localStorage
- import and export
- Promise
- refactoring Code
- throw new Error
- try and catch statement
