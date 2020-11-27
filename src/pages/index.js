import {Card} from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from'../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import{initialCards,cardPlace} from '../constants/constants.js';
import './index.css';


const profilePopup = document.querySelector('.popup');
const popupContainer = document.querySelector('.profile-container');
const nameInput = popupContainer.querySelector('.profile-popup__input_name');
const jobInput = popupContainer.querySelector('.profile-popup__input_occupation');

const placePopup = document.querySelector('.place-popup');
const placePopupContainer = document.querySelector('.place-container');

const profile = document.querySelector('.profile');
const info = profile.querySelector('.profile__info');
const pageProfileName = info.querySelector('.profile__name');
const pageProfileJob = info.querySelector('.profile__occupation');
const infoButton = info.querySelector('.profile__button');
const addPlaceButton = profile.querySelector('.profile__add-button');
const imagePopup = document.querySelector('.image-popup');

const cardTemplate = document.querySelector('#card-template');
const placesName = placePopup.querySelector('.place-popup__input_name');
const placesLink = placePopup.querySelector('.place-popup__input_image');




function handleCardClick(src,name) {
  pop.open(src,name);
}

function openProfile(){
  popProfile.open();
  const { name, job } = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
}

function addCard(){
  popAddCard.open();
}

function vaidateForm(targetForm) {
  const valid = new FormValidator(
    {
      inputSelector: '.popup__input',
      submitButtonSelector: '.popup__button',
      inactiveButtonClass: 'popup__button_inactive',
      inputErrorClass: 'popup__input_type_error',
      errorClass: 'popup__input-error_active'
    }, targetForm
  );
  
  valid.enableValidation();
}

function createCard(element) {
  const card = new Card(element, cardTemplate, handleCardClick);
  const newCardElement = card.getCardElement();
  return newCardElement
}

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card= createCard(item);
    cardSection.addItem(card);  
  }
},
cardPlace
);

infoButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', addCard);
const user = new UserInfo(pageProfileName,pageProfileJob);
const pop = new PopupWithImage(imagePopup);
pop.setEventListeners();
const popProfile = new PopupWithForm(
  profilePopup,
  (arr) => {  
    user.setUserInfo(arr[0].value,arr[1].value);
    popProfile.close();
  }
);

popProfile.setEventListeners();
const popAddCard = new PopupWithForm(
  placePopup,
  (arr) => {
    
    const name = arr[0].value;
    const link = arr[1].value;    
    const card= createCard({name,link});
    cardSection.addItemToStart(card);
    
    placesName.form.reset();
    popAddCard.close();
  }
)
popAddCard.setEventListeners();

vaidateForm(popupContainer);
vaidateForm(placePopupContainer);



cardSection.drawElem();