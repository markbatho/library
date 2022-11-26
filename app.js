let myLibrary = [
  {
    title: 'How to play the guitar',
    author: 'Carlos Santana',
    pages: 257,
    isRead: true
  },
  {
    title: 'Placeholder Book',
    author: 'Someone Johnson',
    pages: 128,
    isRead: false
  },
  {
    title: 'Random Title',
    author: 'John Doe',
    pages: 470,
    isRead: true
  },
  {
    title: 'Hey Joe!',
    author: 'Jane Doe',
    pages: 111,
    isRead: true
  },
];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function resetBooks(container) {
  container.innerHTML = null;
}

function renderBooks(container) {
  myLibrary.forEach(book => {
    const row = document.createElement('tr');
    row.dataset.title = book.title;
    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.isRead ? 'Already read' : 'Not read yet'}</td>
    `;
    container.appendChild(row);
  });
}

// const table = document.querySelector('table');
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
  const book = new Book(title.value, author.value, pages.value, readStatus.checked);
  addBookToLibrary(book);
  resetBooks(tableBody);
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

// Add new book
// Add remove button
// Add 'read' toggle
