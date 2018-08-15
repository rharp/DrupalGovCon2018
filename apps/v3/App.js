import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Home from './components/Home/Home';
import Article from './components/Article/Article';

class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Home} />
                    <Route path="/node/:nid" component={Article} />
                </div>
            </Router>
        );
    }
}
// rendering into the DOM
ReactDOM.render(
   <App source="http://18.188.24.108" />,
    document.getElementById('app')
);

export default App