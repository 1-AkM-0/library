const myBooks = [];
const displayBooksId = [];
const cardsSection = document.querySelector(".cards");
const form = document.forms["form"];
const dialog = document.getElementById("dialog");
const openBtn = document.getElementById("showDialog");
const confirmBtn = document.getElementById("confirmBtn");

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
}

function seeBooks() {
  myBooks.forEach((book) => {
    if (!displayBooksId.includes(book.id)) {
      displayBooksId.push(book.id);
      const tr = document.createElement("tr");
      tr.setAttribute("data-id", book.id);
      cardsSection.appendChild(tr);

      let values = Object.values(book);
      values.forEach((value) => {
        let td = document.createElement("td");
        if (book.id != value) {
          if (book.read == value) {
            if (value == "yes") {
              td.classList.add("read");
            } else {
              td.classList.add("unread");
            }
            td.textContent = value;
            handleRead(td);
          }
          td.innerText = value;
          tr.appendChild(td);
        }
      });

      handleDelete(tr);
    }
  });
}

function handleRead(td) {
  td.addEventListener("click", () => {
    if (td.classList.contains("read")) {
      td.classList.remove("read");
      td.classList.add("unread");
      td.textContent = "no";
    } else {
      td.classList.remove("unread");
      td.classList.add("read");
      td.textContent = "yes";
    }
  });
}

function handleDelete(card) {
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.textContent = "delete";

  deleteBtn.addEventListener("click", () => {
    card.remove();
  });
  card.appendChild(deleteBtn);
}

confirmBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    inputTitle.value &&
    inputAuthor.value &&
    inputPages.value &&
    inputRead.value
  ) {
    addBookToLibrary(
      inputTitle.value,
      inputAuthor.value,
      inputPages.value,
      inputRead.value
    );
    dialog.close();
    form.reset();
  }
  seeBooks();
});
