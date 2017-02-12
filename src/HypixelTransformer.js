class HypixelTransformer {
    session(game) {
        let session = game.session;

        if(session == null){
            session = {};
        }

        return {
            gameType: session.gameType || 'Default',
            server: session.server || 'Lobby',
            players: session.players || []
        };
    }

    player(player) {
        return player['player'];
    }
}
module.exports = HypixelTransformer;