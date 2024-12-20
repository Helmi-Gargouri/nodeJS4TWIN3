var express = require('express')
var userRouter = require('./user/controller')
var chatRouter = require('./chat/controller')
var batimentRouter = require('./batiment/controller')
var osRouter = require('./os/controller')
var productRouter = require('./product/controller')
var ordinateurRouter = require('./ordinateur/controller')
var mongoose = require('mongoose')
var { socketIO } = require('./chat/chatService')
var path = require('path')
var app= express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');
app.use(express.json())
app.use('/users', userRouter)
app.use('/chats', chatRouter)
app.use('/batiments', batimentRouter)
app.use('/os', osRouter)
app.use('/products', productRouter)
app.use('/ordinateurs', ordinateurRouter)
mongoose.connect('mongodb://localhost:27017/user-db')
        .then(()=>{
            console.log('DB connected !');            
        })
        .catch((error)=>{
            console.log("error : "+ error);
        })
var http = require('http')
var server = http.createServer(app)
const io = socketIO(server)
server.listen(3000,()=>{
    console.log('server started !');
})