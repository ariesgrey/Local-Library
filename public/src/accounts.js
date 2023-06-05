// returns account object that matches given id
function findAccountById(accounts, id) {
  const result = accounts.find((account) => account.id === id);
  return result;
}

// returns array of account objects sorted alphabetically by last name
function sortAccountsByLastName(accounts) {
  accounts.sort((account1, account2) => (account1.name.last.toLowerCase() > account2.name.last.toLowerCase() ? 1 : -1));
  return accounts;
}

// returns number of times the given account's id appears in any book's 'borrows' array
function getTotalNumberOfBorrows(account, books) {
  let count = 0;

  // loop through books
  for (let i = 0; i < books.length; i++) {
    const bookBorrows = books[i].borrows;

    // loop through borrows within each book, compare id to given account id, and add to count for each match
    for (let j = 0; j < bookBorrows.length; j++) {
      if (bookBorrows[j].id === account.id) count++;
    }
  }
  
  return count;
}

// returns array of book objects (with author information added) currently checked out by the given account
function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  const result = [];
  // helper function adds author information to book objects
  addAuthorsToBooks(books,authors);

  // loop through book objects, isolate the first borrow object
  books.forEach((book) => {
    const newestBorrow = book.borrows[0];

    // compare borrow's id to given account id + check if book is currently checked out, add book object to result if both match
    if (newestBorrow.id === accountId && !newestBorrow.returned) {
      result.push(book);
    }
  });

  return result;
}

// helper function
// returns array of book objects with the matching authors' object included within each book object
function addAuthorsToBooks(books, authors) {
  // loop through book objects, find the author object that matches author id in book object, add author object as new key/value pair
  books.forEach((book) => {
    const authorInfo = authors.find((author) => author.id === book.authorId);
    book['author'] = authorInfo;
  });
  
  return books;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
