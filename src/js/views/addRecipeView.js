////////////////////////////
// IMPORTS
import View from './view.js';

//
class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _successMessage = 'Recipe was successfully uploaded!';
  _originalFormContent = this._parentElement.innerHTML;

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _openBtn = document.querySelector('.nav__btn--add-recipe');
  _closeBtn = document.querySelector('.btn--close-modal');

  // Why do we need a constructor ??
  //--- we want the handler function to be called as soon as the page loads
  //--- secondly, this has nothing to do with the controller.
  //--- when this click happens, all that will happen is for this window to show.
  //--- we can simply run this function using a constructor
  constructor() {
    super();
    this._addHandlerOpenWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerOpenWindow() {
    this._openBtn.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._closeBtn.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      // How to get access to the Form Data ??
      // FORM DATA (modern browser API)
      //--- we need to create a new FormData(form element)
      //--- inside the NewForm constructor, we pass in a Form element. In this case, it is the this keyword (pointing to _parentElement)
      //--- new FormData(this) will return a wierd object that we cannot use.

      // How do we Access that Object??
      //--- we spread it inside of an Array and that way, we get a beautiful Array with all fields and corresponding values inside
      const dataArr = [...new FormData(this)];

      // Converting Array to an Object
      //--- Usually, recipeData is an object, not an Array entry like this
      //--- Since ES2019, we can convert entries to an Object using Object.fromEntries(Array).
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }

  resetParentElement() {
    this._parentElement.innerHTML = this._originalFormContent;
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
