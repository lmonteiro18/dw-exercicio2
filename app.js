 //--------------------------------------------MODULES AND APP SETUP--------------------------------------------
 const express = require("express");
 const ejs = require("ejs");
 const bodyParser = require("body-parser");
 const mongoose = require("mongoose");

 const app = express();
 app.set("view engine", "ejs");
 app.use(bodyParser.urlencoded({
   extended: true
 }));
 app.use(express.static("public"));

 mongoose.connect("mongodb://localhost:27017/dotsDB");


 //--------------------------------------------GET LANDING PAGE ROUTE--------------------------------------------
 app.get("/home", function(req, res) {
   res.render("index", {});
 });

 //--------------------------------------------GET MAIN ROUTE--------------------------------------------
 app.get("/", function(req, res) {
   res.render("landing", {});
 });

 //--------------------------------------------GET PROJECT ROUTE--------------------------------------------
 app.get("/projetos/:projeto", function(req, res) {
   let tituloProjeto = req.params.projeto;
   res.render("projeto", {
     tituloProjeto: tituloProjeto
   });
 });



 //--------------------------------------------PORTS AND APP LISTEN--------------------------------------------
 let port = process.env.PORT;
 if (port === undefined || port === "") {
   port = 3000;
 }

 app.listen(port, function() {
   console.log("Server is up and running on port " + port + ".");
 });
