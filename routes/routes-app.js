const express = require('express');
const {Router} = require('express');
const multer = require('multer');


const routerProducts = Router();


routerProducts.use(express.json());
routerProducts.use(express.urlencoded({extended:true}));

const dataController = require('../controllers/products')

routerProducts.get('/productos', (req, res) => {
     console.log(dataController.getAll())
    res.send(dataController.getAll())
})

routerProducts.get('/productos/:id', (req, res) => {
   res.send(dataController.getById(req.params.id))
})

/*-------------------------------------------------*/

const storage = multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'uploads')
    },
    filename:function(req,file,cb){
        cb(null,`${file.originalname}`)
    }
})
const upload = multer({storage: storage})
/*-------------------------------------------------*/

let finalProd = {};

routerProducts.post('/productos',upload.single('thumbnail'), (req, res,next) => {
    const file = req.file;
    console.log(file.originalname)

    if(!file){
        const error = new Error('please upload a file')
        error.httpStatuscode = 400
        return next(error)
    }
     finalProd = {...req.body,thumbnail: file.path}
    //test.push(finalProd)
    res.send(dataController.save(finalProd))
 })

 routerProducts.put('/productos/:id', (req, res) => {

    res.send(dataController.putData(req.body, req.params.id))
 })
 
 routerProducts.delete('/productos/:id', (req, res) => {

    res.send(dataController.deleteData(req.params.id))
 })

module.exports = routerProducts;