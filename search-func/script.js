"use strict";

let bookList = [];

window.addEventListener("load", () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

const searchField = document.getElementById("searchField");

searchField.addEventListener("keyup", (e) => searchBooks(e.target.value));

function searchBooks(searchTerm) {
  const filteredList = bookList.filter(
    ({ title, author }) =>
      title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
      author.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
  );

  renderBookList(filteredList);
}

/* searchField.addEventListener("keyup", (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().indexOf(searchTerm) >= 0 ||
        author.toLowerCase().indexOf(searchTerm) >= 0
      );
    })
  )
); */

function renderBookList(bookList) {
  const existingElement = document.querySelector(".book-list");
  const existingPicture = document.getElementById("ball");
  if (existingPicture) {
    existingPicture.remove();
  }

  const root = document.getElementById("root");

  if (existingElement) {
    root.removeChild(existingElement);
  }
  if (bookList.length > 0 && searchField.value) {
    root.insertAdjacentHTML("beforeend", BookList(bookList));
  }

  let list = document.querySelectorAll(".book-list__item");

  list.forEach(bookToFind);
}

function bookToFind(item) {
  item.addEventListener("mouseenter", (e) => {
    const existingPicture = document.getElementById("ball");

    if (!existingPicture) {
      let bookID = e.target.id;
      renderBookListPicture(bookID, e.pageX, e.pageY).then((data) => {
        root.insertAdjacentHTML("beforeend", data);
      });
    }
  });

  item.addEventListener("mousemove", (e) => {
    const existingPicture = document.getElementById("ball");
    if (existingPicture) {
      let X = e.pageX + 10;
      let Y = e.pageY + 10;
      existingPicture.style.top = Y + "px";
      existingPicture.style.left = X + "px";
    }
  });

  item.addEventListener("mouseout", () => {
    const existingPicture = document.getElementById("ball");
    if (existingPicture) {
      existingPicture.remove();
    }
  });
}

function renderBookListPicture(bookID, x, y) {
  let currentBook;

  let finalDiv = findBook(bookID).then((data) => {
    console.log(data);
    currentBook = data;
    const div = `<div id="ball" class="grid grid-cols-2 gap-4 place-content-center absolute bg-black py-12 w-[20rem] h-[20rem] rounded-full top-[${
      y + 10
    }px] left-[${x + 10}px]">
    
    <p class="flex text-sky-400 ">${currentBook.title}</p>
    <p class= "flex text-sky-400">${currentBook.author}</p>
    <p class= "flex text-sky-400">${currentBook.pages}</p>
    
    <img src = "${currentBook.coverImage}" class="w-[10rem] h-[10rem] "> 
    </div>`;

    return div;
  });

  // let currentBook = bookList[bookID - 1];
  //console.log(currentBook.title);
  /*const div = `<div id="ball" class="absolute bg-black w-[30rem] h-[30rem] rounded-full top-[${y}px] left-[${x}px]">
  <p>${currentBook.title}</p>
  <p>${currentBook.author}</p>
  </div>`;
  console.log(div);

  bg-black w-[15rem] h-[15rem] rounded-full

  return div; */

  return finalDiv;
}

async function findBook(id) {
  let book;
  let urlString = `https://gik2f8-labs.herokuapp.com/books/${id}`;
  const result = await fetch(urlString)
    .then((data) => data.json())
    .then((data) => {
      book = data;
    });
  return book;
}
