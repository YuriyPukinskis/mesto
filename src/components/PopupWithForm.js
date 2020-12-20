import Popup from './Popup.js'

export default class PopupWithForm extends Popup{
  constructor(popupSelector, submitCallback){
    super(popupSelector);
    this.submitCallback = submitCallback;
  }

  open(name,text){
    super.open();
    name.textContent=text
  }

  _getInputValues(evt){
    evt.preventDefault();
    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__input'));
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
    this._popupSelector.addEventListener('submit', (evt)=> this.submitCallback(this._getInputValues(evt),evt));
  }
}