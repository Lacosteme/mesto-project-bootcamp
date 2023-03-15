export const formElement = document.querySelector(".popup__form");
export const popupEditProfile = document.querySelector(".popup_type_edit-profile");
export const profileTitle = document.querySelector(".profile__title");
export const profileSubtitle = document.querySelector(".profile__subtitle");
export const nameInput = formElement.querySelector(".popup__input_field_name");
export const jobInput = formElement.querySelector(".popup__input_field_description");

export function closePopup(name) {
  name.classList.remove("popup_opened");
  document.removeEventListener("keydown", closePressEsc);
}
function closePressEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
export function openPopup(name) {
  name.classList.add("popup_opened");
  document.addEventListener("keydown", closePressEsc);
}
export function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupEditProfile);
};

