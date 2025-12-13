const oldButton = document.querySelector('.btn');
oldButton.outerHTML = `<button class="btn">Click me</button>`;
const newButton = document.querySelector('btn');

console.log(oldButton === newButton);