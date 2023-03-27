import "./pages/index.css";
import {
  openPopup,
  closePopup,
  handleFormSubmit,
  formElement,
  popupEditProfile,
  nameInput,
  jobInput,
  profileTitle,
  profileSubtitle,
} from "./components/modal";
import { getCards, getProfile, addAvatar, addUser } from "./components/api.js";
import {
  handleSubmitCard,
  renderLoading,
  serverDeleteCard,
  createCard,
  buttonConfirmDelete,
} from "./components/cards.js";
import { enableValidation } from "./components/validate.js";

const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const buttonCloseEditProfilePopup =
  popupEditProfile.querySelector(".popup__close");
const buttonCloseNewCardPopup = popupAddNewCard.querySelector(".popup__close");
const formNewPlace = document.querySelector(".popup__form-place");
const popupViewImage = document.querySelector(".popup_type_image");
const popupImage = popupViewImage.querySelector(".popup__image");
const popupImageTitle = popupViewImage.querySelector(".popup__image-title");
const buttonCloseViewImagePopup = popupViewImage.querySelector(".popup__close");
const cardsArea = document.querySelector(".elements");
const popups = document.querySelectorAll(".popup");
const profileForm = document.querySelector(".popup__form-profile");
const buttonSaveProfile = profileForm.querySelector(".popup__save-button");
const profileAvatar = document.querySelector(".profile__avatar");
export const profileName = document.querySelector(".profile__title");
const profileActivity = document.querySelector(".profile__subtitle");
const buttonAvatarEdit = document.querySelector(".profile__avatar-edit");
const popupEditAvatar = document.querySelector(".popup_type_avatar-edit");
const popupFormAvatar = document.querySelector(".popup__form-avatar");
export const submitPopupButton = popupEditAvatar.querySelector(
  ".popup__save-button"
);
const linkInputAvatar = document.querySelector(
  ".popup__input_field_link-avatar"
);
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__form_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(settings);

export function renderCard(card) {
  const cardElement = createCard(card, openCardImagePopup);
  cardsArea.prepend(cardElement);
}

Promise.all([getProfile(), getCards()])
  .then(([userData, cardsData]) => {
    profileName.id = userData._id;
    profileName.textContent = userData.name;
    profileActivity.textContent = userData.about;
    profileAvatar.src = userData.avatar;
    nameInput.value = userData.name;
    jobInput.value = userData.about;
    cardsData.forEach(renderCard);
  })
  .catch((err) => {
    console.log(`Возникла ошибка: ${err}`);
  });

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

function openProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
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
formNewPlace.addEventListener("submit", handleSubmitCard);
buttonAvatarEdit.addEventListener("click", function () {
  openPopup(popupEditAvatar);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});
// Функция дбавления 
// function handleFormSubmitAvatar(evt) {
//   evt.preventDefault();
//   renderLoading(true, submitPopupButton);
//   addAvatar(linkInputAvatar.value)
//     .then((res) => {
//       (profileAvatar.src = res.avatar), evt.target.reset();
//       closePopup(popupEditAvatar);
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       renderLoading(false, submitPopupButton);
//     });
// }
profileForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, buttonSaveProfile);
  addUser(nameInput.value, jobInput.value)
    .then((res) => {
      profileName.id = res._id;
      profileName.textContent = res.name;
      jobInput.textContent = res.about;
      closePopup(popupEditProfile);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonSaveProfile);
    });
});
popupFormAvatar.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true, submitPopupButton);
  addAvatar(linkInputAvatar.value)
    .then((res) => {
      (profileAvatar.src = res.avatar), evt.target.reset();
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitPopupButton);
    });
});

buttonConfirmDelete.addEventListener("click", () => {
  serverDeleteCard();
});

