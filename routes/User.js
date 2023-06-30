const express = require('express')
const router = express.Router();

const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const log = console.log;

const { User } = require("../models/User");

function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
    return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

//POST the user 
router.post('/', (req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	if(!req.body.userName){
		res.status(400).send({success: false, message: "no username"})
		return;
	}
	else if(!req.body.password){
		res.status(400).send({success: false, message: "no password"})
		return;
	}

	bcrypt.genSalt(saltRounds, function(err, salt) {
		bcrypt.hash(req.body.password, salt, function(err, hash) {
			// Store hash in your password DB.
			const user = new User({
				email: req.body.email,
				userName: req.body.userName,
				avatarImg: "",
				avatarId: "",
				password: hash,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				isAdmin: false,
				metadata: "",
			})
			
			User.findOne({ 'userName': req.body.userName }).then(function (person) {
				if(person){
					res.status(400).send({success: false, message: "taken username"})
					return;
				}
				else{
					user.save().then((result) => {
						res.send({success: true, result: result})
						return;
					})
				}
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
		});
	});


})

// GET a users information using their username
router.get('/getbyusername', (req, res) => {
	const username = req.body.username;

	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	User.findOne({ userName: username }).then((user) => {
		res.send({ user }) 
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

router.get("/logout", (req, res) => {
    // Remove the session
	console.log("logout")
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send({success: true})
        }
    });
});

router.get('/check-session', (req, res) => {
    if (req.session.userID) {
        res.send({ userID: req.session.userID, userName: req.session.userName, isAdmin: req.session.isAdmin });
    } else {
        res.status(401).send();
    }

})

router.post('/login', (req, res) => {
	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	User.findOne({ 'userName': req.body.userName }).then(function (user) {
		if(user){
		bcrypt.compare(req.body.password, user.password, function(err, result) {
			if (result){
					req.session.userID = user._id;
            		req.session.userName = user.userName; 
					req.session.isAdmin = user.isAdmin;
					res.send({success: true, user:user})
			} else {
			  return res.send({success: false, message: 'invalid login'});
			}
		  })
		}
		else{
			return res.send({success: false, message: 'invalid login'});
		}
		})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

// GET all users
router.get('/allusers', async(req, res) => {
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  

	try{
        const allPosts = await User.find()
        res.send(allPosts)
    } catch(error){
        log(error)
        res.status(500).send("Internal sever error")
    }

})

//GET the user 
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

	User.findById(id).then((user) => {
		res.send({ user }) 
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})

//PATCH the user 
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
	User.findById(id).then((user) => {
			user.email = req.body.email ? req.body.email : user.email;
			user.firstName = req.body.firstName ? req.body.firstName : user.firstName;
			user.lastName = req.body.lastName ? req.body.lastName : user.lastName;
			user.avatarImg = req.body.avatarImg? req.body.avatarImg: user.avatarImg;
			user.avatarId = req.body.avatarId? req.body.avatarId: user.avatarId;

			if(req.body.password){
				bcrypt.genSalt(saltRounds, function(err, salt) {
					bcrypt.hash(req.body.password, salt, function(err, hash) {
						user.password = hash
						user.save().then((result) => {
							res.send({user})
						})
					})
				});
			}
			else{
				user.save().then((result) => {
					res.send({user})
				})
			}
	})
	.catch((error) => {
		log(error)
		res.status(500).send("Internal Server Error")
	})

})
  
  module.exports = router;