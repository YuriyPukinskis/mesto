import {Card} from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from'../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import{cardPlace} from '../constants/constants.js';
import Api from '../components/Api.js';
import Popup from '../components/Popup.js';
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
const pageProfileAvatar=document.querySelector('.profile__logo')
const imagePopup = document.querySelector('.image-popup');

const cardTemplate = document.querySelector('#card-template');
const placesName = placePopup.querySelector('.place-popup__input_name');
const avatarChange = document.querySelector('.profile__art');
const avatarPopup = document.querySelector('.avatar-popup');
const placeButton = document.querySelector('.place-submit');
const profileButton = document.querySelector('.profile__submit');




//  ФУНКЦИИ

function handleCardClick(popImage,src,name) {
  popImage.open(src,name);
}

function openProfile(popProfile,user){
  popProfile.open();
  const { name, job } = user.getUserInfo()
  api.postLoginToServer(name,job,profileButton)
  nameInput.value = name;
  jobInput.value = job;
}

function addCard(popAddCard){
  popAddCard.open();
}

function validateForm(targetForm) {
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
  const popImage = new PopupWithImage(imagePopup);
  popImage.setEventListeners();
  const card = new Card(element, cardTemplate, handleCardClick, popImage);
  const newCardElement = card.getCardElement();
  return newCardElement
}

function executePageGeneration(cardArr){
  const cardSection = new Section({
    items: cardArr,
    renderer: (item) => {
      const card= createCard(item);
      cardSection.addItem(card);  
    }
  },
  cardPlace
  );
  
  const avatar = new PopupWithForm(
    avatarPopup,
    (obj)=>{
      api.postAvatarToServer(obj['avatar-image']);
      avatar.close()
    })
  avatarChange.addEventListener('click',()=>{
    avatar.open()
  })
  avatar.setEventListeners();
  infoButton.addEventListener('click', ()=>openProfile(popProfile,user));
  addPlaceButton.addEventListener('click', ()=>addCard(popAddCard));
  const user = new UserInfo(pageProfileName,pageProfileJob);
  
  const popProfile = new PopupWithForm(
  profilePopup,
  (obj) => {  
    user.setUserInfo(obj['name'],obj['job']);
    popProfile.close();
  }
  );

  popProfile.setEventListeners();
  const popAddCard = new PopupWithForm(
  placePopup,
  (obj) => {
    const name = obj['place-name'];
    const link = obj['place-image'];  
    api.postCardToServer(name,link,placeButton);  
    const card= createCard({name,link});
    cardSection.addItemToStart(card);
    
    placesName.form.reset();
    popAddCard.close();
  }
  )
  popAddCard.setEventListeners();

  validateForm(popupContainer);
  validateForm(placePopupContainer);
  validateForm(avatarPopup);



  cardSection.drawElem();
  }

//     ВЫЗОВЫ
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
    'Content-Type': 'application/json'
  }
}); 



api.initProfileFomServer(pageProfileName,pageProfileJob,pageProfileAvatar)
const cardArr=[]
api.getInitialCards(cardArr);
setTimeout(executePageGeneration, 5000, cardArr);