const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uniqid = require("uniqid");
const PORT = process.env.PORT || 3001;
const noteData = require(".db/db.json")

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "public/notes.html"))
);