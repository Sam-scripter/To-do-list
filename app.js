//jshint esversion:6

const express = require("express")
const bodyParser = require("body-parser")

const app = express();

app.set('view engine', 'ejs');

let items = [];
let workItems = [];

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  let today = new Date();

  let options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { ListTitle: day, newListItem: items});






//   var currentDay = today.getDay();
//   var day = "";
// switch (currentDay) {
//   case 0:
//     day = "Sunday"
//     break;
//   case 1:
//     day = "Monday"
//     break;
//   case 2:
//     day = "Tuesday"
//     break;
//   case 3:
//     day = "Wednesday"
//     break;
//   case 4:
//    day = "Thursday"
//    break;
//   case 5:
//    day = "Friday"
//     break;
//   case 6:
//     day = "Saturday"
//     break;
//
//
//   default:
//   console.log("console.error();"+ "Current day is" + currentDay)
// }
//   res.render("list", {kindofDay: day});
// important piece of code you should keep in mind
//   if (currentDay === 6 || currentDay === 0) {
//     // res.send("Yay its the weekend");
//     // res.sendFile(_dirname + "/index.html")
//     // res.write("Yay its the weekend");
//     // res.send();
//     day = "weekend";
//     res.render("list", {kindofDay: day});
//
//   } else {
//     day = "Weekday";
//     // res.send("boo! I have to work");
//     res.render("list", {kindofDay: day});
//   }
//
//   // res.send("Hello");
// });
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if (req.body.list === "work"){
    workItems.push(item);
    res.redirect("/work");
  }else {
    items.push(item);

    res.redirect("/");
  }

  // console.log(item);
});

app.get("/work", function(req, res){
  res.render("list", {ListTitle: "Work List", newListItem: workItems})
});

app.post("/work", function(req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");

});

app.listen(3000, function(){
  console.log("Server started on port 3000");
});
