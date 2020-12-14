import {Card} from '../components/Card.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from'../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import {FormValidator} from '../components/FormValidator.js';
import Section from '../components/Section.js';
import{cardPlace} from '../constants/constants.js';
import Api from '../components/Api.js';
import DeleteCardPopup from '../components/DeleteCardPopup.js';
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
const profileButton = document.querySelector('.profile__submit');
const buttonName = document.querySelector('.place-submit');
const delButtonName = document.querySelector('.place-delete');
const avatarButton = document.querySelector('.avatar-submit');
const avatarInput = document.querySelector('.avatar-popup__input_image');
const deletePopup = document.querySelector('.delete-popup');



//  ФУНКЦИИ

function handleCardClick(popImage,src,name) {
  popImage.open(src,name);
}

function openProfile(popProfile,user){
  popProfile.open();
  const { name, job } = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;
}

function addCard(popAddCard){
  popAddCard.open(buttonName,'Сохранить');
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

function createCard(element,popImage) {
  const card = new Card(element, cardTemplate, handleCardClick, popImage,
    (card,delTarget)=>{
      const delPopup = new DeleteCardPopup(deletePopup,function handler(evt){
        evt.preventDefault();
        Promise.resolve(api.deleteCardFromServer(delTarget))
          .then(function(){
            card.target.parentElement.remove();
            delPopup.close();            
          })
          .catch((err) => {
            console.log(err); 
          });
        delButtonName.textContent = 'Удаление...'
      });
      delPopup.open(delButtonName,'Удалить');
    },
    (evt,likeTarget)=>{
      Promise.resolve(api.likeCardOnServer(likeTarget))
        .then(function(result){evt.target.nextElementSibling.textContent=result.likes.length})
        .catch((err) => {
          console.log(err); 
        });
    },
    (evt,likeTarget)=>{
      Promise.resolve(api.dislikeCardOnServer(likeTarget))
        .then(function(result){evt.target.nextElementSibling.textContent=result.likes.length})
        .catch((err) => {
          console.log(err); 
        });
    }
    );
  const newCardElement = card.getCardElement();
  return newCardElement
}

function executePageGeneration(cardArr){
  const cardSection = new Section({
    items: cardArr,
    renderer: (item) => {
      const card= createCard(item,popImage);
      cardSection.addItem(card);  
    }
  },
  cardPlace);
  const popImage = new PopupWithImage(imagePopup);
  popImage.setEventListeners();
  const avatar = new PopupWithForm(
    avatarPopup,
    (obj)=>{
      Promise.resolve(api.postAvatarToServer(obj['avatar-image']))
      .then(function(){
        user.updateAvatar(pageProfileAvatar,obj['avatar-image'])
        avatar.close(avatarInput)
      })
      .catch((err) => {
        console.log(err); 
      });
      avatarButton.textContent = 'Сохранение...';
    })
  avatarChange.addEventListener('click',()=>{
    avatar.open(avatarChange,'Сохранить')
  })
  avatar.setEventListeners();
  infoButton.addEventListener('click', ()=>openProfile(popProfile,user));
  addPlaceButton.addEventListener('click', ()=>addCard(popAddCard));
  const user = new UserInfo(pageProfileName,pageProfileJob);
  
  const popProfile = new PopupWithForm(
  profilePopup,
  (obj) => {  
    Promise.resolve(api.postLoginToServer(obj['name'],obj['job'],profileButton))
      .then(function(){user.setUserInfo(obj['name'],obj['job']);})
      .then(function(){popProfile.close(nameInput);})
      .catch((err) => {
        console.log(err); 
      });
  }
  );

  popProfile.setEventListeners();
  const popAddCard = new PopupWithForm(
  placePopup,
  (obj) => {
    const name = obj['place-name'];
    const link = obj['place-image'];  
    Promise.resolve(api.postCardToServer(name,link))
    .then(function(result){
      const newCard= createCard({name,link,cardId:result._id,numberOfLikes:0,mine:true},popImage);
      cardSection.addItemToStart(newCard); 
      popAddCard.close(placesName)
    }) 
    .catch((err) => {
      console.log(err); 
    });
    buttonName.textContent = 'Сохранение...';
  }
  )
  popAddCard.setEventListeners();

  validateForm(popupContainer);
  validateForm(placePopupContainer);
  validateForm(avatarPopup);



  cardSection.drawElem();
}

export default function drawCards(cardArr,myIdInLikesArray){
  api.getInitialCards()
      .then(function(result){
        result.forEach(element => {
          const name=element.name;
          const link=element.link;
          const numberOfLikes=element.likes.length;
          const cardId=element._id;
          let liked=false;
          
          for (let i = 0; i < element.likes.length; i++) {
            if (element.likes[i]._id === myIdInLikesArray) {
              liked=true;
            }
          }
          let mine=false;
          if (element.owner._id === myIdInLikesArray) {
            mine=true;
          }
  
          cardArr.push({name,link,numberOfLikes,cardId,liked,mine});       
        });  
        return cardArr
      })
      .then((cardArr)=>{
        executePageGeneration(cardArr,myIdInLikesArray)
      })
      .catch((err) => {
        console.log(err); 
      });
}
  
//     ВЫЗОВЫ
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: 'ece4ec17-0364-4590-98d8-28086b7fa384',
    'Content-Type': 'application/json'
  }
}); 

api.initProfileFomServer()
  .then(function(res){
    const myIdInLikesArray=res._id;
  
    pageProfileName.textContent=res.name;
    pageProfileJob.textContent=res.about;
    pageProfileAvatar.src = res.avatar;
    const cardArr =[]
    drawCards(cardArr,myIdInLikesArray)
  })
  .catch((err) => {
    console.log(err); 
  });  