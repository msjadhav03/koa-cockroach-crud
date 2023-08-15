module.exports = {
  /**
   * Adds Book Entry to database
   * @param {context} context - all request context.
   * @returns {book_entry} Created Book Entry.
   */
  async create(context) {
    try {
      console.log(context.request.body);
      const { book_id, title, summary, author } = context.request.body;
      const query =
        "Insert into books(book_id,title, summary,author,created_at) values(?,?,?,?,?)";
      await context.db.execute(query, [
        book_id,
        title,
        summary,
        author,
        new Date(),
      ]);
      context.body = context.request.body;
    } catch (err) {
      console.log(err);
      context.throw(500, "Failed to insert record", err);
    }
  },

  /**
   * Update Book Entry to database
   * @param {context} context - all request context.
   * @returns {book_entry} Updated Book Entry.
   */
  async update(context) {
    try {
      const book_id = context.params.id;
      const { title, summary, author } = context.request.body;
      console.log(book_id, title, summary, author);
      const query =
        "UPDATE books SET title = ? , summary = ?, author = ? where book_id = ?";
      await context.db.execute(query, [title, summary, author, book_id]);
      context.body = context.request.body;
    } catch (err) {
      console.log(err);
      context.throw(500, "Internal Server Error", err);
    }
  },

  /**
   * Delete ALL Book Entries from database
   * @param {context} context - all request context.
   * @returns {book_entry} Deleted Success Response.
   */
  async delete(context) {
    try {
      const query = "DELETE FROM books where 1=1";
      await context.db
        .execute(query)
        .then((result) => {
          context.body = result;
        })
        .catch((err) => context.throw(500, err));
    } catch (err) {
      console.log(err);
      context.throw(500, "Internal Server Error", err);
    }
  },

  /**
   * Delete Book entry by id
   * @param {context} context - all request context.
   * @returns {book_entry} Success Response.
   */
  async deleteOne(context) {
    try {
      const book_id = context.params.id;
      const query = "DELETE FROM books where book_id = ?";
      await context.db
        .execute(query, [book_id])
        .then((result) => {
          context.body = result;
        })
        .catch((err) => context.throw(500, err));
    } catch (err) {
      context.throw(500, err);
    }
  },

  /**
   * find Book entry by id
   * @param {context} context - all request context.
   * @returns {book_entry} fetched Book Entry.
   */
  async findOne(context) {
    try {
      const book_id = context.params.id;

      const query = "SELECT * FROM books where book_id = ?";
      await context.db
        .execute(query, [book_id])
        .then((result) => {
          context.body = result.rows;
        })
        .catch((err) => {
          context.throw(500, "Internal Server Error", err);
        });
    } catch (err) {
      console.log(err);
      context.throw(500, "Internal Server Error", err);
    }
  },

  /**
   * Find all book entries
   * @param {context} context - all request context.
   * @returns {book_entry} All Book Entries.
   */
  async findAll(context) {
    try {
      const query = "SELECT * from books";
      await context.db
        .execute(query)
        .then((result) => {
          context.body = result.rows;
        })
        .catch((err) => context.throw(500, err));
    } catch (err) {
      context.throw(500, "Internal Server Error", err);
    }
  },
};
