const express = require("express");
const mysql = require("mysql");
const bodiParser = require("body-parser");

const app = express(); //menjalankan fungsi express js
//body parser untuk memparsing informasi yang ada dalam url
app.use(bodiParser.urlencoded({ extended: false }));
app.use(bodiParser.json());

//koneksi mysql
const connection = mysql.createConnection({
  host: "localhost",
  root: "root",
  password: "",
  database: "pemweb5",
});

//informasi koneksi atau tidak mysqlnya
connection.connect((err) => {
  if (err) {
    console.error("Terjadi kesalahan dalam koneksi ke MySQL", err.stack);
    return;
  }
  console.log("Koneksi MySQL berhasil dengan id" + connection.threadId);
});

//sebagai routing menyaksikan informasi kemana route app.js membuka file (create, read, update, delate)
app.set("view engine", "ejs");

//READ
app.get("/", (req, res) => {
  //slash menandakan halaman paling awal(www.sik/home)
  const query = "SELECT * FROM user";
  connection.query(query, (err, results) => {
    res.render("index", { user: results });
  });
});

app.listen(3000, () => {
  console.log(
    "Server berjalan di port 3000, buka web melalui http://localhost:3000"
  );
});

//create/input/insert
app.post("/add", (req, res) => {
  const { name, email, phone } = req.body;
  const query = "INSERT INTO user (name, email, phone) VALUES (?,?,?)";
  connection.query(query, [name, email, phone], (err, result) => {
    if (err) throw err;
    res.redirect("/");
  });
});
