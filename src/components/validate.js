const popupForm = document.querySelector(".popup__form");
const formInput = popupForm.querySelector(".popup__input");

const showInputError = (popupForm, formInput, errorMessage) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.add("popup__form_type_error");
  formError.textContent = errorMessage;
  formError.classList.add("popup__error_visible");
};

const hideInputError = (popupForm, formInput) => {
  const formError = popupForm.querySelector(`.${formInput.id}-error`);
  formInput.classList.remove("popup__form_type_error");
  formError.classList.remove("popup__error_visible");
  formError.textContent = "";
};
const isValid = (popupForm, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(popupForm, formInput, formInput.validationMessage);
  } else {
    hideInputError(popupForm, formInput);
  }
};

const setEventListeners = (popupForm) => {
  const inputList = Array.from(popupForm.querySelectorAll(".popup__input"));
  const buttonElement = popupForm.querySelector(".popup__save-button");
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((formInput) => {
    formInput.addEventListener("input", () => {
      isValid(popupForm, formInput);
      toggleButtonState(inputList, buttonElement);
    });
  });
};
export const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((popupForm) => {
    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupForm);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-button_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove("popup__save-button_disabled");
    buttonElement.disabled = false;
  }
};

