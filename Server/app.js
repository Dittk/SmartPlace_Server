const express = require("express");
const app = express(); // express 서버 연결

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
var db_config = require(__dirname + "/database.js");
var conn = db_config.init();
db_config.connect(conn);

/* localhost:3000/main 접속시 나올 메시지 */
app.get("/", (request, response) => {
  response.send(` <h1>Hello World</h1> <p>This is main page</p> `);
});
/* localhost:3000/ 접속시 나올 메시지 */
app.get("/data", function (req, res) {
  var sql = "SELECT * FROM PRODUCT";
  conn.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else res.render("data.ejs", { list: rows });
  });
});
app.get("/list", function (req, res) {
  var sql = "SELECT * FROM PRODUCT";
  conn.query(sql, function (err, rows, fields) {
    if (err) console.log("query is not excuted. select fail...\n" + err);
    else res.render("list.ejs", { list: rows });
  });
});
app.use((request, response) => {
  response.send(`<h1>Sorry, page not found :(</h1>`);
});
/* 3000포트에서 서버 구동 */
app.listen(3000, () => {
  console.log("localhost:3000 에서 서버가 시작됩니다.");
});
