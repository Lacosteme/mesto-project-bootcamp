import { profileName, renderCard } from "../index";
import { removeLike, addLike, addCard, deleteCard } from "./api";
import { closePopup, openPopup } from "./modal";
const popupDeleteConfirm = document.querySelector(".popup_type_delete-confirm");
export const buttonConfirmDelete = popupDeleteConfirm.querySelector(
  ".popup__save-button"
);
const placeForm = document.querySelector(".popup_type_new-card");
const popupSaveButtonPlace = placeForm.querySelector(".popup__save-button");
const placeInput = document.querySelector(".popup__input_field_place");
const linkInputNewCard = document.querySelector(".popup__input_field_link");
// Создание карточек
export function createCard(card, openCardImagePopup) {
  const cardElement = document
    .querySelector("#element-template")
    .content.querySelector(".element")
    .cloneNode(true);
  cardElement.id = card._id;
  const elementImage = cardElement.querySelector(".element__image");
  const likeElement = cardElement.querySelector(".element__like-button");
  const elementTrash = cardElement.querySelector(".element__trash");
  cardElement.querySelector(".element__title-text").textContent = card.name;
  elementImage.src = card.link;
  elementImage.alt = card.name;
  cardElement.querySelector(".element__title-like-num").textContent =
    card.likes.length;
  elementTrash.addEventListener("click", removeCard);
  likeElement.addEventListener("click", giveLike);
  card.likes.forEach((like) => checkLikeButton(like._id, likeElement));
  elementImage.addEventListener("click", () =>
    openCardImagePopup(elementImage)
  );
  deleteCardAbility(card, elementTrash);
  return cardElement;
}

function removeCard(event) {
  const card = event.currentTarget.closest(".element");
  openPopup(popupDeleteConfirm);
  popupDeleteConfirm.id = card.id;
}

function giveLike(evt) {
  const cardEl = evt.target.closest(".element");
  const cardLikeCount = cardEl.querySelector(".element__title-like-num");
  if (evt.target.classList.contains("element__like-button_active")) {
    removeLike(cardEl.id)
      .then((res) => {
        checkLikesCount(res._id, res.likes.length, cardLikeCount, cardEl.id);
        evt.target.classList.remove("element__like-button_active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  } else {
    addLike(cardEl.id)
      .then((res) => {
        checkLikesCount(res._id, res.likes.length, cardLikeCount, cardEl.id);
        evt.target.classList.add("element__like-button_active");
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}
// Количество лайков 
function checkLikesCount(id, numbers, counter, cardId) {
  if (cardId === id) {
    counter.textContent = numbers;
  }
}
// Проверка ставил уже пользователь лайк
function checkLikeButton(like, likeButton) {
  if (like === profileName.id) {
    likeButton.classList.add("element__like-button_active");
  }
}
// Изменение кнопки при нажатии кнопки подтверждения формы
export function renderLoading(
  condition,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  if (condition) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}
// Загрузка пользователем новой карточки
export function handleSubmitCard(evt) {
  evt.preventDefault();
  renderLoading(true, popupSaveButtonPlace);
  addCard({
    name: `${placeInput.value}`,
    link: `${linkInputNewCard.value}`,
  })
    .then((res) => {
      renderCard(res);
      evt.target.reset();
      closePopup(placeForm);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, popupSaveButtonPlace);
    });
}
// Функция проверки, пользователь может удалять только загруженный им карточки
function deleteCardAbility(item, trash) {
  if (item.owner._id === profileName.id) {
    trash.classList.remove("element__trash_disable");
  } else {
    trash.classList.remove("element__trash");
  }
}
// Удаление пользователем карточки с сервера
export function serverDeleteCard(evt) {
  renderLoading(true, buttonConfirmDelete, "Да", "Удаление...");
  const deleteCardId = popupDeleteConfirm.id;
  deleteCard(popupDeleteConfirm.id)
    .then((res) => {
      popupDeleteConfirm.id = "";
      document.getElementById(`${deleteCardId}`).remove();
      closePopup(popupDeleteConfirm);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, buttonConfirmDelete, "Да", "Удаление...");
    });
}
