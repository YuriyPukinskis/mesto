const formElement = document.querySelector('.popup__container');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, button, inactivator) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add(inactivator);
    button.disabled = true;
  } else {
    button.classList.remove(inactivator);
    button.disabled = false;
  }
}; 

const showInputError = (formElement, inputElement, errorMessage, activeError, typeError) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(typeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(activeError);
};

const hideInputError = (formElement, inputElement, activeError, typeError) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(typeError);
  errorElement.classList.remove(activeError);
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement,rest) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, rest.errorClass, rest.inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, rest.errorClass, rest.inputErrorClass);
  }
}; 

function buttonCheck(buttonList, inputList,rest){
  buttonList.forEach((buttonElement) => {
    toggleButtonState(inputList, buttonElement, rest.inactiveButtonClass);
  });
}
 
const setEventListeners = (formElement,rest) => {
  const inputList = Array.from(formElement.querySelectorAll(rest.inputSelector));
  const buttonList = Array.from(formElement.querySelectorAll(rest.submitButtonSelector));
  buttonCheck(buttonList, inputList,rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement,rest);
      buttonCheck(buttonList, inputList,rest);
    });
  });
}; 

const enableValidation = ({formSelector, ...rest}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, rest);
  });
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}); 