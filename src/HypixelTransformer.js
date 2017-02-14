class HypixelTransformer {
    constructor(api) {
        this.api = api;
    }

    session(game) {
        let session = game.session;

        if (session == null) {
            session = {};
        }

        let players = session.players || [];

        players = players.map(uuid => this.api.getPlayerByUuid(uuid))

        return new Promise((resolve, reject) => {
            Promise.all(players)
                .then(players => {
                    const allPlayers = players.map(player => this.player(player))

                    resolve({
                        gameType: session.gameType || 'Default',
                        server: session.server || 'Lobby',
                        players: allPlayers
                    });
                });
        });
    }

    player(response) {
        const player = response['player'];

        return {
            name: player['displayname']
        }
    }
}
module.exports = HypixelTransformer;