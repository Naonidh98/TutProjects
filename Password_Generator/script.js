/*fetch elements*/

const displayPassword = document.querySelector("#display-password");
const passLength = document.querySelector(".password-length");
const inputRange = document.querySelector("[data-lengthRange]");

const numberCheckbox = document.querySelector("#number");
const uppercaseCheckbox = document.querySelector("#uppercase");
const lowercaseCheckbox = document.querySelector("#lowercase");
const symbolCheckbox = document.querySelector("#symbols");
const allcheckBox = document.querySelectorAll("input[type='checkbox']");
const copyStatus = document.querySelector(".status");
const strengthContainer = document.querySelector(".indicator");

let length = 10;
const symbol = "~`!@#$%^&*()-+_={}[];:,.<>?/";
let password = "";
let checkCount = 0;
setRangeLength(length);
setindicator('#fff');
/*functions*/

//Fisher-Yates Mathod to shuffle

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function setRangeLength(length) {
  passLength.innerText = length;
  inputRange.value = length;
  let min =inputRange.min;
  let max=inputRange.max;
  inputRange.style.backgroundSize= ( (length - min)*100/(max - min)) + "%";
}

function setindicator(color){
  strengthContainer.style.background=color;
  strengthContainer.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomNumber() {
  return getRandomInteger(0, 10);
}

function getUppercase() {
  return String.fromCharCode(getRandomInteger(65, 91));
}
function getLowercase() {
  return String.fromCharCode(getRandomInteger(97, 123));
}
function getsymbol() {
  let number = getRandomInteger(0, symbol.length);
  return symbol.charAt(number);
}

function addCheckboxelement() {
  if (checkCount <= 0) {
    alert("Please select atleast one checkbox");
    return 0;
  }

  if (length < checkCount) {
    length = checkCount;
    setRangeLength(length);
  }

  let arr = [];

  password = "";
  if (numberCheckbox.checked) {
    arr.push(getRandomNumber);
    let temp = getRandomNumber();
    password = password + temp;
  }
  if (uppercaseCheckbox.checked) {
    arr.push(getUppercase);

    password = password + getUppercase();
  }
  if (lowercaseCheckbox.checked) {
    arr.push(getLowercase);
    password = password + getLowercase();
  }
  if (symbolCheckbox.checked) {
    arr.push(getsymbol);
    password = password + getsymbol();
  }

  let size = password.length;

  for (let i = size; i < length; i++) {
    let num = getRandomInteger(0, arr.length);
    password = password + arr[getRandomInteger(0, arr.length)]();
  }

  let passarray = password.split("");
  passarray = shuffle(passarray);
  password = passarray.join("");

  displayPassword.value = password;

  let setColorStrength = '#fff';
  
  if(checkCount >=3 && length>=10){
    setColorStrength =  '#38b000';
  }
  else if(checkCount >=2 || length>=6){
    setColorStrength='#d62828';
  }

  setindicator(setColorStrength);

}

function numberOfChecks() {
  checkCount = 0;
  if (numberCheckbox.checked) {
    checkCount++;
  }
  if (uppercaseCheckbox.checked) {
    checkCount++;
  }
  if (lowercaseCheckbox.checked) {
    checkCount++;
  }
  if (symbolCheckbox.checked) {
    checkCount++;
  }
}

async function copyToClipboard() {
  if (password === "") return;
  try {
    await navigator.clipboard.writeText(password);
    copyStatus.innerText = "copied";
  } catch (e) {
    copyStatus.innerText = "failed";
  }
  copyStatus.classList.remove("unactive");
  setTimeout(() => {
    copyStatus.classList.add("unactive");
  }, 2000);
}


/*eventlistners*/

inputRange.addEventListener("input", (e) => {
  length = e.target.value;
  setRangeLength(length);
});

allcheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    numberOfChecks();
  });
});

/******************/
