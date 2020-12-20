import{ESC_CODE} from '../constants/constants.js';

export default class Popup{
  constructor(popupSelector){
    this._popupSelector=popupSelector;
  }

  _handleEscDown = (evt) => {
    if (evt.keyCode === ESC_CODE) {
      this.close();
    };
  }

  open() {
    this._popupSelector.classList.add('popup_visible'); 
    document.addEventListener('keydown',this._handleEscDown); 
  }
  
  close() {
    this._popupSelector.classList.remove('popup_visible');
    document.removeEventListener('keydown',this._handleEscDown);
  } 

  _clickOnSide(evt){
    if(evt.target.classList.contains('popup')){
      this.close();
    }
  }

  setEventListeners(){
    this._popupSelector.addEventListener('click',this._clickOnSide.bind(this)); 
    const popupCloseButton = this._popupSelector.querySelector('.popup__close');
    popupCloseButton.addEventListener('click', () => this.close());
  }
}