import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const profilePopup = document.querySelector('.popup');
const popupContainer = document.querySelector('.profile-container');
const nameInput = popupContainer.querySelector('.profile-popup__input_name');
const jobInput = popupContainer.querySelector('.profile-popup__input_occupation');
const closeButton = popupContainer.querySelector('.profile__close');

const popup = document.querySelector('.popup');
const container = popup.querySelector('.popup__container');
const placePopup = document.querySelector('.place-popup');
const placePopupContainer = document.querySelector('.place-container');
const placeCloseButton = placePopupContainer.querySelector('.popup__close');

const profile = document.querySelector('.profile');
const info = profile.querySelector('.profile__info');
const pageProfileName = info.querySelector('.profile__name');
const pageProfileJob = info.querySelector('.profile__occupation');
const infoButton = info.querySelector('.profile__button');
const addPlaceButton = profile.querySelector('.profile__add-button');
const cardsContainer = document.querySelector('.elements');
const caption = document.querySelector('.caption');
const imagePopup = document.querySelector('.image-popup');
const bigImage = imagePopup.querySelector('.image-popup__img');
const imagePopupCloseButton = imagePopup.querySelector('.image-popup__close');

const cardTemplate = document.querySelector('#card-template');
const escCode = 27;
const popupList = Array.from(document.querySelectorAll('.popup'));


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
  openPopup(profilePopup);
    
  nameInput.value=pageProfileName.textContent;
  jobInput.value=pageProfileJob.textContent;
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  pageProfileName.textContent=nameInput.value;
  pageProfileJob.textContent=jobInput.value;
  closePopup(profilePopup);
}

const handleEscDown = (evt) => {
  const activePopup = document.querySelector('.popup_visible');
  if (evt.keyCode === escCode) {
    closePopup(activePopup);
  };
}

function openPopup(popup) {
  const valid = new FormValidator(
    {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    }, popup.firstElementChild
  );
  
  valid.enableValidation();

  popup.classList.add('popup_visible'); 
  document.addEventListener('keydown',handleEscDown);
   
}

function closePopup(popup) {
  popup.classList.remove('popup_visible');
  document.removeEventListener('keydown',handleEscDown);
} 

function initPlaces(){
  initialCards.forEach(element => {
    const card= new Card(element, cardTemplate, imagePopup, imagePopupCloseButton);
    cardsContainer.append(card.getCardElement());
  });
}

function addPlace(evt) {
  evt.preventDefault();
  const placesName = placePopup.querySelector('.place-popup__input_name');
  const placesLink = placePopup.querySelector('.place-popup__input_image');
  const name = placesName.value;
  const link = placesLink.value;
  placesName.form.reset();

  const card= new Card({name,link},cardTemplate,imagePopup, imagePopupCloseButton);
  const newCardElement = card.getCardElement();
  cardsContainer.prepend(newCardElement);
  closePopup(placePopup);
} 

popupContainer.addEventListener('submit', formSubmitHandler);
infoButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', () => closePopup(profilePopup));

addPlaceButton.addEventListener('click', () => openPopup(placePopup));
placeCloseButton.addEventListener('click', () => closePopup(placePopup));
placePopupContainer.addEventListener('submit', addPlace);

const listenPopups = () => {
  popupList.forEach((formEl) => {
    formEl.addEventListener('click',function(evt){
      if(evt.target.classList.contains('popup')){
        closePopup(formEl);
      }
    });
  });
};

listenPopups();
initPlaces();

export {openPopup, closePopup};