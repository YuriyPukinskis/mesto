export class FormValidator{
  constructor(validation, formElement)
  {
    this._validation=validation;
    this._formElement = formElement;
  }

  _hasInvalidInput = (_inputList) => {
    return _inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 
  
  _toggleButtonState = (_inputList, _button) => {
    if (this._hasInvalidInput(_inputList)) {
      _button.classList.add(this._validation.inactiveButtonClass);
      _button.disabled = true;
    } else {
      _button.classList.remove(this._validation.inactiveButtonClass);
      _button.disabled = false;
    }
  }; 
  
  _showInputError = (_inputElement, _errorMessage) => {
    const _errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    _inputElement.classList.add(this._validation.inputErrorClass);
    _errorElement.textContent = _errorMessage;
    _errorElement.classList.add(this._validation.errorClass);
  };
  
  _hideInputError = (_inputElement) => {
    const _errorElement = this._formElement.querySelector(`#${_inputElement.id}-error`);
    _inputElement.classList.remove(this._validation.inputErrorClass);
    _errorElement.classList.remove(this._validation.errorClass);
    _errorElement.textContent = '';
  }; 
  
  _isValid = (_inputElement) => {
    if (!_inputElement.validity.valid) {
      this._showInputError(_inputElement, _inputElement.validationMessage);
    } else {
      this._hideInputError(_inputElement);
    }
  }; 
  
  _buttonCheck(_buttonList, _inputList){
    _buttonList.forEach((_buttonElement) => {
      this._toggleButtonState(_inputList, _buttonElement);
    });
  }
   
  _setEventListeners = () => {
    const _inputList = Array.from(this._formElement.querySelectorAll(this._validation.inputSelector));
    const _buttonList = Array.from(this._formElement.querySelectorAll(this._validation.submitButtonSelector));
    this._buttonCheck(_buttonList, _inputList);
    _inputList.forEach((_inputElement) => {
      _inputElement.addEventListener('input', () => {
        this._isValid(_inputElement);
        this._buttonCheck(_buttonList, _inputList);
      });
    });
  }; 
  
  enableValidation = () => {
    this._setEventListeners();
  };
}