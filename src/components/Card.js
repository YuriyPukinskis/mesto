export class Card {
  constructor(element, cardTemplate, handleCardClick){
    this._element = element;
    this._cardTemplate=cardTemplate;
    this._handlePreviewPicture = handleCardClick;
  }

  _handleDeleteCard = (evt) => {
    evt.target.parentElement.remove();
  };

  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__button_liked');
  };

  getCardElement() {
    const _card = this._cardTemplate.content;
    const _cardElement = _card.cloneNode(true);
    const _elementImg = _cardElement.querySelector('.element__img');
    _cardElement.querySelector('.element__text').textContent = this._element.name;
    _elementImg.src = this._element.link;
    _elementImg.alt = this._element.name;
    _cardElement.querySelector('.element__button').addEventListener('click', this._handleLikeIcon); 
    _cardElement.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard); 
    _elementImg.addEventListener('click', () => this._handlePreviewPicture(this._element));
    return _cardElement;
  } 
}