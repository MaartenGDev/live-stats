const express = require('express');
const router = express.Router();
const Hypixel = require('./../src/Hypixel');
const fetch = require('node-fetch');

const token = process.env.API_KEY;

const hypixel = new Hypixel(token, fetch);

router.get('/:userId', (req, res, next) => {
    const { userId } = req.params;

    hypixel.getPlayerByUuid(userId)
        .then(player => res.send(player['player']));
});

router.get('/:user/game', function (req, res, next) {
    const {user} = req.params;
    console.log(user);

    res.send({
        gameType: '',
        server: '',
        players: [
            {
                name: 'Holy_Sheep',
                uuid: '9e859b50b22b43c3b70bbd5b73449094',
                perks: [
                    {name: 'sage', level: 0},
                    {name: 'boss_skills', level: 0},
                    {name: 'chest_protect', level: 0},
                    {name: 'artisan', level: 0},
                    {name: 'swift', level: 0},
                    {name: 'vampirism', level: 0},
                    {name: 'tenacity', level: 0},
                    {name: 'skybase_king', level: 0}
                ]
            },
            {
                name: 'Craftacar',
                uuid: '4fa4c8ae99a94d8e8a5db19c5d3ee024',
                perks: [
                    {name: 'sage', level: 0},
                    {name: 'boss_skills', level: 0},
                    {name: 'chest_protect', level: 0},
                    {name: 'artisan', level: 0},
                    {name: 'swift', level: 0},
                    {name: 'vampirism', level: 0},
                    {name: 'tenacity', level: 0},
                    {name: 'skybase_king', level: 0}
                ]
            },
            {
                name: 'Tryharder',
                uuid: '60e2e30cdabb4c8d81cd7849f3ab5ff9',
                perks: [
                    {name: 'sage', level: 0},
                    {name: 'boss_skills', level: 0},
                    {name: 'chest_protect', level: 0},
                    {name: 'artisan', level: 0},
                    {name: 'swift', level: 0},
                    {name: 'vampirism', level: 0},
                    {name: 'tenacity', level: 0},
                    {name: 'skybase_king', level: 0}
                ]
            },
            {
                name: 'McTryhard',
                uuid: 'c0e0b9aea57545dca17766f0b54afd5a',
                perks: [
                    {name: 'sage', level: 0},
                    {name: 'boss_skills', level: 0},
                    {name: 'chest_protect', level: 0},
                    {name: 'artisan', level: 0},
                    {name: 'swift', level: 0},
                    {name: 'vampirism', level: 0},
                    {name: 'tenacity', level: 0},
                    {name: 'skybase_king', level: 0}
                ]
            }
        ]
    });
});

module.exports = router;
