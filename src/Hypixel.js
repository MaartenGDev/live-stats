class Hypixel {
    constructor(token, http){
        this.token = token;
        this.http = http;
    }
    getPlayerByUuid(uuid) {
        return this._sendRequest(`player?uuid=${uuid}`);
    }

    getSession(uuid){
        return this._sendRequest(`session?uuid=${uuid}`);
    }
    getKeyInfo() {
        return this._sendRequest(`key`);
    }

    _buildQuery(uri){
        return `https://api.hypixel.net/${uri}&key=${this.token}`;
    }

    _sendRequest(parts){
        const uri = this._buildQuery(parts);

        console.log(uri);

        return new Promise((resolve, reject) => {
            this.http(uri)
                .then(res => res.json())
                .then(body => resolve(body))
                .catch(err => {
                    console.log(err);
                    console.log(this._buildQuery(uri));
                    reject(err);
                });
        });
    }

}

module.exports = Hypixel;