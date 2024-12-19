var Ordinateur = require('./ordinateurModel')
var socketIo = require('socket.io')

/*
function socketIO (server) {
    const io = socketIo(server)
    io.on('connection', (socket)=> {
        console.log(' user connected !');
        socket.broadcast.emit('msg',' a new user is connected !')
    })
    return io ;
} */

// Socket.IO 
function socketIO (server) {

io.on("connection", (socket) => {
    console.log("A user connected");
  
    // Real-time search by category
    socket.on("search categorie", async (query) => {
      if (!query.trim()) {
        socket.emit("search results", []); // Send empty results for empty queries
        return;
      }
  
      try {
        const Ordinateur = require("./models/Ordinateur");
        const results = await Ordinateur.find({
          categorie: new RegExp(query, "i"), // Case-insensitive partial match
        });
        socket.emit("search results", results); // Send results back to the client
      } catch (error) {
        console.error("Error during search:", error.message);
      }
    });
  
    // Notify when a user disconnects
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
}    

async function list(req,res,next){
    await Ordinateur.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('Ordinateur List')
}

const create =async (req,res,next)=>{
    const { modele,categorie,date_fabrication,prix } = req.body 
    console.log(req.body.modele);
    console.log(req.body.categorie);
    console.log(req.body.date_fabrication);
    console.log(req.body.prix);


    console.log(req.params);
    await new Ordinateur({
        modele: modele,
        categorie: categorie,
        date_fabrication: date_fabrication,
        prix: prix
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })

res.json('Ordinateur added ! modele : '+ modele + ' categorie : '+ categorie+ ' date_fabrication : '+ date_fabrication + ' prix : '+ prix)
}

const update = async (req, res, next)=>{
    await Ordinateur.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await Ordinateur.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
              
}


const searchByPriceRange = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    try {
        const ordinateurs = await Ordinateur.find({
            prix: { $gte: minPrice, $lte: maxPrice }
        });
        res.status(200).json(ordinateurs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function ordinateurView(req, res, next) {
    res.render('ordinateur');
}
module.exports = { create, list, update, deleteU,searchByPriceRange,socketIO,ordinateurView}

