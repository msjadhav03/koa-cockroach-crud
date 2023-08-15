const Router = require("koa-router");
const router = new Router();
const BooksController = require("../controllers/books.controller");

router.get("/books", BooksController.findAll);
router.post("/books", BooksController.create);
router.get("/books/:id", BooksController.findOne);
router.delete("/books/:id", BooksController.deleteOne);
router.delete("/books", BooksController.delete);
router.patch("/books/:id", BooksController.update);

module.exports = router;
