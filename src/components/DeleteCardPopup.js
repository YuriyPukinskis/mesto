import Popup from './Popup.js'

export default class DeleteCardPopup extends Popup{
  constructor(popupElement) {
    super(popupElement);
    this._submitHandler = () => {};
  }

  refreshForm(name,text){
    this._popupSelector.removeEventListener('submit', (evt) => this._submitHandler(evt));
    name.textContent = text;
  }

  changeSubmitHandler(handler) {
    this._submitHandler = handler;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (evt) => this._submitHandler(evt));
  }
}