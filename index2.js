import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let posts =[];

let lastId = 3;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/posts",(req,res)=>{
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id", (req,res)=>{
  const post = posts.find((p)=>p.id === parseInt(req.params.id));
  
})