const express = require('express')
const router = express.Router();

const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');

const { Offer } = require("../models/Offer.js")

const log = console.log;

//POST the offer
router.post('/', (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    const offer = new Offer({
        title: req.body.title,
        user: req.body.user, // bidder username
        img: req.body.img,
        imgId: req.body.imgId,
        description: req.body.description,
        postId: req.body.postId,
        tradeWith: req.body.tradeWith,
        tradePostTitle: req.body.tradePostTitle,
    })

    offer.save().then((result) => {
        res.send(result)
    }).catch((error) => {
        log(error)
        if (isMongoError(error)) {
            res.status(500).send('Internal server error')
        } else {
            res.status(400).send('Bad Request')
        }
    })
})

// GET all offers made for all posts
router.get('/', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    try {
        const allOffers = await Offer.find()
        res.send(allOffers)
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

// GET all offers made by a specific user
router.post('/useroffers', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    try {
        const userOffers = await Offer.find({user: req.body.user})
        res.send({offers: userOffers})
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

// GET offers made for a specific post
router.get('/:id', async (req, res) => {
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
        const postOffers = await Offer.find({postId: req.params.id})
        res.send({offers: postOffers})
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

// DELETE an offer by id
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
        const delOffer = await Offer.findOneAndDelete({ _id: req.params.id })
        res.send(delOffer) // verify deleted offer for testing purposes
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

module.exports = router;