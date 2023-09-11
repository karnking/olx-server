const ValidationMiddleware = (req,res,next) =>{
    const {name,description,category,image,location,postedAt,price} = req.body
    if(!name || typeof name != "string" || !description || typeof description!="string" || !location || typeof location !="string" || !category || typeof category!="string" || !image || typeof image!="string", !price || typeof price!='string'){
        res.status(400).send({err:"data is incorrect"})
    }else{
        next()
    }
}
module.exports = {ValidationMiddleware}