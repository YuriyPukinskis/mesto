const formElement = document.querySelector('.popup__container');
const formInput = formElement.querySelector('.popup__input');
const formError = formElement.querySelector(`#${formInput.id}-error`);

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__button_inactive');
    button.disabled = true;
  } else {
    button.classList.remove('popup__button_inactive');
    button.disabled = false;
  }
}; 

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__input-error_active');
  errorElement.textContent = '';
}; 

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}; 

function buttonCheck(buttonList, inputList){
  buttonList.forEach((buttonElement) => {
    toggleButtonState(inputList, buttonElement);
  });
}
 
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonList = Array.from(formElement.querySelectorAll('.popup__button'));
  buttonCheck(buttonList, inputList);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement);
      buttonCheck(buttonList, inputList);
    });
  });
}; 


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__container'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};


enableValidation(); 