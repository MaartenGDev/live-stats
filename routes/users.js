const express = require('express');
const router = express.Router();
const Hypixel = require('./../src/Hypixel');
const HypixelTransformer = require('./../src/HypixelTransformer');

const fetch = require('node-fetch');

const token = process.env.API_KEY;

const hypixel = new Hypixel(token, fetch);
const transformer = new HypixelTransformer();

router.get('/:userId', (req, res, next) => {
    const { userId } = req.params;

    hypixel.getPlayerByUuid(userId)
        .then(player => {
            const customPlayer = transformer.player(player);

            res.send(customPlayer)
        });
});

router.get('/:userId/game', function (req, res, next) {
    const { userId } = req.params;

    hypixel.getSession(userId)
        .then(session => {
            const customSession = transformer.session(session);

            res.send(customSession)
        })
});

module.exports = router;
