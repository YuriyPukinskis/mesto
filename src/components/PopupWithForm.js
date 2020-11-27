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
    return inputList;
  }

  setEventListeners(){
    super.setEventListeners();
    // this.popupSelector.addEventListener('submit', this.submitCallback.bind(this,this._getInputValues()));
    this.popupSelector.addEventListener('submit', (evt)=> this.submitCallback(this._getInputValues(evt)));
  //   // this.popupSelector.addEventListener('submit', this.submitCallback);
  }
}