"use strict";

const searchInput = null;
const bookList = [
  {
    id: 1,
    author: "Charles Dickens",
    title: "Oliver Twist",
  },
  {
    id: 2,
    author: "William Shakespeare",
    title: "Hamlet",
  },
];

const handleKeyPress = (input) => {
  /* 1. Ta emot/läsa av värdet i inputfältet
        2. Skicka värdet till searchBooks */
  searchBooks(input);
};

const filteredList = [];
const searchBooks = (searchTerm) => {
  for (let i = 0; i < bookList.length; i++) {
    const title = bookList[i].title.toLowerCase();
    if (title.indexOf(searchTerm.toLowerCase()) >= 0) {
      filteredList.push(bookList[i]);
    }
  }
  console.log(filteredList);
};

const renderList = (list) => {
  console.log(list);
};

handleKeyPress("e");
