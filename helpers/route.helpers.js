module.exports = (hbs) => {
  hbs.registerHelper('additional', (book) => {
      if (book.rating >= 8) {
          return 'success';
      } else if (book.rating >= 5) {
          return 'warning';
      } else {
          return 'danger';
      }
  });
}