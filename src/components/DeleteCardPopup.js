import Popup from './Popup.js'

export default class DeleteCardPopup extends Popup{
  constructor(popupSelector,submitCallback){
    super(popupSelector);
    this.submitCallback = submitCallback;
  }

  open(name,text){
    super.open();
    this.popupSelector.removeEventListener('submit', this.call);
    this.setEventListeners();
    name.textContent = text;
  }

  call=(evt)=>{
    this.submitCallback(evt)
  }

  close(){
    super.close();
    this.popupSelector.removeEventListener('submit', this.call);
  }
  

  setEventListeners(){
    super.setEventListeners();
    this.popupSelector.addEventListener('submit', this.call);
  }
}