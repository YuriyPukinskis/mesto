let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let submitButton = popupContainer.querySelector('.popup__button');
let nameInput = popupContainer.querySelector('.popup__input_name');
let jobInput = popupContainer.querySelector('.popup__input_occupation');
let closeButton = popupContainer.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let info = profile.querySelector('.profile__info');
let pageProfileName = info.querySelector('.profile__name');
let pageProfileJob = info.querySelector('.profile__occupation');
let infoButton = info.querySelector('.profile__button');

function openProfile(){
  popup.classList.add('popup_visible');
  popupContainer.classList.add('popup__container_visible');
  nameInput.value=pageProfileName.textContent;
  jobInput.value=pageProfileJob.textContent;
}

function formClose(){
  popup.classList.remove('popup_visible');
  popupContainer.classList.remove('popup__container_visible');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  pageProfileName.textContent=nameInput.value;
  pageProfileJob.textContent=jobInput.value;
  formClose();
}

popupContainer.addEventListener('submit', formSubmitHandler);
infoButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', formClose);