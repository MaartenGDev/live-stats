
const fetch = require('node-fetch');

const apiKey = process.env.API_KEY;
const playerUuid = 'c0e055a5d4734e7590a76cdad39fd05e';

const options = {
    uri: 'https://api.hypixel.net/session',
    qs: {
        key: apiKey,
        uuid: playerUuid
    },
    json: true
};
const sessionUri = `http://api.hypixel.net/session?uuid=${playerUuid}&key=${apiKey}`;
const playerUri = `http://api.hypixel.net/player?uuid=${playerUuid}&key=${apiKey}`;

fetch(playerUri)
  .then(res => res.json())
  .then(body => {
    console.log(body["player"]["stats"]["Walls"]);
  });

  console.log(playerUri);