export class Card {
  constructor(element, cardTemplate, handleCardClick,popImage,deleteCard,likeCard){
    this._element = element;
    this._cardTemplate=cardTemplate;
    this._handlePreviewPicture = handleCardClick;
    this._popImage = popImage;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
  }

  _handleDeleteCard = (evt) => {
    // const delPopup = new Popup(document.querySelector('.delete-popup'));
    // delPopup.open();
    // delPopup.setEventListeners();
    // const api = new Api({
    //   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    //   headers: {
    //     authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
    //     'Content-Type': 'application/json'
    //   }
    // }); 
    // document.querySelector('.place-delete').addEventListener('click',()=>{
    //   api.deleteCardFromServer(this._element.cardId);
    //   evt.target.parentElement.remove();
    //   delPopup.close();
    // }); 
    this._deleteCard(evt,this._element.cardId);
  };

  _handleLikeIcon = (evt) => {
    evt.target.classList.toggle('element__button_liked');
    // const api = new Api({
    //   baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    //   headers: {
    //     authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
    //     'Content-Type': 'application/json'
    //   }
    // }); 
    // if(evt.target.classList.contains('element__button_liked')){
    //   api.likeCardOnServer(this._element.cardId)
    //   evt.target.nextElementSibling.textContent=Number(evt.target.nextElementSibling.textContent)+1;
    // }else{
    //   api.dislikeCardOnServer(this._element.cardId)
    //   evt.target.nextElementSibling.textContent=Number(evt.target.nextElementSibling.textContent)-1;
    // }
    this._likeCard(evt,this._element.cardId);
  };

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