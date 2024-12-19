var express = require('express')
var router = express.Router()
const { list, productById, productQt, productStock , findbyname} = require('./productService')

router.get('/list', list)
router.get('/details/:id', productById)
router.get('/total/:id/:qt', productQt)
router.get('/stock/:qt', productStock)
router.get('/products/:name',findbyname)


module.exports = router