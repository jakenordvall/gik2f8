const BookListItem = (book) => {
  let html = `<li id="${book.id}" class=" relative book-list__item mb-2 mx-2 last:mb-0 p-3 text-indigo-800 last:border-b-0 border-b border-indigo-500 cursor-pointer" > ${book.author} - ${book.title} </li>`;

  return html;
};
