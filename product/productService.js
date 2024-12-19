const products = require('./products.json')

const list = (req, res, next)=>{
    res.json(products)
}

const productById = (req, res, next)=>{
    res.json(products[req.params.id])
}

const productQt = (req, res, next)=>{
    const { id, qt } = req.params
    res.json({
        "id": id,
        "qt": qt,
        "unit_price": products[req.params.id].price,
        "total_price": products[req.params.id].price * qt
    })
}

const productStock = (req, res, next)=>{
    let productsInStock=[]
    const { qt } = req.params
    for(let id in products){
        console.log(products[id]);
        if(products[id].stock > qt){
            productsInStock.push(products[id])
        }
    }
    res.json(productsInStock)}

const findbyname = (req, res, next)=>{
        try {
          const name = req.params.name;
          const products =  Product.find({
            name: { $regex: name, $options: 'i' }
          });
          res.json(products);
        } catch (err) {
          res.status(500).json({ error: err.message });
        }
};    

module.exports = { list, productById, productQt, productStock , findbyname}