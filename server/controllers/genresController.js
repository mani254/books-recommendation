const Genre = require('../schema/genre');


const genresContoller = {
   async getGenres(req, res) {
      try {
         const genres = await Genre.find({})
         return res.status(200).json({ genres, message: "genres fetched succesfully" })
      }
      catch (err) {
         console.error("Error fetching generes:", err);
         res.status(500).json({ message: "Internal server error", error: err.message });
      }
   }
}

module.exports = genresContoller