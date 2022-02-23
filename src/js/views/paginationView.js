/////////////////////////////
// IMPORTS
import View from './view.js';
import icons from 'url:../../img/icons.svg';

// How will JS know that it has to show the result of the Page that is being cliked??
//--- Once again, we need to establish some connection between DOM and the code
// we will use DATA ATTRIBUTES to do that
//--- on each button, we will create a data attribute that will contain the page number on which we want to go to
//--- In our code, we can read that data and make JS go to that page
//--- the page is exactly the same that is says on the button text
//--- Afterwards, inside the publisher function, we can get that data from the btn attributes

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    //--- here, we will use event delegation as we have 2 buttons
    this._parentElement.addEventListener('click', function (e) {
      //--- finding the closest parent element to the click
      //--- closest is like querySelector, but it searches the parent instead
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  Page;

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1)
      return `
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // Last Page
    if (curPage === numPages && numPages > 1)
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${curPage - 1}</span>
      </button>
    `;

    // Some middle Page
    if (curPage < numPages && numPages > 1)
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
    `;

    // 2. Page 1 and no other pages
    return '';
  }
}

export default new PaginationView();
