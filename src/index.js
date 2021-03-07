let addToy = false;
const apiUrl = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {

  fetchToys();

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

  // fetch toys - get

  function fetchToys() {
    fetch(apiUrl) 
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        data.forEach(displayToy)
      });
  }

  // create toy cards

  function displayToy(toy) {

    // create card variables

    const toyCollection = document.getElementById('toy-collection')
    const card = document.createElement('div')
    const name = document.createElement('h2')
    const img = document.createElement('img')
    const p = document.createElement('p')
    const btn = document.createElement('button')

    // create card content

    toyCollection.appendChild(card)
    
    card.setAttribute('id', toy.id)
    card.classList.add('card')
    card.appendChild(name)
    card.appendChild(img)
    card.appendChild(p)
    card.appendChild(btn)

    name.innerText = toy.name
    img.src = toy.image
    img.classList.add('toy-avatar')
    p.innerText = toy.likes
    btn.classList.add('like-btn')
    btn.innerText = "Like ❤️"

    const button = document.querySelectorAll(".like-btn")
    button.forEach((b) => {
      b.addEventListener("click", (e) => {
        like(e);
      });
    });
    
  }

  // create toys - post

  function createToys(event) {
    event.preventDefault();
    const toyForm = document.querySelector('.add-toy-form');

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }

      body: JSON.stringify({
        name: toyForm.elements[0].value,
        image: toyForm.elements[1].value,
        likes: 0,
      }),
    })

      .then((response) => response.json())
      .then((data) => {
        let newToy = renderToys(data);
        toyCollection.append(newToy);
      });

  }

  // helper for display

  function renderToys(toy) {
    toy.forEach((toy) => displayToy(toy));
  }

  // like toys

  function like(e) {
    let likeCount = parseInt(e.target.previousElementSibling.innerText) + 1;
    fetch(`http://localhost:3000/toys/${e.target.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        likes: likeCount,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        e.target.previousElementSibling.innerText = `${likeCount}`;
      });
  }


});