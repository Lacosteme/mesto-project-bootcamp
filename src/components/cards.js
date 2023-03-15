export function createCard(obj,openCardImagePopup) {
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

export function removeCard(event) {
  const card = event.currentTarget.closest(".element");
  card.remove();
}


export function giveLike(event) {
  const like = event.currentTarget.closest(".element__like-button");
  like.classList.toggle("element__like-button_active");
}

