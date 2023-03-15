import './pages/index.css';
import {createCard,giveLike,removeCard} from "./components/cards.js";
import {openPopup,closePopup,handleFormSubmit,formElement,popupEditProfile,nameInput,jobInput,profileTitle,profileSubtitle} from "./components/modal.js";
import {enableValidation} from "./components/validate.js";

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const buttonCloseEditProfilePopup =
  popupEditProfile.querySelector(".popup__close");
const buttonCloseNewCardPopup = popupAddNewCard.querySelector(".popup__close");
const formNewPlace = document.querySelector(".popup__form-place");
const placeInput = formNewPlace.querySelector(".popup__input_field_place");
const linkInput = formNewPlace.querySelector(".popup__input_field_link");
const popupViewImage = document.querySelector(".popup_type_image");
const popupImage = popupViewImage.querySelector(".popup__image");
const popupImageTitle = popupViewImage.querySelector(".popup__image-title");
const buttonCloseViewImagePopup = popupViewImage.querySelector(".popup__close");
const cardsArea = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
function addNewCard(evt) {
  evt.preventDefault();
  const cardElement = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  cardElement.querySelector(".element__title-text").textContent =
    placeInput.value;
  cardElement.querySelector(".element__image").alt = placeInput.value;
  cardElement.querySelector(".element__image").src = linkInput.value;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", giveLike);
  cardElement
    .querySelector(".element__trash")
    .addEventListener("click", removeCard);
  elementImage.addEventListener("click", () =>
    openCardImagePopup(elementImage)
  );
  cardsArea.prepend(cardElement);
  closePopup(popupAddNewCard);
  evt.target.reset();
};
function openProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
function renderCard(obj) {
  const cardElement = createCard(obj,openCardImagePopup);
  cardsArea.prepend(cardElement);
}
function renderInitialCards() {
  initialCards.forEach(renderCard);
}
renderInitialCards();

function openCardImagePopup(elementImage) {
  popupImage.src = elementImage.src;
  popupImage.alt = elementImage.alt;
  popupImageTitle.textContent = elementImage.alt;
  openPopup(popupViewImage);
}
popups.forEach(function (item, id) {
  const popupCloseButtons = document.querySelectorAll(".popup__close");
  popupCloseButtons[id].addEventListener("click", function () {
    closePopup(item);
  });
  item.addEventListener("mousedown", function (evt) {
    if (evt.currentTarget === evt.target) {
      closePopup(item);
    }
  });
});

buttonOpenEditProfile.addEventListener("click", () =>
openProfile(popupEditProfile)
);
buttonCloseEditProfilePopup.addEventListener("click", () =>
  closePopup(popupEditProfile)
);
buttonOpenNewCard.addEventListener("click", () => openPopup(popupAddNewCard));
buttonCloseNewCardPopup.addEventListener("click", () =>
  closePopup(popupAddNewCard)
);
buttonCloseViewImagePopup.addEventListener("click", () =>
  closePopup(popupViewImage)
);
formElement.addEventListener("submit", handleFormSubmit);
formNewPlace.addEventListener("submit", addNewCard);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form_type_error",
  errorClass: "popup__error_visible",
});
