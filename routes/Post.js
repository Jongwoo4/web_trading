const express = require('express')
const router = express.Router();

const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');
// const PostModel  = require("../models/Post");

// const Post = PostModel(mongoose);
const {Post} = require("../models/Post.js")

const log = console.log;

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

//POST the post 
router.post('/', (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	const post = new Post({
        userName: req.body.userName,
        postName: req.body.postName,
        postDescription: req.body.postDescription,
        postImg: req.body.postImg,
		postImgId: req.body.postImgId,
        likes: 0,
        dislikes: 0,
        listingAddress: req.body.listingAddress,
	})

	post.save().then((result) => {
		res.send(result)
	}).catch((error) => {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	})

})

// GET all posts made by all users
router.get('/allposts', async(req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try{
        const allPosts = await Post.find()
        res.send(allPosts)
    } catch(error){
        log(error)
        res.status(500).send("Internal sever error")
    }

})

// PATCH the number of likes a post has
router.patch('/updatelikes', async(req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error mongo')
		return;
	}
	try{
		// TODO: implement functionality to un-like a post 
		const id = req.body.id;
		const aPost = await Post.findById(req.body.id)
		const likes = aPost.likes + 1;
		await Post.findByIdAndUpdate({_id: id}, {likes: likes})
		Post.findById(req.body.id).then((post) => {
			res.send({ post }) 
		})

	}  catch(error){
        log(error)
        res.status(500).send("Internal sever error")
    }
})

// PATCH the number of dislikes a post has
router.patch('/updatedislikes', async(req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error mongo')
		return;
	}
	try{
		const id = req.body.id;
		const aPost = await Post.findById(req.body.id)
		const dislikes = aPost.dislikes + 1;
		await Post.findByIdAndUpdate({_id: id}, {dislikes: dislikes})
		Post.findById(req.body.id).then((post) => {
			res.send({ post }) 
		})

	}  catch(error){
        log(error)
        res.status(500).send("Internal sever error")
    }
})

//GET the post 
router.get('/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	Post.findById(id).then((post) => {
		res.send({ post }) 
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

//GET the post 
router.get('/byUser/:username', (req, res) => {
	const username = req.params.username
	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	Post.find({ 'userName': username }).then(function (datas) {
			res.send(datas)
	}).catch((error) => {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
			return;
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
			return;
		}
	})

})

//PATCH the post 
router.patch('/:id', (req, res) => {
	const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return;  // so that we don't run the rest of the handler.
	}

	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	Post.findById(id).then((post) => {
            post.postName = req.body.postName ? req.body.postName : post.postName;
			post.postImg = req.body.postImg ? req.body.postImg : post.postImg;
			post.postImgId = req.body.postImgId ? req.body.postImgId : post.postImgId;
			post.postDescription = req.body.postDescription ? req.body.postDescription : post.postDescription;
			post.listingAddress = req.body.listingAddress ? req.body.listingAddress : post.listingAddress;

			post.save().then((result) => {
				res.send({result})
			})
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

// DELETE a post
router.delete('/:id', async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
		res.status(404).send()
		return;
	}
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    try {
        const delPost = await Post.findOneAndDelete({ _id: req.params.id })
        res.send(delPost) // verify deleted post for testing purposes
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})
  
  module.exports = router;