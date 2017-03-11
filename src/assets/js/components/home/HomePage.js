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

                return <li className="card__skill" key={index}>
                    <span className="card__skill card__skill--title">{value}</span><span> {statKey}</span>
                </li>
            });

            return <ul className="card__skills">
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

            return <section className="col col--2">
                <section className="card" key={index}>
                    <section className="card__avatar">
                        <img className="card__image" src={"/api/v1/avatars/" + user.uuid}/>
                    </section>
                    <section className="card__header">
                        <h2 className="card__title card__title--primary">{user.name}</h2>
                        <p className="card__title card__title--secondary">Level 69</p>
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
