var express = require('express')
var router = express.Router()
const { list, create, update, deleteU , searchByPriceRange,socketIO,ordinateurView} = require('./ordinateurService')
var validate = require('../middleware/validation')


router.get('/list', list)
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteU)
router.get('/search', searchByPriceRange)
router.get("/search",socketIO);
router.get('/ordinateur', ordinateurView)





module.exports = router