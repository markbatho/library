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

function renderBooks(container) {
  myLibrary.forEach(book => {
    const row = document.createElement('tr');

    row.innerHTML = `<tr data-title=${book.title}>
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.isRead ? 'Already read' : 'Not read yet'}</td>
    </tr>`;

    container.appendChild(row);
  });
}

const table = document.querySelector('table');
renderBooks(table);
