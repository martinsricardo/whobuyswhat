const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let list = [];
let editSelection = [];

app.get("/", (req, res) => {
    let title = "Who Buys What";

    res.render("list", {
        title: title,
        list: list,
        editNum: editSelection
    });
});

app.post("/", (req, res) => {

    let editNumber = req.body.edit;
    let deleteNumber = req.body.delete;

    if (deleteNumber >= 0) {
        list.splice(deleteNumber, 1);

    } else if (editNumber >= 0) {
        let editSelection = [];
        let code = req.body.edit ;
        let numberArray = {
            code: code
        };

        editSelection.push(numberArray);
        let toString = JSON.stringify(editSelection);
        console.log("Edit number : " + toString )



    } else {
        let item = req.body.newItem;
        let buyer = req.body.buyer;
        let shop = {
            item: item,
            buyer: buyer,
        };

        list.push(shop);
        //let toString = JSON.stringify(list);
       // console.log("String list : " + toString);
        //console.log("shop: " + list);
    }

    res.redirect("/");
});

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});
