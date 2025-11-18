import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//to render main page
app.get("/", async (req,res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts`);
    console.log(response);
    res.render("index.ejs",{ posts: response.data });
  } catch (error){
    res.status(500).json({ message: "Error fetching posts"});
  }
});

//to render edited page
app.get("/new", (req,res)=>{
  res.render("modified.ejs",{ heading: "New Post", submit: "Create Post"});
});

app.get("/edit/:id", async (req,res)=>{
  try{
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    console.log(response.data);
    res.render("modify.ejs",{
      heading: "Edit Post",
      submit: "Updated Post",
      post: response.data,
    });
  } catch(error){
    res.status(500).json({ message: "Error fetching post"});
  }
});

//to create a new post
app.post("/api/posts", async (req,res)=>{
  try{
    const response = await axios.post(`${API_URL}/posts`,req.body);
    console.log(response.data);
    res.redirect("/");
  } catch(error){
    res.status(500).json({ message: "Error creating post"});
  }
});

//update a part of the post
app.post("/api/posts/:id", async (req,res)=>{
  console.log("called");
  try{ //response me aa kya rha hai
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`,req.body);
    console.log(response.data);
    res.redirect("/");
  } catch(error){
    res.status(500).json({message: "Error updating post"});
  }
});

//to delete a post
app.get("/api/post/delete/:id", async (req,res)=>{
  try{
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch(error){
    res.status(500).json({ message: "Error deleting post"});
  }
});

app.listen(port,()=>{
  console.log(`Backend server is running on the port: ${port}.`);
});