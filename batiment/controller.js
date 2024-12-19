var express = require('express')
var router = express.Router()
const { list, create, update, deleteU} = require('./batimentService')
var validate = require('../middleware/validation')


router.get('/list', list)
router.post('/create', create)
router.put('/update/:id', update)
router.delete('/delete/:id', deleteU)


module.exports = router