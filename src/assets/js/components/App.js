import React, {PropTypes} from 'react'
import Header from './common/Header';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <main className="container">
                    <div className="page-content">{this.props.children}</div>
                </main>
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

export default App;
