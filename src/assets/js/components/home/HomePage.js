import React from "react";
import ProfileCard from "./ProfileCard";

import PlayerSorter from "./../../../../PlayerSorter";

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
                const value = game[statKey] || 0;

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
        const game = this.state.game;
        const gameKey = game.game_key;

        const userOrder = gameKey == 'walls' ? PlayerSorter.sortByPackages : PlayerSorter.sortByLevel;

        const users = this.state.users.sort(userOrder);

        const userStats = users.map((user, index) => {

            const content = this.getCardContent(gameKey, user);

            return <section className="col col--2" key={index}>
                <ProfileCard
                    image={"/api/v1/avatars/" + user.uuid}
                    username={user.name}
                    level={user.level}
                    content={content}
                    actionTitle="PROFILE"
                />
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
