import Popup from './Popup.js';

export default class PopupWithImage extends Popup{
  open() {
    super.open();
    const bigImage = document.querySelector('.image-popup__img');
    const caption = document.querySelector('.caption');
    bigImage.src= event.target.src
    bigImage.alt = event.target.alt
    caption.textContent = event.target.alt;
  }
}