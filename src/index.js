import {Card} from './components/Card.js';
import UserInfo from './components/UserInfo.js';
import PopupWithImage from'./components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import {FormValidator} from './components/FormValidator.js';
import Section from './components/Section.js';
import{initialCards,cardPlace} from './constants/constants.js';
import './pages/index.css';


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




function handleCardClick() {
  const pop = new PopupWithImage(imagePopup);
  pop.open();
  pop.setEventListeners();
}

function openProfile(){
  const user = new UserInfo(pageProfileName,pageProfileJob);
  const pop = new PopupWithForm(
    profilePopup,
    (evt) => {
      evt.preventDefault();
      
      user.setUserInfo(nameInput,jobInput);
      pop.close();
    }
  )
  pop.open();
  pop.setEventListeners();
  const { name, job } = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
}

function addCard(){
  const pop = new PopupWithForm(
    placePopup,
    (evt) => {
      evt.preventDefault();
       
      const name = placesName.value;
      const link = placesLink.value;
      alert('i am called')       
      const cardSection = new Section({
        items: [{name,link}],
        renderer: (item) => {
          const card= createCard(item);
          cardSection.addItemToStart(card);  
        }
      },
      cardPlace
      );
      
      cardSection.drawElem();
      placesName.form.reset();
      pop.close();
    }
  )
  pop.open();
  pop.setEventListeners();
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

infoButton.addEventListener('click', openProfile);
addPlaceButton.addEventListener('click', addCard);


vaidateForm(popupContainer);
vaidateForm(placePopupContainer);

const cardSection = new Section({
  items: initialCards,
  renderer: (item) => {
    const card= createCard(item);
    cardSection.addItem(card);  
  }
},
cardPlace
);

cardSection.drawElem();