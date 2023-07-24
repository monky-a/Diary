import express from 'express';
import bodyp from "body-parser";
import lodash from "lodash";
import mongoose from "mongoose";
const app = express();
import dotenv from "dotenv";
dotenv.config();
const url = "mongodb+srv://monk:kFGNhwyCK6WN9C9t@cluster0.yrssfds.mongodb.net/Diary?retryWrites=true&w=majority";


mongoose.connect(url).then(() => {
  console.log("connection made")
}).catch((err) => {
console.log("Connect error:" + err)
});

const scheme = mongoose.Schema;
const schema = new scheme({
  title: String,
  content: String,
  titulo: String
});
const List = mongoose.model("Blog", schema);

const homecontent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas laoreet orci tincidunt pretium placerat. Cras auctor ultrices volutpat. Aliquam ut posuere tellus. Phasellus dapibus et quam nec accumsan. Nullam vel lorem quis nibh malesuada ornare et non nulla. Ut facilisis felis dictum tellus malesuada, at porta sapien vehicula. Nam id lobortis nisi. Aenean mauris urna, ornare a neque id, tempor iaculis ligula.";
const aboutcontent =
  "Donec sed iaculis elit. Cras non urna tortor. Sed ac justo nec velit efficitur commodo. Fusce felis elit, scelerisque ac dolor vel, accumsan tempor orci. Nulla dignissim ligula ut auctor volutpat. Morbi ac imperdiet ligula. Fusce condimentum, magna vitae volutpat euismod, diam lorem pellentesque dui, ut molestie tortor lorem non leo. Ut non iaculis metus, sed ullamcorper ipsum. Mauris tincidunt viverra risus, ultrices ornare felis varius at. Nam a eleifend massa. Maecenas ut augue pulvinar, pellentesque tortor sit amet, efficitur nulla.";
const contactcontent =
  "Proin posuere, felis vel ornare ullamcorper, nulla ligula tempor libero, eget egestas neque mi ac turpis. Nunc tristique, mauris nec consectetur molestie, leo urna varius odio, nec venenatis elit lorem eget tellus. Nulla rhoncus risus vitae auctor vestibulum. Aliquam id ligula eget tellus consequat iaculis nec vitae mauris. Etiam aliquam efficitur justo, a hendrerit nulla. Integer nec felis massa. Pellentesque malesuada at elit in dictum. Fusce mauris sem, pellentesque at lacus eu, maximus posuere est. Etiam egestas magna ipsum, vel ullamcorper sapien bibendum sed.";

app.set("view engine", "ejs");
app.use(bodyp.urlencoded({ extended: true }));
app.use(express.static("public"));
 




app.get('/', async function(req, res){
  var z = await List.find({});
  res.render("home", {homecontent: homecontent, post: z});
});

app.get('/about', function(req, res){
  res.render("about", { homecontent: aboutcontent });
});

app.get('/contact', function(req, res){
  res.render("contact", { homecontent: contactcontent });
});

app.get('/compose', function(req, res){
  res.render("compose");
});

app.get("/posts/:title", async function(req, res){
  var title = (req.params.title);
  var z = await List.find({});
  z.forEach(function (eve){
    if(lodash.lowerCase(title) == lodash.lowerCase(eve.title)) {
      var heading = eve.title;
      var content = eve.content;
      res.render("post", { heading: heading, content: content});
    }
  });
});

app.post("/compose", async function(req, res){
  var e = req.body.title;

  var a = e.split(" ");
  var b = a.join("-");
  var c = "/posts/" + b;
  var compose = new List({
    title: req.body.title,
    content: req.body.content,
    titulo: c
  });
  await List.insertMany(compose);
  res.redirect("/");
}); 



app.listen(3000, function () {
  console.log("server up");
});
