import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this.submitCallback = submitCallback;
  }

  _getInputValues(){

  }

  setEventListeners(){
    super.setEventListeners();
    this.popupSelector.addEventListener('submit', this.submitCallback);
  }
}