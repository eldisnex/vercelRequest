// const express = require("express");
// const app = express();
// const writeInPage = require("./notion");

// app.get("/", (req, res) => {
//   const type = req.query.type;
//   const text = req.query.text;
//   writeInPage(type, text).then((stat) => {
//     res.json({ status: stat });
//   }); // type, text  ->  Both strings
// });

// app.listen(3000, () => {
//   console.log("Servidor escuchando en el puerto 3000");
// });

const functions = require("firebase-functions");
const writeInPage = require("./notion");

// Crea una función HTTP utilizando Firebase Functions
exports.app = functions.https.onRequest((req, res) => {
  const type = req.query.type;
  const text = req.query.text;

  writeInPage(type, text).then((stat) => {
    res.json({ status: stat });
  }); // type, text  ->  Both strings
});
