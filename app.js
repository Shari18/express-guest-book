var http = require('http');
var path = require('path');
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
/* Instantiate express */
var app = express();

/* set view path and view engine to 'ejs'(embedded javascript)*/
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

var entries = [];
/* Makes this entries array available in all views*/
app.locals.entries = entries;

/* Uses Morgan to log every request*/
app.use(logger("dev"));
/* Populates a variable called req.body if the user is submitting a form. (The extended option is required.)*/
app.use(bodyParser.urlencoded({extended: false}));
/* Render the home page*/
app.get("/", function (req, res) {
    res.render("index");
});
/* Render the new entry page */
app.get('/new-entry', function (req, res) {
    res.render("new-entry");
});
/* post new entry */
app.post("/new-entry", function (req, res) {
    if (!req.body.title || !req.body.body) {
        res.status(400).send("Entries must have a title and a body.");
        return;
    }
    entries.push({
        title: req.body.title,
        content: req.body.body,
        published: new Date()
    });
    res.redirect("/");
});

app.use(function (req, res) {
    res.status("404").render("404");
});

http.createServer(app).listen(3000, function () {
    console.log("Guestbook app started on port 3000.");
});

