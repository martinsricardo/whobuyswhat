const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let list = [];
let editSelection = [];

app.get("/", (req, res) => {
  let title = "Who Buys What";

  res.render("list", {
    title: title,
    list: list,
    editNum: editSelection,
  });
});

app.get("/edit", (req, res) => {
  let query = list[editSelection];
  res.render("edit", {
    query: query,
  });
});

app.post("/edit", (req, res) => {
  let updateBuyer = req.body.updateBuyer;
  let updateItem = req.body.updateItem;
  let index = editSelection;
  list[index].item = updateItem;
  list[index].buyer = updateBuyer;
  res.redirect("/");
});

app.post("/", (req, res) => {
  let editNumber = req.body.edit;
  let deleteNumber = req.body.delete;

  if (deleteNumber >= 0) {
    list.splice(deleteNumber, 1);
  } else if (editNumber >= 0) {
    editSelection = [];
    editSelection.push(req.body.edit);
    res.redirect("/edit");
    return true;
  } else {
    let item = req.body.newItem;
    let buyer = req.body.buyer;
    let shop = {
      item: item,
      buyer: buyer,
    };

    list.push(shop);
  }

  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
