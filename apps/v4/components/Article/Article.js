import React from 'react';
import axios from "axios";

class Article extends React.Component {
    constructor() {
        super();
        // Setting up initial state
        this.state = {
            article: {},
            comment: {},
            user: {},
        };
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
                withCredentials: true
            })
            this.ajax.post( baseURL + `/user/login?_format=json`, {
                "name": "user",
                "pass": "password"
            }).catch (function (error) {
                console.log(error);
            }).then(function (){
                component.ajax.get(`/node/${component.props.match.params.nid}?_format=json`).then(function(article) {
                    component.setState({
                        article: {
                            title: article.data.title[0].value,
                            body: article.data.body[0].value,
                            imageURL: article.data.field_image[0].url,
                            date: article.data.field_date[0].value,
                            cid: article.data.field_comment[0].cid,
                            commentUid:  article.data.field_comment[0].last_comment_uid
                        },
                    });
                }).then(function() {
                    component.ajax.get(`/comment/${ component.state.article.cid }?_format=json`).then(function(comment) {
                        component.setState({
                            comment: {
                                subject: comment.data.subject[0].value,
                                body: comment.data.comment_body[0].value,
                                created: comment.data.created[0].value
                            },
                        });
                    });
                    component.ajax.get(`/user/${ component.state.article.commentUid }?_format=json`).then(function(user) {
                        component.setState({
                            user: {
                                name: user.data.name[0].value
                            },
                        });
                    })
                })
            })
        });
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
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="article-comment">
                                        <p className="article-comment__body">{this.state.comment.body}</p>
                                        <p className="article-comment__user-name">{this.state.user.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default Article;