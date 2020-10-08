let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let submitButton = popupContainer.querySelector('.popup__button');
let nameInput = popupContainer.querySelector('.popup__input_name');
let jobInput = popupContainer.querySelector('.popup__input_occupation');
let closeButton = popupContainer.querySelector('.popup__close');

let placePopup = document.querySelector('.place-popup');
let placePopupContainer = document.querySelector('.place-popup__container');
let placeSubmitButton = placePopupContainer.querySelector('.place-popup__button');


let placeCloseButton = placePopupContainer.querySelector('.place-popup__close');

let profile = document.querySelector('.profile');
let info = profile.querySelector('.profile__info');
let pageProfileName = info.querySelector('.profile__name');
let pageProfileJob = info.querySelector('.profile__occupation');
let infoButton = info.querySelector('.profile__button');
let addPlaceButton = profile.querySelector('.profile__add-button');
let modPlaceButton = document.querySelector('.place-popup__button');
let cardsContainer = document.querySelector('.elements');

let imagePopup = document.querySelector('.image-popup');
let bigImage = imagePopup.querySelector('.image-popup__img');
let imagePopupCloseButton = imagePopup.querySelector('.image-popup__close');

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
]; 

function openProfile(){
  popup.classList.add('popup_visible');
  
  nameInput.value=pageProfileName.textContent;
  jobInput.value=pageProfileJob.textContent;
}

function formClose(){
  popup.classList.remove('popup_visible');
}

function openPlaces(){
  placePopup.classList.add('place-popup_visible');
}

function closePlaces(){
  placePopup.classList.remove('place-popup_visible');
}


function formSubmitHandler (evt) {
  evt.preventDefault();
  pageProfileName.textContent=nameInput.value;
  pageProfileJob.textContent=jobInput.value;
  formClose();
}

function closeImage(){
  imagePopup.classList.remove('image-popup_visible');
}

function initPlaces(){
  const cardTemplate = document.querySelector('#card-template').content;
  initialCards.forEach(element => {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.element__text').textContent = element.name;
    cardElement.querySelector('.element__img').src = element.link;
    cardElement.querySelector('.element__button').addEventListener('click', function (evt) {
      evt.target.classList.toggle('element__button_liked');
    }); 
    cardElement.querySelector('.element__delete').addEventListener('click', function (evt) {
      evt.target.parentElement.remove();
    }); 
    cardElement.querySelector('.element__img').onclick= function (evt) {
      imagePopup.classList.add('image-popup_visible');
      bigImage.src=evt.target.src;
    }
    cardsContainer.append(cardElement);
  });
  
}

function addPlace(evt){
  evt.preventDefault();
  closePlaces();
  const places = document.querySelectorAll('.element');
  
  places.forEach((item) => {
    item.remove();
  });

  let name = placePopup.querySelector('.place-popup__input_name').value;
  let link = placePopup.querySelector('.place-popup__input_image').value;
  initialCards.unshift({name: name,link: link});
  initPlaces();
}

popupContainer.addEventListener('submit', formSubmitHandler);
infoButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', formClose);

addPlaceButton.addEventListener('click', openPlaces);
placeCloseButton.addEventListener('click',closePlaces);
placePopupContainer.addEventListener('submit', addPlace);
imagePopupCloseButton.addEventListener('click',closeImage);
initPlaces();