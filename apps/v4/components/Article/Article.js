import React from 'react';
import axios from "axios";
import Comment from '../Comment/Comment'

class Article extends React.Component {
    constructor() {
        super();
        // Setting up initial state
        this.state = {
            article: {},
            comments: [],
            comment: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.getComments();
    }

    handleSubmit(event) {
        event.preventDefault();
        const baseURL = 'http://18.188.24.108';
        const tokenURL = baseURL + '/rest/session/token';
        const tokenReq = axios.get(tokenURL);
        tokenReq.then((response) => {
            this.ajax = axios.create({
                baseURL,
                headers: {
                    'X-CSRF-Token': response.data,
                },
            })
            this.ajax.post(`/entity/comment`, {
                "entity_id":[{"target_id":3}],
                "entity_type":[{"value":"node"}],
                "comment_type":[{"target_id":"comment"}],
                "field_name":[{"value":"field_comment"}],
                "subject":[{"value":`${this.state.comment.substring(0, 15)}`}],
                "comment_body":[
                    {"value":`${this.state.comment}`}
                ]
            });
        }).then(()=> {
            this.getComments();
        });

    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }

    getComments(){
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
            })
            this.ajax.get(`/node/${this.props.match.params.nid}?_format=json`).then(function(article) {
                component.setState({
                    article: {
                        title: article.data.title[0].value,
                        body: article.data.body[0].value,
                        imageURL: article.data.field_image[0].url,
                        date: article.data.field_date[0].value,
                    },
                });

            })
            this.ajax.get(`/api/comments/${this.props.match.params.nid}?_format=json`).then(function(comments) {
                component.setState({
                    comments: comments.data
                });
            });
        })
    }

    render() {
        return (
            <article className="article">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12" align="center">
                            <img src={this.state.article.imageURL} />
                            <h1>{this.state.article.title}</h1>
                            <div>{this.state.article.date}</div>
                            {this.state.article.body}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" align="center">
                            {this.state.comments.map(({subject, comment_body}) => (
                                <Comment
                                    title={subject[0].value}
                                    content={comment_body[0].value}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12" align="center">
                            <form onSubmit={this.handleSubmit} >
                                <div className="col-md-2">
                                    <label>Comment:</label>
                                </div>
                                <div className="col-md-8">
                                    <textarea id="comment" value={this.state.value} onChange={this.handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <input type="submit" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default Article;