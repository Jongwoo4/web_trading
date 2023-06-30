const express = require('express')
const router = express.Router();
const log = console.log;
require("dotenv").config();
const { Client } = require("@googlemaps/google-maps-services-js");
const client = require("@googlemaps/google-maps-services-js").Client
const GMAPS_API_KEY = process.env.GMAPS_API_KEY;

router.post('/', async (req, res) => {
    const client = new Client();
    client.geocode({
        params: {
            address: req.body.address,
            key: GMAPS_API_KEY
        }

    })
        .then(r => {
            log(r.data);
            const mapinfo = {
                address: r.data.results[0].formatted_address,
                lat: r.data.results[0].geometry.location.lat,
                lng: r.data.results[0].geometry.location.lng,
            }
            res.send({ mapinfo })
        })
        .catch(e => {
            log(e);
            res.status(404).send(e);
        });
})

module.exports = router;