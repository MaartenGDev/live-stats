import React from 'react';
import {Link, IndexLink} from 'react-router'


const Header = () => {
    return (
        <header className="header">
            <svg className="header__hamburger" fill="#ffffff" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            </svg>

            <span className="header__title">Live Game</span>
            <div className="header__spacer"></div>
            <nav className="header__nav nav">
                <IndexLink to="/" activeClassName="active">Home</IndexLink>
                <Link to="/about" activeClassName="active">About</Link>
            </nav>
        </header>
    )
};

export default Header;
