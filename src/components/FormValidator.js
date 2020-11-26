export class FormValidator{
  constructor(validation, formElement)
  {
    this._validation=validation;
    this._formElement = formElement;
    this._inputList = Array.from(this._formElement.querySelectorAll(this._validation.inputSelector));
  }

  _hasInvalidInput = () => {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  _toggleButtonState = (button) => {
    if (this._hasInvalidInput(this._inputList)) {
      button.classList.add(this._validation.inactiveButtonClass);
      button.disabled = true;
    } else {
      button.classList.remove(this._validation.inactiveButtonClass);
      button.disabled = false;
    }
  }; 
  
  _showInputError = (inputElement, errorMessage) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._validation.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validation.errorClass);
  };
  
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this._validation.inputErrorClass);
    errorElement.classList.remove(this._validation.errorClass);
    errorElement.textContent = '';
  }; 
  
  _isValid = (inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }; 
  
  _buttonCheck(buttonList){
    buttonList.forEach((buttonElement) => {
      this._toggleButtonState(buttonElement);
    });
  }
   
  _setEventListeners = () => {
    
    const _buttonList = Array.from(this._formElement.querySelectorAll(this._validation.submitButtonSelector));
    this._buttonCheck(_buttonList);
    this._inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
        this._isValid(_inputElement);
        this._buttonCheck(_buttonList);
      });
    });
  }; 
  
  enableValidation = () => {
    this._setEventListeners();
  };
}