import React from 'react';
import axios from 'axios';
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';

class Home extends React.Component {
    constructor() {
        super();
        this.state = { articles: [] };
    }

    componentWillMount(){
        const component = this;
        const baseURL = 'https://headless.mobomo.net';
        const tokenURL = baseURL + '/rest/session/token';
        const req = axios.get(tokenURL);
        req.then((response) => {
            const token = response.data;
            this.ajax = axios.create({
                baseURL,
                headers: {
                    'X-CSRF-Token': token,
                }
            });
            this.ajax.get('/api/articles?_format=json').then(function(articles) {
                component.setState({
                    articles: articles.data
                });
            });
        });
    }

    render() {
        return(
            <div align="center">
                <h1>All Articles</h1>
                {this.state.articles.map(({title, field_image, body}, index) => (
                    <ArticleTeaser
                        key={index}
                        title={title[0].value}
                        image={field_image[0]}
                        content={`${body[0].value.substring(0,250)}...`}
                    />
                ))}
            </div>
        )
    };
}

export default Home;