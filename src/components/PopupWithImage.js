import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  constructor(popupSelector){
    super(popupSelector);
    this.bigImage = this.popupSelector.querySelector('.image-popup__img');
    this.caption = this.popupSelector.querySelector('.caption');
  }

  open(src,alt) {
    super.open();
    
    this.bigImage.src= src
    this.bigImage.alt = alt
    this.caption.textContent = alt;
  }
}