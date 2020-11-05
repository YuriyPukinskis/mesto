export class Card {
  constructor(element, cardTemplate){
    this.element=element;
    this.cardTemplate=cardTemplate;
    const imagePopup = document.querySelector('.image-popup');
    const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close');
    imagePopupCloseButton.addEventListener('click', () => this._closePopup(imagePopup));
  }

  _handleEscDown = (evt) => {
    const activePopup = document.querySelector('.popup_visible');
    const escCode = 27;
    if (evt.keyCode === escCode) {
      this._closePopup(activePopup);
    };
  }

  _openPopup(popup) {
    popup.classList.add('popup_visible'); 
    document.addEventListener('keydown',this._handleEscDown);
  }
  
  _closePopup(popup) {
    popup.classList.remove('popup_visible');
    document.removeEventListener('keydown',this._handleEscDown);
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
    this._openPopup(imagePopup);
    bigImage.src=evt.target.src;
    bigImage.alt = evt.target.alt;
    caption.textContent = evt.target.parentElement.lastElementChild.firstElementChild.textContent;
  };

  getCardElement(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const elementImg = cardElement.querySelector('.element__img');
    cardElement.querySelector('.element__text').textContent = element.name;
    elementImg.src = element.link;
    elementImg.alt = element.name;
    cardElement.querySelector('.element__button').addEventListener('click', this._handleLikeIcon); 
    cardElement.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard); 
    elementImg.onclick=this._handlePreviewPicture; 
    return cardElement;
  } 
}