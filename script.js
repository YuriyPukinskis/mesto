let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let submitButton = popupContainer.querySelector('.popup__button');
let nameInput = popupContainer.querySelector('.popup__name');
let jobInput = popupContainer.querySelector('.popup__occupation');
let closeButton = popupContainer.querySelector('.popup__close');

let profile = document.querySelector('.profile');
let info = profile.querySelector('.info');
let pageProfileName = info.querySelector('.info__name');
let pageProfileJob = info.querySelector('.info__occupation');
let infoButton = info.querySelector('.info__button');

function openProfile(){
  popup.setAttribute('style','display: flex');
  popupContainer.setAttribute('style','display: flex');
  nameInput.value=pageProfileName.textContent;
  jobInput.value=pageProfileJob.textContent;
}

function formClose(){
  popup.setAttribute('style','display: none');
  popupContainer.setAttribute('style','display: none');
}

function formSubmitHandler (evt) {
  evt.preventDefault();
  pageProfileName.textContent=nameInput.value;
  pageProfileJob.textContent=jobInput.value;
  popup.setAttribute('style','display: none');
  popupContainer.setAttribute('style','display: none');
}

submitButton.addEventListener('click', formSubmitHandler);
infoButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', formClose);