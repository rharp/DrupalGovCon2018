import  React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './app.css';

class App extends React.Component {
    constructor() {
        super();
        // Setting up initial state
        this.state = {
            data: []
        }
    }

// calling the componentDidMount() method after a component is rendered for the first time
    componentDidMount() {
        var component = this;
        axios.get(this.props.source)
            .then(function(event) {
                component.setState({
                    data: event.data
                });
            })
    }

    render() {
        let articles = [];
        this.state.data.forEach(item => {
            const title = item.title[0].value;
            const image = item.field_image[0];
            const body = item.body[0].value;

            articles.push(
                <h3 className="Articles">{title}</h3>,
                <img src={image.url} src={image.url} height={image.height} width={image.width} alt={image.alt}></img>,
                <p className="body">{body}</p>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" align="center">
                        <h1 className="title">All Articles</h1>
                        {articles}
                    </div>
                </div>
            </div>
  );
 }
}
// rendering into the DOM
ReactDOM.render(
   <App source="https://localhost:8443/articlesexport?_format=json" />,
    document.getElementById('app')
);

export default App