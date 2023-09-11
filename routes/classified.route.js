const {Router} = require('express')
const { ValidationMiddleware } = require('../middlewares/validation.middleware')
const classifiedRouter = Router()
const jwt = require('jsonwebtoken')
const { ClassifiedModel } = require('../models/classified.model')

classifiedRouter.get('/', async(req,res)=>{
    try{
        let sortit = 0
        let classifieds=null;
        if(req.query.sort){
            if(req.query.sort=='asc') sortit = 1
            else if(req.query.sort=='desc') sortit = -1
            delete req.query.sort
            classifieds = await ClassifiedModel.find(req.query).sort({postedAt:sortit})
        }
        if(req.query.page){
            const {limit,page} = req.query
            console.log(limit,page)
            delete req.query.page
            delete req.query.limit
            if(sortit===1 || sortit===-1){
                classifieds = await ClassifiedModel.find(req.query).sort({postedAt:sortit}).limit(limit*1).skip((page-1)*limit)
            }else{
                classifieds = await ClassifiedModel.find(req.query).limit(1).skip((page-1)*limit)
            }
        }
        if(classifieds==null){
            classifieds = await ClassifiedModel.find(req.query)
        }
        res.send(classifieds)
    }catch(error){
        res.send({err:"No ads to show"})
        console.log(error)
    }
})

classifiedRouter.get('/:name',async(req,res)=>{
    const regex = new RegExp(`^${req.params.name}`, 'i'); 
    const classifieds = await ClassifiedModel.find({name: regex}).limit(1);
    res.send(classifieds)
})

classifiedRouter.delete('/:classifiedID',async(req,res)=>{
    const classified = await ClassifiedModel.findOne({_id:req.params.classifiedID})
    if(classified){
        await ClassifiedModel.deleteOne({_id:req.params.classifiedID})
        res.send({success:"ad deleted successfully"})
    }else{
        res.send({err:"ad not found"})
    }
})

classifiedRouter.use(ValidationMiddleware)

classifiedRouter.post('/create',(req,res)=>{
    const classified = new ClassifiedModel(req.body)
    classified.save()
    res.send("ad posted successfully")
})

classifiedRouter.put('/:classifiedID',async(req,res)=>{
    const classified = await ClassifiedModel.findOne({_id:req.params.classifiedID})
    if(classified){
        await ClassifiedModel.findOneAndUpdate({_id:req.params.classifiedID},req.body)
        res.send("ad updated successfully")
    }else{
        res.send("No such ad to update")
    }
})

module.exports = {classifiedRouter}