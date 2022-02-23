///////////////////////

// SearchView Class (Child class)
class SearchView {
  _parentElement = document.querySelector('.search');

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    //--- by adding listener to parent element, it will work no matter if user clicks submit button or hits enter
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault(); // important
      handler();
    });
  }
}

export default new SearchView();
