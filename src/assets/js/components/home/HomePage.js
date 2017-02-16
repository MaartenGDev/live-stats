import React from "react";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        const uuid = 'c0e055a5d4734e7590a76cdad39fd05e';

        const users = fetch(`/api/v1/users/${uuid}/game`)
            .then(res => res.json())
            .then(game => this.setState({users: game.players || []}))
    }

    render() {
        const userStats = this.state.users.map(user => {

            const gameStats = user.stats.games.walls;

            const hasPackages = gameStats.hasOwnProperty("packages");

            let packages = hasPackages ? gameStats.packages : [];

            packages = packages.map(skill => {
                return <span className="mdl-chip">
                            <span className="mdl-chip__text">{skill}</span>
                        </span>
            })

            return <div className="mdl-cell mdl-cell--3-col" key={user.uuid}>
                <div className="demo-card-wide mdl-card mdl-shadow--2dp">
                    <div className="mdl-card__title">
                        <h2 className="mdl-card__title-text">{user.name}</h2>
                    </div>
                    <div className="mdl-card__supporting-text">
                        {packages}
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
