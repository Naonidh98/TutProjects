let cards = [];
let isAlive = false;
let cardSum = document.querySelector(".sum");
let displayCards = document.querySelector(".cards");

let myStatus = document.querySelector(".status");

function getRandom(min, max) {
  let cardNo =  Math.floor(Math.random() * (max - min)) + min;
  if(cardNo > 10) return 10;
  else if(cardNo === 1) return 11;
  else return cardNo;
}

function getResult() {
  let sum = 0;

  displayCards.textContent = "Cards : ";

  cards.forEach((data) => {
    sum += data;
    displayCards.textContent += data + " ";
  });

  cardSum.textContent = "Sum : " + sum;
  if (sum < 21) {
    myStatus.innerText = "Pick one more Card 🤞";
  } else if (sum === 21) {
    myStatus.innerText = "Hurray!! It's a Blackjack 👑";
    isAlive = false;
  } else {
    myStatus.innerText = "Oops! You Lost Game 🥺";
    isAlive = false;
  }
}

function startNew() {
  if (isAlive) {
    alert("Please complete current Game");
    return;
  }

  isAlive = true;
  cards = [];
  cards.push(getRandom(1, 13));
  cards.push(getRandom(1, 13));
  getResult();
}

function getNewCard() {
  if (!isAlive) {
    alert("Start A New Game");
    return;
  } else {
    cards.push(getRandom(1, 13));
    getResult();
  }
}
