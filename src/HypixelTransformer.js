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

                    const gameType = session.gameType || 'Lobby';

                    Promise.all(allPlayers).then(userStats => {
                        resolve({
                            gameType: gameType,
                            game_key: this.getGameKey(gameType),
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
                    sky_wars: player['stats']['SkyWars'] || {},
                    mega_walls: player['stats']['Walls3'] || {}
                }
            }
        }

        stats.stats.games.walls.packages = stats.stats.games.walls.hasOwnProperty("packages") ? stats.stats.games.walls.packages : [];

        return new Promise(res=> {
            res(stats)
        });
    }

    getGameKey(gameType){
        const gameTypes = {
            WALLS3: "mega_walls"
        }

        return gameTypes[gameType];
    }
}
module.exports = HypixelTransformer;
