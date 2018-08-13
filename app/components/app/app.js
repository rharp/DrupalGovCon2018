import  React , {Component} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Route,
    Link,
} from 'react-router-dom';
import './app.css';
import Home from '../Home/Home';
import Article from '../Article/Article';

class App extends Component {

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