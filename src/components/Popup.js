import{escCode} from '../constants/constants.js';

export default class Popup{
  constructor(popupSelector){
    this.popupSelector=popupSelector;
  }

  _handleEscDown = (evt) => {
    if (evt.keyCode === escCode) {
      this.close();
    };
  }

  open() {
    this.popupSelector.classList.add('popup_visible'); 
    document.addEventListener('keydown',this._handleEscDown); 
  }
  
  close() {
    this.popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keydown',this._handleEscDown);
  } 

  _clickOnSide(evt){
    if(evt.target.classList.contains('popup')){
      this.close();
    }
  }

  setEventListeners(){
    this.popupSelector.addEventListener('click',this._clickOnSide.bind(this)); 
    const popupCloseButton = this.popupSelector.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => this.close());
  }
}