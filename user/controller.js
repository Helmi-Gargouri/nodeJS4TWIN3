var express = require('express')
var router = express.Router()
const { list, create, update, deleteU ,recherche } = require('./userService')
var validate = require('../middleware/validation')


router.get('/list', list)
router.post('/create/:age',validate, create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteU)
router.get('/nom/:nom', recherche);
router.get('/id/:Id', recherche);
router.get('/email/:Email', recherche);
//router.get('/recherche', recherche)



module.exports = router