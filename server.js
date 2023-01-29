const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const uniqid = require("uniqid");
const PORT = 3001;
// const PORT = process.env.PORT || 3001;
const noteData = require("./db/db.json")

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", (req, res) =>
res.sendFile(path.join(__dirname, "public/notes.html"))
);

app.get("/api/notes", (req, res) => {
    res.json(noteData);
});

app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    newNote.id = uniqid();
    noteData.push(newNote);
    fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err) => {
        err ? console.log(err) : res.send(newNote)
    })
});

app.delete("api/notes/:id", (req, res) => {
    const id = req.params.id;
    res.unlink(id, "./db/db.json")
    res.readFile(id, "./db/db.json")
});

app.get("*", (req, res) => 
res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () => {
    console.log("listening at http://localHost:${PORT}");
});