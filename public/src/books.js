// returns author object that matches given id
function findAuthorById(authors, id) {
  const result = authors.find((author) => author.id === id);
  return result;
}

// returns book object that matches given id
function findBookById(books, id) {
  const result = books.find((book) => book.id === id);
  return result;
}

// returns array containing two arrays: first of all books currently checked out, second of books currently returned
function partitionBooksByBorrowedStatus(books) {
  const borrowed = [];
  const returned = [];

  // loop through books, check if most recent borrow has been returned, add to returned array if true or add to borrowed array if false
  books.forEach((book) => {
    const borrowStatus = book.borrows[0].returned;
    borrowStatus ? returned.push(book) : borrowed.push(book);
  });

  // add both arrays into final array
  const result = [borrowed, returned];
  return result;
}

// returns array of 10 or fewer account objects that match those listed in the given book's borrows, with returned status added to account object
function getBorrowersForBook(book, accounts) {
  const borrows = book.borrows;
  const result = [];

  // loop through (up to 10 of) book's borrows, find account that matches id, add returned status as key/value pair, add account object to array
  for (let i = 0; i < borrows.length && i < 10; i ++) {
    const id = borrows[i].id;
    const returned = borrows[i].returned;
    const account = accounts.find((account) => account.id === id);
    account['returned'] = returned;
    result.push(account);
  }

  return result;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
