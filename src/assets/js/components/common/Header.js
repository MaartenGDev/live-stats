import React from 'react';
import {Link, IndexLink} from 'react-router'


const Header = () => {
    return (
        <header className="mdl-layout__header">
            <div className="mdl-layout__header-row">
                <span className="mdl-layout-title">Live Game</span>
                <div className="mdl-layout-spacer"></div>
                <nav className="mdl-navigation mdl-layout--large-screen-only">
                    <IndexLink to="/" activeClassName="active">Home</IndexLink>
                    <Link to="/about" activeClassName="active">About</Link>
                </nav>
            </div>
        </header>
    )
};

export default Header;
