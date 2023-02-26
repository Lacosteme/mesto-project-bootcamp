const buttonOpenEditProfile = document.querySelector(".profile__edit-button");
const buttonOpenNewCard = document.querySelector(".profile__add-button");
const popupEditProfile = document.querySelector(".popup_type_edit-profile");
const popupAddNewCard = document.querySelector(".popup_type_new-card");
const buttonCloseEditProfilePopup =  popupEditProfile.querySelector(".popup__close");
const buttonCloseNewCardPopup = popupAddNewCard.querySelector(".popup__close");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_field_name");
const jobInput = formElement.querySelector(".popup__input_field_description");
const formNewPlace = document.querySelector(".popup__form-place");
const placeInput = formNewPlace.querySelector(".popup__input_field_place");
const linkInput = formNewPlace.querySelector(".popup__input_field_link");
const popupViewImage = document.querySelector(".popup_type_image");
const popupImage = popupViewImage.querySelector(".popup__image");
const popupImageTitle = popupViewImage.querySelector(".popup__image-title");
const buttonCloseViewImagePopup = popupViewImage.querySelector(".popup__close");
const cardsArea = document.querySelector(".elements");
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
function createCard(obj) {
  const cardElement = document
    .querySelector("#element-template")
    .content.cloneNode(true);
  const elementImage = cardElement.querySelector(".element__image");
  cardElement.querySelector(".element__title-text").textContent = obj.name;
  elementImage.src = obj.link;
  elementImage.alt = obj.name;
  cardElement
    .querySelector(".element__like-button")
    .addEventListener("click", giveLike);
  cardElement
    .querySelector(".element__trash")
    .addEventListener("click", removeCard);
  elementImage.addEventListener("click", () =>
    openCardImagePopup(elementImage)
  );
  return cardElement;
}
function renderCard(obj) {
  const cardElement = createCard(obj);
  cardsArea.prepend(cardElement);
}
function renderInitialCards() {
  initialCards.forEach(renderCard);
}
renderInitialCards();

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
}
function openPopup(name) {
  name.classList.add("popup_opened");
}
function closePopup(name) {
  name.classList.remove("popup_opened");
}
function openProfile() {
  openPopup(popupEditProfile);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
}
function giveLike(event) {
  const like = event.currentTarget.closest(".element__like-button");
  like.classList.toggle("element__like-button_active");
}
function removeCard(event) {
  const card = event.currentTarget.closest(".element");
  card.remove();
}

function openCardImagePopup(elementImage) {
  popupImage.src = elementImage.src;
  popupImage.alt = elementImage.alt;
  popupImageTitle.textContent = elementImage.alt;
  popupViewImage.classList.add("popup_opened");
}


buttonOpenEditProfile.addEventListener("click", () =>
  openPopup(popupEditProfile)
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
