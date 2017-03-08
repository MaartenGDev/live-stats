class Hypixel {
    constructor(token, http, cache) {
        this.token = token;
        this.http = http;
        this.cache = cache;
    }

    getPlayerByUuid(uuid) {
        return new Promise((res, rej) => {

            this.cache.then(db => {
                const collection = db.collection('users');
                // collection.createIndex({"uuid": 1}, {unique: true});

                collection.findOne({uuid: uuid}).then(cachedUser => {
                    const hasCachedUser = cachedUser !== null;

                    if (hasCachedUser) {
                        return res(cachedUser.player);
                    }

                    this._sendRequest(`player?uuid=${uuid}`).then(player => {
                        const playerData = player['player'];

                        collection.insert({uuid: playerData.uuid, player: playerData}).then(_ => {
                            res(playerData);
                        }).catch(err => {
                            console.log(err);
                        });
                    })
                })
            })
        });
    }

    getSession(uuid) {
        return this._sendRequest(`session?uuid=${uuid}`);
    }

    getKeyInfo() {
        return this._sendRequest(`key`);
    }

    _buildQuery(uri) {
        return `https://api.hypixel.net/${uri}&key=${this.token}`;
    }

    _sendRequest(parts) {
        const uri = this._buildQuery(parts);

        console.log(uri)
        return new Promise((resolve, reject) => {
            this.http(uri)
                .then(res => res.json())
                .then(body => resolve(body))
                .catch(err => {
                    reject(err);
                });
        });
    }

}

module.exports = Hypixel;