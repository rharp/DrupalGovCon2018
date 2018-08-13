import React from 'react';
import ArticleTeaser from "../ArticleTeaser/ArticleTeaser";
import axios from "axios";
import './home.css';

class Home extends React.Component {
    constructor() {
        super();
        // Setting up initial state
        this.state = { articles: [] };
    }
    componentDidMount() {
        const component = this;
        const baseURL = 'http://18.188.24.108';
        const tokenURL = baseURL + '/rest/session/token';
        const req = axios.get(tokenURL, {
            withCredentials: true
        });
        req.then((response) => {
            const token = response.data;
            this.ajax = axios.create({
                baseURL,
                withCredentials: true,
                headers: {
                    'X-CSRF-Token': token,
                },
            });
            this.ajax.get('/api/articles?_format=json').then(function(articles) {
                component.setState({
                    articles: articles.data
                });
            })
        });
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12" align="center">
                        <h1 className="title">All Articles</h1>
                        {this.state.articles.map(({title, field_image, body, nid}, index) => (
                            <ArticleTeaser
                                key={index}
                                title={title[0].value}
                                image={field_image[0]}
                                content={`${body[0].value.substring(0, 250)}...`}
                                nid={nid[0].value}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};

export default Home;