const Koa = require("koa");
const Router = require("koa-router");
const Parser = require("koa-parser");
const router = require("./routes");
const db = require("./database/DatabaseConnection");
const PORT = 4000;
const app = new Koa();
try {
  app.use(Parser());
  app.context.db = db;
  console.log(`context ${app.context.toString()} \nurl : ${app.context}`);
  app.use(router.routes());
  app.listen(PORT);
  console.log(`Server is running on port ${PORT}`);
} catch (err) {
  app.context.throw(500, "Internal Server Error", err);
}
