const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let list = [];

app.get("/", (req, res) => {
  title = "Who Buys What";
  res.render("list", { title: title, list: list });
});

app.post("/", (req, res) => {
  let editNumber = req.body.edit;
  let deleteNumber = req.body.delete;

  if (deleteNumber >= 0) {
    list.splice(deleteNumber, 1);
  } else if (editNumber >= 0) {
    console.log(list);
    var fieldEdit = list[editNumber].item;
    console.log(fieldEdit);
  } else {
    var item = req.body.newItem;
    var buyer = req.body.buyer;
    var shop = {
      item: item,
      buyer: buyer,
    };

    list.push(shop);
    toString = JSON.stringify(list);
    console.log("String list : " + toString);
    console.log("shop: " + list);
  }

  res.redirect("/");
});

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`);
});
