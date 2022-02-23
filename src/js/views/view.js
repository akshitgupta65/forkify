///////////////////////////
// IMPORTS
import icons from 'url:../../img/icons.svg'; // importing icons file

// View Class (Parent Class)
//--- we are exporting the class itself as we are not going to create any instance of this View class.
export default class View {
  _data;

  // JS DOC - The standard way of writing Documentation in JS
  //--- website : jsdoc.app for more info
  //--- Advantage : Very convinient for multiple people to understand the project and it follows the standard format of documentation
  //--- VS Code takes this data. When we hover over the function, it gives us a nice overview of the function using this data
  //--- Format : /**  and  */
  //--- @param/returns/this,etc. Basically the target
  //--- {type of Object} followed by name in case of parameter
  //--- finally a description

  /**
   * Render the recieved Object to the DOM
   * @param {Object | Object[]} data The data to be rendered(ex - recipe)
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} Markup String is returned if render=false
   * @this {Object} View Instance
   * @author Akshit Gupta
   * @todo Finish Implementation
   */

  // Display Recipe
  render(data, render = true) {
    // Gaurd Clause (no data or data is Array and length is 0)
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // Storing data
    this._data = data;
    // Generating Markup
    const markup = this._generateMarkup();
    // Gaurd Clause (not render markup)
    if (!render) return markup;
    // Clearing Parent
    this._clear();
    // Inserting Html
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    // generating new Markup
    const newMarkup = this._generateMarkup();

    // Converting Markup String to a DOM Element
    //--- .createRange() returns an empty range object
    //--- .createContextualFrangment() converts string into real DOM Node Objects
    //--- newDOM is now a big object, which is like a virtual DOM (DOM that lives in our memory, not on the page)
    //--- newDOM is the DOM that would be rendered on the page, if we had used render().
    const newDOM = document.createRange().createContextualFragment(newMarkup);

    // Selecting new Elements
    //--- now, we can use this DOM as if it was the real DOM on our page
    //--- so now, we can use querySelectorAll to select all the elements on our virtual DOM
    //--- as querySelectorAll returns a nodeList, we can convert it to Array
    const newElements = Array.from(newDOM.querySelectorAll('*'));

    // Selecting current Elements
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    // Comparison
    //--- 1. Looping over the newElements Array
    newElements.forEach((newEl, i) => {
      // 2. Looping over the curElements Array as well
      const curEl = curElements[i];
      // 3. Comparing these elements (using very handy methods)
      //--- isEqualNode() compares content of 2 nodes and returns true/false
      //--- Observation : All elements whose values are different, we get false in return. But same also happens for all parent elements of those elements.
      // console.log(curEl, newEl.isEqualNode(curEl));
      // 4. Changing the text Content of curEl to the newEl
      //--- we want to change the textContent if 2 conditions are fulfilled.
      //--- nodes are not equal using isEqualNode()
      //--- secondly, we only need nodes that are text, not elements. We can filter that by checking for their node values.
      //--- for all elements, we can check is nodeValue property has some value and is not blank/null
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // 5. Changing the attributes
      //--- here, we will use the attributes property on an element
      //--- this will return an object of all the attributes that has changed
      //--- we can convert the object into an Array, loop over it, and copy all the elements from one to another
      //--- we are replacing all the attributes in curEl by the attributes in newEl
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
        <div class="spinner">
          <svg>
            <use href="${icons}.svg#icon-loader"></use>
          </svg>
        </div> 
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Error Message
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
          <div>
            <svg>
              <use href="${icons}.svg#icon-alert-triangle"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // Success Message
  renderMessage(message = this._successMessage) {
    const markup = `
        <div class="message">
          <div>
            <svg>
              <use href="${icons}#icon-smile"></use>
            </svg>
          </div>
          <p>${message}</p>
        </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
