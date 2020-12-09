export default class Section{
  constructor({items, renderer}, containerSelector,cardAdder){
    this._items=items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
    this._cardAdder = cardAdder;
  }

  addItem(element){
    this._container.append(element);
  }

  addItemToStart(element){
    // this._container.prepend(element);
     this.clear();
    // this._cardAdder()
  }

  clear() {
    this._container.innerHTML = '';
  }

  drawElem(){
    this._items.forEach(item => {
      this._renderer(item);
    });
  }
}