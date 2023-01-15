let myLibrary = [];

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
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

const titleError = document.querySelector('#titleError');
const authorError = document.querySelector('#authorError');
const pagesError = document.querySelector('#pagesError');

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);

form.addEventListener('input', (e) => {
  if (title.validity.valid) {
    titleError.textContent = "";
    titleError.className = "error";
  } else {
    showTitleError();
  }

  if (author.validity.valid) {
    authorError.textContent = "";
    authorError.className = "error";
  } else {
    showAuthorError();
  }

  if (pages.validity.valid) {
    pagesError.textContent = "";
    pagesError.className = "error";
  } else {
    showPagesError();
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!title.validity.valid) {
    showTitleError();
    return;
  }
  
  if (!author.validity.valid) {
    showAuthorError();
    return;
  }
  
  if (!pages.validity.valid) {
    showPagesError();
    return;
  }

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

function showTitleError() {
  if (title.validity.valueMissing) {
    titleError.textContent = "You need the enter the title."
  } else if (title.validity.tooShort) {
    titleError.textContent = `Entered value should be at least ${title.minLength} characters; you entered ${title.value.length}.`
  } else if (title.validity.tooLong) {
    titleError.textContent = `Entered value should be maximum ${title.maxLength} characters; you entered ${title.value.length}.`
  }

  titleError.className = "error active";
}

function showAuthorError() {
  if (author.validity.valueMissing) {
    authorError.textContent = "You need the enter the name of the author."
  } else if (author.validity.tooShort) {
    authorError.textContent = `Entered value should be at least ${author.minLength} characters; you entered ${author.value.length}.`
  } else if (author.validity.tooLong) {
    authorError.textContent = `Entered value should be maximum ${author.maxLength} characters; you entered ${author.value.length}.`
  }

  authorError.className = "error active";
}

function showPagesError() {
  if (pages.validity.valueMissing) {
    pagesError.textContent = "You need the enter the number of pages."
  } else if (pages.validity.rangeUnderflow) {
    pagesError.textContent = `Entered value should be at least ${pages.minLength} characters; you entered ${pages.value}.`
  } else if (pages.validity.rangeOverflow) {
    pagesError.textContent = `Entered value should be maximum ${pages.maxLength} characters; you entered ${pages.value}.`
  }

  pagesError.className = "error active";
}
