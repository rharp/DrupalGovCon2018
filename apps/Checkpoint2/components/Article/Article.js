import React from 'react';
import axios from "axios";

class Article extends React.Component {
    constructor() {
        super();
        this.state = { article: {} };
    }

    componentDidMount() {
        const baseURL = 'https://headless.mobomo.net';
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
        }).then(() => {
            this.getArticle();
        })
    }

    getArticle() {
        const component = this;
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
    }

    render() {
        return (
            <div>
                <div align="center">
                    <img src={this.state.article.imageURL} />
                    <h1>{this.state.article.title}</h1>
                    <div>{this.state.article.date}</div>
                    {this.state.article.body}
                </div>
            </div>
        );
    }
}

export default Article;