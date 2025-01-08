import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import langflowRoutes from "./routes/LangFlow.route.js"
import path from "path"
const app=express();

app.use(cors());


app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));


app.use("/api/v1/langflow", langflowRoutes); // Mount the Langflow routes

// app.post('/api/v1/add-post', async (req, res) => {
//   const { type, likes, comments, shares } = req.body;
//   try {
//       await client.execute(
//           'INSERT INTO posts (id, type, likes, comments, shares) VALUES (uuid(), ?, ?, ?, ?)',
//           [type, likes, comments, shares],
//           { prepare: true }
//       );
//       res.status(200).send('Post added successfully!');
//   } catch (err) {
//       res.status(500).send('Error adding post: ' + err.message);
//   }
// });

// app.get('/api/v1/get-posts', async (req, res) => {
//   try {
//       const result = await client.execute('SELECT * FROM posts');
//       res.status(200).json(result.rows);
//   } catch (err) {
//       res.status(500).send('Error fetching posts: ' + err.message);
//   }
// });


const  _dirname= path.resolve();
if (process.env.NODE_ENV==="production") {
      app.use(express.static(path.join(_dirname, "/frontend/dist")));
      app.get('*', (req, res) => {
      res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  })
} 
else 
{
      app.get("/", (req, res) => {
      res.send("API is Running Successfully");
      });
}




// app.all("*",(req,res,next)=>{
//       res.status(404)
//       res.send("OOPS! page not found")   
// });

export {app}