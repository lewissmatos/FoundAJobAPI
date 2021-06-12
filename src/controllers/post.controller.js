const Posts = require("../models/post.model")

exports.getAllPosts = async (req, res) =>{
    
    try {
        
        const posts = await Posts.find()
        
        return res.status(200).json({ok:true, data: posts})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}

exports.getPostById = async (req, res) =>{
    
    const {id} = req.params
    try {
        
        const post = await Posts.findById(id)
        
        return res.status(200).json({ok:true, data: post})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}

exports.getPostsByUserLogged = async (req, res) =>{
    
    try {
        
        const posts = await Posts.find( {user: req.user._id} )
        
        return res.status(200).json({ok:true, data: posts})
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}

exports.createPost = async (req, ers) =>{

    const {area, desc, pay, } =req.body
    
    try {
        
        const post = new Post({
            area: area,
            desc: desc,
            pay: pay,
            status:false,
            user: req.user._id
        }) 

        await post.save()

        return res.status(201).json({ok:true, data: post})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}

exports.editPostById = async (req, res) => {

    const {id} = req.params 
    
    try {

        const editedPost = await Posts.findByIdAndUpdate(id)

        return res.status(200).json({ok:true, data: editedPost})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}

exports.deletePostById = async (req, res) => {

    const {id} = req.params 
    
    try {

        const deletedPost = await Posts.findByIdAndDelete(id)

        return res.status(200).json({ok:true, data: deletedPost})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, data: error})
    }
}