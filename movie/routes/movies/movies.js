const express = require("express");
const router = express.Router();
const Movie = require("../../db/schemas/moviesschema");

router.get("/", async (req, res) => {
    const queryparams=req.query;
    const filters={};
    if(queryparams.name){
        filters.name={
            $regrex: `^${queryparams.name}`,
            $options:"i",
        
        };
    }
    if(queryparams.rating) {
        filters.rating={
            $gte: parseFloat (queryparams.rating),
        };
    }
    
        const movies = await Movie.find();
        res.json(movies);
});
     




router.post("/", async (req, res) => {
    try {
        const moviesData = req.body;
        const newMovie = new Movie(moviesData);
        await newMovie.save();
        res.json({ message: "Movie added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const updatedMovieData = req.body;
        await Movie.findByIdAndUpdate(movieId, updatedMovieData);
        res.json({ message: "Movie updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        await Movie.findByIdAndDelete(movieId);
        res.json({ message: "Movie deleted successfully" });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
router.get("/:id",async(req,res)=>{ 
    try{
        const movieId = req.params.id;
        const getMovieData=req.body;
        await Movie.findById(movieId,getMovieData);
        res.json({
            message: "Movie found",
        });
    }catch(error)
    {
            if(error.kind=="ObjectId"){
                res.status(404).json({message:" movie not found "})}
                else{
                    res.status(500).json({message:"internet server error"})
                }
            }
});
module.exports=router;

