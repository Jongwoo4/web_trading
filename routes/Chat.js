const express = require('express')
const router = express.Router();

const { mongoose } = require('../db/mongoose');
const { Chat }  = require("../models/Chat");

const log = console.log;

//TODO: need to check for current logged in user

const createNewChat = async (user1, user2) => {
    const chat = new Chat ({
        personOne: user1,
        personTwo: user2,
        messages: []
    });

    try {
        const newChat = await chat.save();
        return Promise.resolve(newChat);
    } catch {
        return Promise.reject();
    }
    
}

const sendMessage = async (senderUsername, recipientUsername, messageContents) => {
    let chat = await Chat.findChatsBetweenUsers(senderUsername, recipientUsername);
    if (!chat) {
        chat = await createNewChat(senderUsername, recipientUsername);
        //log(chat)
    }

    return chat.addMessage(senderUsername, messageContents);
}

// middleware for mongo connection error for routes that need it
const mongoChecker = (req, res, next) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection');
		res.status(500).send('Internal server error');
		return;
	} else {
		next();
	}	
}

//middleware for checking if user is logged in
const loggedInChecker = (req, res, next) => {
	if (!req.session.userName) {
		log('Unauthorized Access');
		res.status(401).send('Unauthorized');
		return;
	} else {
		next();
	}
}


function isMongoError(error) { // checks for first error returned by promise rejection if Mongo database suddently disconnects
	return typeof error === 'object' && error !== null && error.name === "MongoNetworkError"
}

//get all chats involving the current logged on user
router.get('/', loggedInChecker, mongoChecker, async (req, res) => {
    try {
        const username = req.session.userName;//req.body.username;
		const chats = await Chat.findChatsWithUser(username);
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

// a POST route send a message
// uses session to get username of logged in user, uses body to get recipient username and message contents
router.post('/', loggedInChecker, mongoChecker, async (req, res) => {
	// log(req.body)

    const ourUsername = req.session.userName;//req.body.username;
    const recipientUsername = req.body.recipient;
    const msgContents = req.body.messageContents;

	try {
		const msg = await sendMessage(ourUsername, recipientUsername, msgContents);
        res.json(msg);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

});

//get all chats involving the current logged on user and another user
router.get('/u/:otherUsername', loggedInChecker, mongoChecker, async (req, res) => {
    try {
        const username = req.session.userName;//req.body.username;
        const otherUsername = req.params.otherUsername;

		const chats = await Chat.findChatsBetweenUsers(username, otherUsername);
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

//get last message from each chat for logged in user (for chat message preview tabs)
router.get('/recent', loggedInChecker, mongoChecker, async (req, res) => {
    try {
        const username = req.session.userName;//req.body.username;

		const chats = await Chat.findChatsWithUser(username);
        
        const recents = [];
        
        for (let i=0; i<chats.length; i++){
            const c = chats[i]
            let lastMsg = "";
            if (c.messages.length > 0) lastMsg = c.messages[c.messages.length-1];

            recents.push({
                username: c.personOne === username? c.personTwo : c.personOne,
                msgContents: lastMsg.msgContents,
                timestamp: lastMsg.when
            });
        }

        res.json(recents);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

//delete all chats involving a certain user (logged in version, for deleting your own account)
router.delete('/', loggedInChecker, mongoChecker, async (req, res) => {
    try {
        const username = req.session.userName;//req.body.username;
		const chats = await Chat.deleteChatsWithUser(username);
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});


//ADMIN ONLY BELOW

// middleware for checking if an adimin is logged in for routes that need it
// USE AFTER CHECKING IF LOGGED IN, OTHERWISE WRONG STATUS CODE IS SENT (403 INSTEAD OF 401)
const adminChecker = (req, res, next) => {
	if (!req.session.isAdmin) {
        log('Forbidden Access');
		res.status(403).send('Forbidden');
		return;
    } else {
		next();
	}	
}

//delete all chats involving a certain user (admin version, for deleting other accounts)
router.delete('/u/:username', loggedInChecker, adminChecker, mongoChecker, async (req, res) => {
    if (!req.session.isAdmin) res.status(403).send("unauthorized");
    try {
        const username = req.params.username;
		const chats = await Chat.deleteChatsWithUser(username);
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

//get all chats
router.get('/all', loggedInChecker, adminChecker, mongoChecker, async (req, res) => {
    try {
		const chats = await Chat.find().sort({updatedAt: 'desc' }).exec();
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

//FOR CONVENIENCE: TODO: DELETE ALL ENDPOINTS BELOW =====================================

//clear chats db
router.delete('/all', loggedInChecker, adminChecker, mongoChecker, async (req, res) => {
    try {
		const chats = await Chat.deleteMany({});
        res.json(chats);
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});

//check session
router.get('/session', (req, res) => {//TODO: remove
    try {
        if (req.session.isAdmin)
        res.json(req.session.isAdmin);
        else 
        res.json("no")
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}
});


module.exports = router;