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

            return <section className="col col--3">
                <section className="card" key={index}>
                    <section className="card__image">
                        <img src=""/>
                    </section>
                    <section className="card__title">
                        <h2 className="mdl-card__title-text">{user.name}</h2>
                    </section>
                    <section className="card__content">
                        {content}
                    </section>
                    <section className="card__actions">
                        <a className="btn">
                            Getting Started
                        </a>
                    </section>
                </section>
            </section>
        });

        return (
            <div className="app">
                <div className="l-grid">
                    {userStats}
                </div>
            </div>
        )
    }
}
export default HomePage;
