export class Card {
  constructor(myId, element, cardTemplate, handleCardClick, popImage, deleteCard, addLike, removeLike){
    this._myId = myId;
    this._element = element;
    this._cardTemplate=cardTemplate;
    this._handlePreviewPicture = handleCardClick;
    this._popImage = popImage;
    this._deleteCard = deleteCard;
    this._addLike = addLike;
    this._removeLike = removeLike;
    
  }

  updateLikes(evt,data){
    evt.nextElementSibling.textContent = data.likes.length;
    // this._card.querySelector('.element__likeCount').textContent = data.likes.length;
    // this.getCardElement()
    // this._card.querySelector('.element__likeCount').textContent = data.likes.length;
  }

  _handleDeleteCard = (evt) => {
    this._deleteCard(evt.target.parentElement,this._element.cardId);
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

  checkLike(myId){
    let liked=false;
    for (let i = 0; i < element.likes.length; i++) {
      if (element.likes[i]._id === myId) {
        liked=true;
      }
    }
  }

  removeCard = (target) => {
    target.remove()
  }

  getCardElement() {
    const _card = this._cardTemplate.content;
    this._card = _card.cloneNode(true);
    const _elementImg = this._card.querySelector('.element__img');
    let liked=false;
    for (let i = 0; i < this._element.numberOfLikes; i++) {
      if (this._element.elementLikes[i]._id === this._myId) {
        liked=true;
      }
    }
    if(liked){
      this._card.querySelector('.element__button').classList.toggle('element__button_liked');
    }
    let mine=false;
    if (this._element.ownerID === this._myId) {
      mine=true;
    }
    if(mine){
      this._card.querySelector('.element__delete').classList.add('popup_visible');
    }
    this._card.querySelector('.element__text').textContent = this._element.name;
    _elementImg.src = this._element.link;
    _elementImg.alt = this._element.name;
    this._card.querySelector('.element__likeCount').textContent = this._element.numberOfLikes;
    this._card.querySelector('.element__button').addEventListener('click', this._handleLikeIcon); 
    this._card.querySelector('.element__delete').addEventListener('click', this._handleDeleteCard); 
    _elementImg.addEventListener('click', () => this._handlePreviewPicture(this._popImage,this._element.link,this._element.name));
    return this._card;
  } 
}