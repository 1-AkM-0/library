const myBooks = [];
const displayBooksId = [];
const cardsSection = document.querySelector(".cards");
const form = document.forms["form"];
const dialog = document.getElementById("dialog");
const openBtn = document.getElementById("showDialog");
const confirmBtn = document.getElementById("confirmBtn");
const deleteBtns = document.querySelectorAll(".delete");

const inputTitle = form.elements["title"];
const inputAuthor = form.elements["author"];
const inputPages = form.elements["pages"];
const inputRead = form.elements["read"];

openBtn.addEventListener("click", () => {
  dialog.showModal();
});

function Book(title, author, pages, read) {
  if (!new.target) {
    throw Error("Use 'new' operator to create a new book");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myBooks.push(newBook);

  console.log(displayBooksId);
}

function seeBooks() {
  myBooks.forEach((book) => {
    if (!displayBooksId.includes(book.id)) {
      const card = document.createElement("div");
      card.innerText = `${book.title}, ${book.author}, ${book.pages}, ${book.read} `;
      card.setAttribute("data-id", book.id);
      displayBooksId.push(book.id);
      cardsSection.appendChild(card);
    }
  });
}

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addBookToLibrary(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputRead.value
  );
  dialog.close();
  seeBooks();
});
