export default class Section{
  constructor({items, renderer}, containerSelector){
    this._items=items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    
  }

  addItem(element){
    this._container.append(element);
    const del_button = document.querySelector('.element__delete');
    // del_button.classList.remove('popup_visible');
  }

  addItemToStart(element){
    this._container.prepend(element);
    const del_button = document.querySelector('.element__delete');
    // del_button.classList.add('popup_visible');
  }

  clear() {
    this._container.innerHTML = '';
  }

  drawElem(){
    // this.clear();
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}