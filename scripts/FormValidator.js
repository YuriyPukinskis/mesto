export class FormValidator{
  constructor(formSelector,
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass)
  {
    this.formSelector=formSelector;
    this.inputSelector=inputSelector;
    this.submitButtonSelector=submitButtonSelector;
    this.inactiveButtonClass=inactiveButtonClass;
    this.inputErrorClass=inputErrorClass;
    this.errorClass=errorClass;
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
  
  _isValid = (formElement, inputElement,rest) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, rest.errorClass, rest.inputErrorClass);
    } else {
      this._hideInputError(formElement, inputElement, rest.errorClass, rest.inputErrorClass);
    }
  }; 
  
  _buttonCheck(buttonList, inputList,rest){
    buttonList.forEach((buttonElement) => {
      this._toggleButtonState(inputList, buttonElement, rest.inactiveButtonClass);
    });
  }
   
  _setEventListeners = (formElement,rest) => {
    const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
    const buttonList = Array.from(formElement.querySelectorAll(rest.submitButtonSelector));
    this._buttonCheck(buttonList, inputList,rest);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement,rest);
        this._buttonCheck(buttonList, inputList,rest);
      });
    });
  }; 
  
  enableValidation = ({formSelector, ...rest}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement, rest);
    });
  };
}