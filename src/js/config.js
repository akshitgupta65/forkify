// CONFIGURATION MODULE

// What do we put in this file??
//--- Here, we put all the variables that should be constants and should be reused across the project
//--- we will not put all the variables
//--- only those that are responsible for defining important data about the application itself

// What is the goal??
//--- It will allow us to easily configure our project by simply changing the data that is here in the configuration file

// Why is it imp??
//--- Our API url will be used at multiple places accross this project
//--- Now, suppose we want to change the url as there has been an update of version, we dont wanna change it everywhere and simply have it stored in a variable
//--- we can also say that we can store this API as a variable in the model.js itself. But then, we will have all these configuration variables spread accross all the modules
//--- way easier to have these variables at one central place

// API URL
//--- we used uppercase here as this is a constant. It will never change
//--- using uppercase for these kind of variables is a common practice
export const API_URL = `https://forkify-api.herokuapp.com/api/v2/recipes/`;

// Request Timout Timer
//--- this is something that when seen inside the code, it will seem to appear out of nowhere
//--- this makes it perfect as a configuration value
//--- we might want to change it as well. So, now all we gotta do is come to the config file and change it
export const TIMOUT_SEC = 10;

// Closing the AddRecipe Form
export const MODAL_CLOSE_SEC = 2.5;

// Search result Per Page (Pagination)
export const RES_PER_PAGE = 10;

// Forkify API key
export const KEY = 'b2b11968-7fb6-421f-930e-4ab934f2335e';
