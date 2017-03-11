const express = require('express');
const router = express.Router();
const Jimp = require("jimp");
const fs = require('fs');

const fetch = require('node-fetch');

router.get('/:uuid', (req, res, next) => {
    const {uuid} = req.params;

    const storePath = `${process.env.PWD}/storage/avatars/${uuid}.png`;

    fs.access(storePath, err => {
        console.log(err)
        if (err) {

            getImageUriByUuid(uuid)
                .then(uri => {
                    console.log('getting ' + uri)

                    saveSkinToFile(uri, storePath)
                        .then(myUri => {
                            console.log('save to file')

                            return res.sendFile(storePath);
                        }).catch(err => console.log(err))
                })
        } else {
            return res.sendFile(storePath);
        }
    });


});


const getImageUriByUuid = uuid => {
    return new Promise((res, rej) => {
        fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`)
            .then(res => res.json())
            .then(data => {
                const avatarBase64Blob = data.properties[0].value;

                const profile = JSON.parse(Buffer.from(avatarBase64Blob, 'base64').toString('ascii'));

                const textures = profile.textures;

                const {SKIN, CAPE} = textures;

                res(SKIN.url);
            }).catch(err => rej(err))
    });

}

const saveSkinToFile = (uri, storePath) => {
    console.log(storePath)

    return new Promise((res, rej) => {
        Jimp.read(uri)
            .then(avatar => {
                avatar.crop(8,8,8,8)
                avatar.resize(90, 90)
                    .write(storePath, (err, result) => {
                        console.log(err, result)
                        res(result)
                    });

            }).catch(err => console.log(err));
    });
}


module.exports = router;
