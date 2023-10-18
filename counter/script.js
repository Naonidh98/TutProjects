let content = document.querySelector(".content");

function resetContent() {
  content.innerText = 0;
}

resetContent();

function increment() {
  content.innerText = Number(content.innerText) + 1;
}
function decrement() {
  content.innerText = Number(content.innerText) - 1;
}
