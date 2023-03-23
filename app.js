const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
const port = 3000;

app.set('view engine', 'ejs'); //It tells our program to use EJS since there are other templates libraries as well
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public")); //This defines where our server searches for the static files

const items = ["Make this website work"];
const workItems = [];
//Essentially we have an initial fetch through the get, then after posting a new item, we add them, and redirect the server which acts as another get request to display the new values. Hence, we perform a get, post, and get to pass data from website to the server

app.get("/", (req, res) => {

    let day = date.getDate();

    res.render("list", {listTitle: day, newListItems: items});

});

app.post("/", function (req, res) {

    const item = req.body.newItem;

    if (req.body.list === "Work") { //Our form has a post method to the / which is why we need to handle the different post requests
        workItems.push(item);
        res.redirect("/work"); //We redirect to the corresponding tab after posting
    } else {
        items.push(item);
        res.redirect("/"); //After each post we basically perform a get operation that allows the new items to be displayed
    }

   //console.log(item);
})

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", (req, res) => {

    const workItem = req.body.newItem;
    workItems.push(workItem);
    res.redirect("/work");
    //console.log(workItem);

});

app.listen(port, () => {
    console.log("Server started on port 3000");
});
