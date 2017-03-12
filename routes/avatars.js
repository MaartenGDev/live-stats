const express = require('express');
const router = express.Router();
const fs = require('fs');
const download = require('download');

const gm = require('gm').subClass({imageMagick: true});

const fetch = require('node-fetch');

router.get('/:uuid', (req, res, next) => {
    const {uuid} = req.params;

    const storePath = `${process.env.PWD}/storage/avatars/${uuid}.png`;

    fs.access(storePath, err => {
        if (err) {
            getImageUriByUuid(uuid).then(avatarUri => {
                saveSkinToFile(avatarUri, storePath)
                    .then(fileName => res.sendFile(fileName))
            })
        } else {
            res.sendFile(storePath);
        }
    });


});

const getImageUriByUuid = uuid => {
    return new Promise((res, rej) => {
        fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
            .then(res => res.json())
            .then(data => {
                if(data.properties.length == 0){
                    console.log(data);
                }

                const avatarBase64Blob = data.properties[0].value;

                const profile = JSON.parse(Buffer.from(avatarBase64Blob, 'base64').toString('ascii'));

                const textures = profile.textures;

                const {SKIN, CAPE} = textures;

                if (SKIN == undefined) {
                    res('http://assets.mojang.com/SkinTemplates/steve.png');
                }

                res(SKIN.url);
            }).catch(err => rej(err))
    });
}

const saveSkinToFile = (uri, storePath) => {
    return new Promise((res, rej) => {
        download(uri).then(data => {

            storePlayerHead(data, storePath)
                .then(storePath => res(storePath))

        }).catch(err => rej(err));
    });
}

const storePlayerHead = (player, storePath) => {
    return new Promise(res => {
        gm(player)
            .crop(8, 8, 8, 8)
            .scale(70, 70)
            .write(storePath, err => {
                if (err) throw err;

                res(storePath)
            })
    });
}
module.exports = router;
