const { forEach } = require("../../test/fixtures/accounts.fixture");

// returns number of book objects in given array
function getTotalBooksCount(books) {
  return books.length;
}

// returns number of account objects in given array
function getTotalAccountsCount(accounts) {
  return accounts.length;
}

// returns number of books currently checked out
function getBooksBorrowedCount(books) {
  const count = books.reduce((result, book) => {
    // check returned value of most recent borrow, add to count if false
    if (book.borrows[0].returned === false) result++;
    return result;
  }, 0)

  return count;
}

// returns array of 5 or fewer objects, containing the name and count of the most common book genres
function getMostCommonGenres(books) {
  const allBookGenres = books.map((book) => book.genre);
  // sort alphabetically so matching genre values are togther (simpler for comparing)
  allBookGenres.sort((genre1, genre2) => (genre1.toLowerCase() > genre2.toLowerCase() ? 1 : -1));
  // add first genre/count manually, to loop and compare to
  const result = [{'name': allBookGenres[0], 'count': 1}];
  // tracks index of genre currently counting in result
  let resultIndex = 0;

  // loop through array of books' genres
  for (let i = 1; i < allBookGenres.length; i++) {
    const genre = allBookGenres[i];

    // compare current genre to the one before it, if matching add to count of current genre in result, if not add new genre object and increase resultIndex to match
    if (allBookGenres[i-1] === genre) {
      result[resultIndex].count++;
    } else {
      result.push({'name': genre, 'count': 1});
      resultIndex++;
    }
  }

  // helper function sorts by count high-low and shortens to 5 or fewer objects
  return topFiveMostPopular(result);
}

// returns array of 5 or fewer objects, containing name and count of most borrowed books
function getMostPopularBooks(books) {
  const result = [];
  
  // loop through books, obtain name and number of borrows, add as object to result
  books.forEach((book) => {
    const name = book.title;
    const borrows = book.borrows;
    const count = borrows.length;

    result.push({name, count});
  });

  // helper function sorts by count high-low and shortens to 5 or fewer objects
  return topFiveMostPopular(result);
}

// returns array containing 5 or fewer objects, containing name and count of authors with most books borrowed
function getMostPopularAuthors(books, authors) {
  const result = [];

  // loop through authors, create name string, filter books to those matching author's id
  authors.forEach((author) => {
    const name = `${author.name.first} ${author.name.last}`;
    const id = author.id;
    const booksByAuthor = books.filter((book) => book.authorId === id);
    let count = 0;

    // loop through books by author, count number of books, add name and count object to result
    booksByAuthor.forEach((book) => count += book.borrows.length);
    result.push({name, count});
  });

  // helper function sorts by count high-low and shortens to 5 or fewer objects
  return topFiveMostPopular(result);
}

// helper function
// sorts an array of objects containing count values by count high-low, returns array of first 5
function topFiveMostPopular(items) {
  items.sort((item1, item2) => item1.count > item2.count ? -1 : 1);
  return items.slice(0,5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
