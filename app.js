let myLibrary = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function renderBooks(container) {
  removeAllChildren(container);

  myLibrary.forEach(book => {
    const row = document.createElement('tr');

    const titleTd = document.createElement('td');
    const authorTd = document.createElement('td');
    const pagesTd = document.createElement('td');
    const isReadTd = document.createElement('td');
    const actionsTd = document.createElement('td');

    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');

    titleTd.textContent = book.title;
    authorTd.textContent = book.author;
    pagesTd.textContent = book.pages;
    isReadTd.textContent = book.isRead ? 'Already read' : 'Not read yet';

    readBtn.textContent = 'Read';
    removeBtn.textContent = 'Remove';
    
    readBtn.addEventListener('click', function() {
      book.isRead = !book.isRead;
      isReadTd.textContent = book.isRead ? 'Already read' : 'Not read yet';
    });

    removeBtn.addEventListener('click', function(e) {
      for (let item of myLibrary) {
        if (book.title === item.title) {
          const index = myLibrary.indexOf(item);
          myLibrary.splice(index, 1);
          container.removeChild(row);
        }
      }
    });

    actionsTd.appendChild(readBtn);
    actionsTd.appendChild(removeBtn);

    row.appendChild(titleTd);
    row.appendChild(authorTd);
    row.appendChild(pagesTd);
    row.appendChild(isReadTd);
    row.appendChild(actionsTd);

    container.appendChild(row);
  });
}

const tableBody = document.querySelector('tbody');
renderBooks(tableBody);

const overlay = document.querySelector('#overlay');
const modal = document.querySelector('#modal');
const openModalBtn = document.querySelector('#open-modal');
const closeModalBtn = document.querySelector('#close-modal');
const form = document.querySelector('form');

const title = document.querySelector('#title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#status');

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  for (let item of myLibrary) {
    if (title.value === item.title) {
      alert('Book already added to library!');
      return;
    }
  }
  const book = new Book(title.value, author.value, pages.value, readStatus.checked);
  addBookToLibrary(book);
  renderBooks(tableBody);
});

function openModal() {
  overlay.classList.add('show');
  modal.classList.add('show');
}

function closeModal() {
  overlay.classList.remove('show');
  modal.classList.remove('show');
}

function removeAllChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
