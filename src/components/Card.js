export class Card {
  constructor(element, cardTemplate, handleCardClick,popImage,deleteCard,addLike,removeLike){
    this._element = element;
    this._cardTemplate=cardTemplate;
    this._handlePreviewPicture = handleCardClick;
    this._popImage = popImage;
    this._deleteCard = deleteCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
  }

  _handleDeleteCard = (evt) => {
    this._deleteCard(evt,this._element.cardId);
  };

  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__button_liked');
    this._checkCardLike(evt);
  };

  _checkCardLike =(evt) => {
    if(evt.target.classList.contains('element__button_liked')){ 
      this._addLike(evt,this._element.cardId);
    }else {
      this._removeLike(evt,this._element.cardId);
    }
  }

  getCardElement() {
    const _card = this._cardTemplate.content;
    const _cardElement = _card.cloneNode(true);
    const _elementImg = _cardElement.querySelector('.element__img');
    if(this._element.liked){
      _cardElement.querySelector('.element__button').classList.toggle('element__button_liked');
    }
    if(this._element.mine){
      _cardElement.querySelector('.element__delete').classList.add('popup_visible');
    }
    _cardElement.querySelector('.element__text').textContent = this._element.name;
    _elementImg.src = this._element.link;
    _elementImg.alt = this._element.name;
    _cardElement.querySelector('.element__likeCount').textContent = this._element.numberOfLikes;
    _cardElement.querySelector('.element__button').addEventListener('click', this._handleLikeIcon); 
    _cardElement.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard); 
    _elementImg.addEventListener('click', () => this._handlePreviewPicture(this._popImage,this._element.link,this._element.name));
    return _cardElement;
  } 
}