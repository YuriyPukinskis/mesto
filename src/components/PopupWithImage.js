import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this.bigImage = this._popupSelector.querySelector('.image-popup__img');
    this.caption = this._popupSelector.querySelector('.caption');
  }

  open(src,alt) {
    super.open();
    
    this.bigImage.src= src
    this.bigImage.alt = alt
    this.caption.textContent = alt;
  }
}