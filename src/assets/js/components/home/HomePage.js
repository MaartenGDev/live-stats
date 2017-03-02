import React from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {game: {}, users: []}
    }

    componentDidMount() {
        const uuid = 'c0e055a5d4734e7590a76cdad39fd05e';

        const users = fetch(`/api/v1/users/${uuid}/game`)
            .then(res => res.json())
            .then(game => this.setState({game: game, users: game.players || []}))
    }

    getCardContent(gameType, user) {
        console.log(gameType);
        console.log(user.stats.games[gameType]);

        const game = user.stats.games[gameType];

        if (gameType == "walls") {
            const packages = game.packages;

            return packages.map((skill, index) => {
                return <span className="mdl-chip" key={index}>
                            <span className="mdl-chip__text">{skill}</span>
                        </span>
            })
        } else {
            const items = ['wins', 'kills', 'deaths'];

            const statsLabels = items.map((statKey, index) => {
                const value = game.hasOwnProperty(statKey) ? game[statKey] : 0;

                return <li className="mdl-list__item" key={index}>
                    <span className="mdl-list__item-primary-content">
                        {statKey} - {value}
                    </span>
                </li>
            });

            return <ul className="demo-list-item mdl-list">
                {statsLabels}
            </ul>
        }
    }

    render() {
        const users = this.state.users.sort((firstUser, secondUser) => {
            const firstPackagesCount = firstUser.stats.games.walls.packages.length;
            const secondPackagesCount = secondUser.stats.games.walls.packages.length;

            if (firstPackagesCount == secondPackagesCount) {
                return 0;
            }

            return firstPackagesCount < secondPackagesCount ? 1 : -1;
        });

        const game = this.state.game;

        const userStats = users.map((user, index) => {

            const content = this.getCardContent(game.game_key, user);

            return <div className="mdl-cell mdl-cell--3-col" key={index}>
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">{user.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {content}
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <a className="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                            Getting Started
                        </a>
                    </div>
                    <div className="mdl-card__menu">
                        <span className="mdl-card__menu-text"><b>Level:</b> {user.level}</span>
                    </div>
                </div>
            </div>
        });

        return (
            <div className="app">
                <div className="mdl-grid">
                    {userStats}
                </div>
            </div>
        )
    }
}
export default HomePage;
