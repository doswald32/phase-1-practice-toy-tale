let addToy = false;
let i = 0;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://127.0.0.1:3000/toys")
  .then((res) => res.json())
  .then(function (data) {
    data.forEach(function() {
      createToyCardFromServer(data);
      i++;
    });
  });
});

let enterToyName = document.getElementById('toy-name-input');
let enterToyImage = document.getElementById('toy-image-input');

let createToy = document.querySelector('.submit');
createToy.addEventListener('click', function(event) {
  event.preventDefault();
  fetch("http://127.0.0.1:3000/toys", {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": enterToyName.value,
      "image": enterToyImage.value,
      "likes": 0
    })
  })
  .then((res) => res.json())
  .then((data) => createNetNewToyCard(data))
});

function createToyCardFromServer(data) {
  let card = document.createElement('div');
  card.className = 'card';
  let toyName = document.createElement('h2');
  toyName.textContent = data[i].name;
  let toyImg = document.createElement('img');
  toyImg.className = 'toy-avatar';
  toyImg.src = data[i].image;
  let likes = document.createElement('p');
  likes.textContent = 0;
  let button = document.createElement('button');
  button.className = 'like-btn';
  button.id = data[i].id;
  card.appendChild(toyName);
  card.appendChild(toyImg);
  card.appendChild(likes);
  card.appendChild(button);
  let toyCollection = document.getElementById('toy-collection');
  toyCollection.appendChild(card);
};

function createNetNewToyCard(data) {
  let card = document.createElement('div');
  card.className = 'card';
  let toyName = document.createElement('h2');
  toyName.textContent = enterToyName.value;
  let toyImg = document.createElement('img');
  toyImg.className = 'toy-avatar';
  toyImg.src = enterToyImage.value;
  let likes = document.createElement('p');
  likes.textContent = 0;
  let button = document.createElement('button');
  button.className = 'like-btn';
  card.appendChild(toyName);
  card.appendChild(toyImg);
  card.appendChild(likes);
  card.appendChild(button);
  let toyCollection = document.getElementById('toy-collection');
  toyCollection.appendChild(card);
};

