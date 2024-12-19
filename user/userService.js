var User = require('./userModel')
async function list(req,res,next){
    await User.find()
              .then((data,err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
    //res.end('User List')
}

const create =async (req,res,next)=>{
    const { nom, email } = req.body 
    console.log(req.body.nom);
    console.log(req.params.age)
    const { age } = req.params
    console.log(req.params);
    await new User({
        nom: nom,
        email: email,
        age: age
    }).save()
      .then((data, err)=>{
          if(err){
              res.status(500).json(err)
            }
            console.log(data);
      })
    
c}

const update = async (req, res, next)=>{
    await User.findByIdAndUpdate(req.params.id, req.body)
              .then((data, err)=>{
                res.json(data)
              })
}

async function deleteU(req, res, next) {
    await User.findByIdAndDelete(req.params.id)
              .then((data, err)=>{
                if(err){
                    res.status(500).json(err)
                }
                    res.status(200).json(data)
              })
}

async function recherche(req, res, next) {
    const { id, nom, email } = req.params; 
    let query = {};
    
    if (id) query._id = id;
    if (nom) query.nom = nom;
    if (email) query.email = email;

    await User.findOne(query)
        .then((data, err) => {
            if (err) {
                return res.status(500).json(err);
            }
            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(data);
        });
}
/*
const recherche = async (req, res) => {
    try {
        const nom = req.params.nom
        
        // Recherche insensible à la casse avec regex
        const users = await User.find({ 
            nom: { $regex: nom, $options: 'i' } 
        })
        
        if (users.length === 0) {
            return res.status(404).json({ message: "Aucun utilisateur trouvé" })
        }
        
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
*/
module.exports = { create, list, update, deleteU, recherche }

