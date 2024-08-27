require("dotenv").config();
const express = require("express");
const movieRoutes = require("./routes/movies/movies.js");
 
const connectDB = require("./db/index.js");

const app =new  express(); 
const port = process.env.PORT || 8080;
connectDB(); 

app.use(express.json());
app.use("/movies", movieRoutes);


app.listen(port, () => {
    console.log(`Express app listening at http://localhost:${port}`); 
});


