import React from 'react';
import axios from "axios";

class Article extends React.Component {
    constructor() {
        super();
        // Setting up initial state
        this.state = { article: {} };
    }
    componentDidMount() {
        const component = this;
        const baseURL = 'http://18.188.24.108';
        const tokenURL = baseURL + '/rest/session/token';
        const req = axios.get(tokenURL);
        req.then((response) => {
            const token = response.data;
            this.ajax = axios.create({
                baseURL,
                headers: {
                    'X-CSRF-Token': token,
                },
            });
            this.ajax.get(`/node/${this.props.match.params.nid}?_format=json`).then(function(article) {
                component.setState({
                    article: {
                        title: article.data.title[0].value,
                        body: article.data.body[0].value,
                        imageURL: article.data.field_image[0].url,
                        date: article.data.field_date[0].value,
                    }
                });
            })
        });
    }
    render() {
        return (
            <div className="col-md-12" align="center">
                <img src={this.state.article.imageURL} />
                <h1>{this.state.article.title}</h1>
                <div>{this.state.article.date}</div>
                {this.state.article.body}
            </div>
        );
    }
}

export default Article;