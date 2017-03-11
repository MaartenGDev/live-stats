const express = require('express');
const router = express.Router();
const Jimp = require("jimp");
const fs = require('fs');
const download = require('download');
const sharp = require('sharp');

const fetch = require('node-fetch');

router.get('/:uuid', (req, res, next) => {
    const {uuid} = req.params;

    const storePath = `${process.env.PWD}/storage/avatars/${uuid}.png`;

    fs.access(storePath, err => {
        if (err) {

            getImageUriByUuid(uuid)
                .then(uri => {
                    console.log('getting ' + uri)

                    saveSkinToFile(uri, storePath)
                        .then(_ => {
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
    return new Promise((res, rej) => {
        download(uri).then(data => {
            fs.writeFileSync(storePath + '-high.png', data);

            Jimp.read(storePath + '-high.png').then(avatar => {
                avatar
                    .crop(8, 8, 8, 8)
                    .write(storePath + '-formatted.png', _ => {
                        Jimp.read(storePath + '-formatted.png').then(head => {
                            head
                                .scaleToFit(45, 45)
                                .write(storePath + '-head.png', _ => {
                                    Jimp.read(storePath + '-formatted.png').then(head2 => {
                                        head2
                                            .resize(45, Jimp.AUTO)
                                            .write(storePath + '-head-AUTO.png');
                                    });
                                });
                        });
                    });

                //                     .scaleToFit(90, 90)



            }).catch(err => console.log(err));


        });
    });
}

module.exports = router;
