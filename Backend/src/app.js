import express from "express"
import cors from "cors"
import langflowRoutes from "./routes/LangFlow.route.js"
const app=express();

app.use(cors());


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));


app.use("/api/v1/langflow", langflowRoutes); // Mount the Langflow routes

app.post('/api/v1/add-post', async (req, res) => {
  const { type, likes, comments, shares } = req.body;
  try {
      await client.execute(
          'INSERT INTO posts (id, type, likes, comments, shares) VALUES (uuid(), ?, ?, ?, ?)',
          [type, likes, comments, shares],
          { prepare: true }
      );
      res.status(200).send('Post added successfully!');
  } catch (err) {
      res.status(500).send('Error adding post: ' + err.message);
  }
});

app.get('/api/v1/get-posts', async (req, res) => {
  try {
      const result = await client.execute('SELECT * FROM posts');
      res.status(200).json(result.rows);
  } catch (err) {
      res.status(500).send('Error fetching posts: ' + err.message);
  }
});



app.use("/",(req,res)=>{
  console.log("Hey I am rohan malakar")
  res.send("Hey I am rohan malakar")   
});

app.all("*",(req,res,next)=>{
      res.status(404)
      res.send("OOPS! page not found")   
});

export {app}