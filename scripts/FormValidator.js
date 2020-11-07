export class FormValidator{
  constructor(validation, formElement)
  {
    this.validation=validation;
    this.formElement = formElement;
  }

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  _toggleButtonState = (inputList, button, inactivator) => {
    if (this._hasInvalidInput(inputList)) {
      button.classList.add(inactivator);
      button.disabled = true;
    } else {
      button.classList.remove(inactivator);
      button.disabled = false;
    }
  }; 
  
  _showInputError = (formElement, inputElement, errorMessage, activeError, typeError) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(typeError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(activeError);
  };
  
  _hideInputError = (formElement, inputElement, activeError, typeError) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(typeError);
    errorElement.classList.remove(activeError);
    errorElement.textContent = '';
  }; 
  
  _isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, errorClass, inputErrorClass);
    }
  }; 
  
  _buttonCheck(buttonList, inputList, inactiveButtonClass){
    buttonList.forEach((buttonElement) => {
      this._toggleButtonState(inputList, buttonElement, inactiveButtonClass);
    });
  }
   
  _setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonList = Array.from(formElement.querySelectorAll(submitButtonSelector));
    this._buttonCheck(buttonList, inputList, inactiveButtonClass);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement, inputErrorClass, errorClass);
        this._buttonCheck(buttonList, inputList, inactiveButtonClass);
      });
    });
  }; 
  
  enableValidation = () => {
    this._setEventListeners(this.formElement, this.validation.inputSelector, this.validation.submitButtonSelector, 
      this.validation.inactiveButtonClass, this.validation.inputErrorClass, this.validation.errorClass);
  };
}