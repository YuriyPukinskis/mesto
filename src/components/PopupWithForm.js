import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this.submitCallback = submitCallback;
  }

  _getInputValues(evt){
    evt.preventDefault();
    const inputList = Array.from(this.popupSelector.querySelectorAll('.popup__input'));
    const formData = {};
    inputList.forEach(input => formData [input.name] = input.value);
    return formData;
  }

  close(input){
    super.close();
    if(input){
      input.form.reset();
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this.popupSelector.addEventListener('submit', (evt)=> this.submitCallback(this._getInputValues(evt),evt));
  }
}