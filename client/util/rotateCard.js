import CardCSS from "../assets/Card.module.scss";

export const rotateCard = ({ card, e, id }) => {
  const image = card.childNodes[0].childNodes[1];
  const cardContainer = card.childNodes[0];

  let cardPosition = card.getBoundingClientRect();

  const xCard = card.offsetWidth;
  const yCard = card.offsetHeight;

  let yCoord = (e.pageX - cardPosition.left - xCard / 2) / xCard;
  let xCoord = (-1 * (e.pageY - cardPosition.top - yCard / 2)) / yCard;
  let y = yCoord * 20;
  let x = xCoord * 20;

  /* TRANSLATE IMAGE */
  image.style.transitionDelay = "0s";
  image.style.transition = "0.1s";
  image.style.transform =
    "perspective(200px) translateY(" +
    1 * x +
    "px) translateX(" +
    -1 * y +
    "px)  scale(1.4) translateX(-1%) translateY(-1%)";

  /* ROTATE CARD */
  cardContainer.style.transitionDelay = "0s";
  cardContainer.style.transition = "0.1s";
  cardContainer.style.transform =
    "perspective(400px) rotateY(" + y + "deg) rotateX(" + x + "deg)";
};

export const rotateCardBack = ({ card }) => {
  const cardContainer = card.childNodes[0];
  const image = card.childNodes[0].childNodes[1];
  setTimeout(() => {
    image.style.transform =
      "perspective(400px) scale(1.4) translateX(-1%) translateY(-1%)";
    image.style.transition = "1s";
    cardContainer.style.transform = "perspective(400px)";
    cardContainer.style.transition = "1s";
  }, 1000);
};
