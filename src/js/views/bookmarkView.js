///////////////////////////////////
// IMPORTS
import View from './view.js';
import previewView from './previewView.js';

//////////////////////////////////
// BOOKMARK CLASS
class BookmarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  addHandlerRenderBookmark(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    const bookmarks = this._data;
    return bookmarks
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarkView();
