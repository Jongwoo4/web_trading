const express = require('express')
const router = express.Router();

const { ObjectID } = require('mongodb')
const { mongoose } = require('../db/mongoose');

const { Report } = require("../models/Reports.js")
const { Post } = require("../models/Post.js")

require("dotenv").config();
const BASE_URL = process.env.BASE_URL;
const API_PORT = process.env.API_PORT;
const FRONTEND_PORT = process.env.FRONTEND_PORT;

const log = console.log;

//POST the report
router.post('/', (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    const report = new Report({
        title: `${BASE_URL}:${API_PORT}/post/${req.body.postId}`, // TODO: should change this later to post link
        user: req.body.user,
        reportType: req.body.reportType,
        postId: req.body.postId,
    })

    report.save().then((result) => {
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

// GET all reports made by users
router.get('/', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    try {
        const allReports = await Report.find()
        res.send(allReports)
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }

})

// DELETE  a report
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
        const delReport = await Report.findOneAndDelete({ _id: req.params.id })
        res.send(delReport) // verify deleted post for testing purposes
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

// DELETE  all reports with same post id
router.delete('/report/:id', async (req, res) => {
    const id = req.params.id

	if (!ObjectID.isValid(id)) {
		res.status(404).send()
		return; 
	}
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }
    try {
        const report = await Report.findById(id)
        if (!report) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
           const delReport = await Report.deleteMany({postId: report.postId})
            res.send(delReport) // verify deleted post for testing purposes 
		}
        
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }
})

//get all the post listed in the report pages
router.get('/reports', async (req, res) => {
    if (mongoose.connection.readyState != 1) {
        log('Issue with mongoose connection')
        res.status(500).send('Internal server error')
        return;
    }

    try {
        const allReports = await Report.find()
        const result = []
        for(let i = 0; i< allReports.length; i++){
            result.push(await Post.findById(allReports[i].postId))
        }
        res.send(result)
    } catch (error) {
        log(error)
        res.status(500).send("Internal sever error")
    }

})
module.exports = router;