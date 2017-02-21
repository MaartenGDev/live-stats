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

                    Promise.all(allPlayers).then(userStats => {
                        resolve({
                            gameType: session.gameType || 'Default',
                            server: session.server || 'Lobby',
                            players: userStats
                        });
                    })

                });
        });
    }

    player(player) {
        const stats = {
            name: player.displayname,
            uuid: player.uuid,
            level: player.networkLevel,
            stats: {
                games: {
                    walls: player['stats']['Walls'] || {},
                    skywars: player['stats']['SkyWars'] || {}
                }
            }
        }

        stats.stats.games.walls.packages = stats.stats.games.walls.hasOwnProperty("packages") ? stats.stats.games.walls.packages : [];

        return new Promise(res=> {
            res(stats)
        });
    }
}
module.exports = HypixelTransformer;
