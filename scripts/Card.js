import {openPopup, closePopup} from "./script.js";

export class Card {
  constructor(element, cardTemplate, imagePopup, imagePopupCloseButton){
    this.element=element;
    this.cardTemplate=cardTemplate;
    this.imagePopup = imagePopup;
    this.imagePopupCloseButton = imagePopupCloseButton;
    imagePopupCloseButton.addEventListener('click', () => closePopup(imagePopup));
  }

  _handleDeleteCard = (evt) => {
    evt.target.parentElement.remove();
  };

  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__button_liked');
  };

  _handlePreviewPicture = (evt) => {
    const imagePopup = document.querySelector('.image-popup');
    const bigImage = imagePopup.querySelector('.image-popup__img');
    const caption = document.querySelector('.caption');
    openPopup(imagePopup);
    bigImage.src=evt.target.src;
    bigImage.alt = evt.target.alt;
    caption.textContent = this.element.name;
  };

  getCardElement() {
    const card = this.cardTemplate.content;
    const cardElement = card.cloneNode(true);
    const elementImg = cardElement.querySelector('.element__img');
    cardElement.querySelector('.element__text').textContent = this.element.name;
    elementImg.src = this.element.link;
    elementImg.alt = this.element.name;
    cardElement.querySelector('.element__button').addEventListener('click', this._handleLikeIcon); 
    cardElement.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard); 
    elementImg.addEventListener('click',this._handlePreviewPicture);
    return cardElement;
  } 
}