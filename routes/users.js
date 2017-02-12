const express = require('express');
const router = express.Router();
const Hypixel = require('./../src/Hypixel');
const HypixelTransformer = require('./../src/HypixelTransformer');

const fetch = require('node-fetch');

const token = process.env.API_KEY;

const hypixel = new Hypixel(token, fetch);
const transformer = new HypixelTransformer(hypixel);

router.get('/:userId', (req, res, next) => {
    const {userId} = req.params;

    hypixel.getPlayerByUuid(userId)
        .then(player => {

            transformer.player(player)
                .then(transformedPlayer => res.send(transformedPlayer));

        });
});

router.get('/:userId/game', function (req, res, next) {
    const {userId} = req.params;

    hypixel.getSession(userId)
        .then(session => {
           transformer.session(session)
               .then(transformedSession => res.send(transformedSession));

        })
});

module.exports = router;
