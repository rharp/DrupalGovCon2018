import React from 'react';
import axios from "axios";
import Comment from '../Comment/Comment';


class Article extends React.Component {
    constructor() {
        super();
        this.state = {
            article: {},
            comments: [],
            comment: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.getComments();
    }

    getComments(){
        const component = this;
        const baseURL= 'http://18.188.24.108';
        const tokenURL = baseURL + '/rest/session/token';

        const req = axios.get(tokenURL);
        req.then((response) => {
            const token = response.data;
            this.ajax = axios.create({
                baseURL,
                headers: {
                    'X-CSRF-Token' : token,
                }
            });
            this.ajax.get(`/node/${this.props.match.params.nid}?_format=json`).then(function(article){
                component.setState({
                    article: {
                        title: article.data.title[0].value,
                        body: article.data.body[0].value,
                        imageURL: article.data.field_image[0].url,
                        date: article.data.field_date[0].value,
                    }
                })
            });
            this.ajax.get(`/api/comments/${this.props.match.params.nid}?_format=json`).then(function(comments){
                component.setState({
                    comments: comments.data
                })
            })
        });
    }

    handleChange(event) {
        this.setState({comment: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        const baseURL= 'http://18.188.24.108';
        const tokenURL = baseURL + '/rest/session/token';
        const req = axios.get(tokenURL);
        req.then((response) => {
            const token = response.data;
            this.ajax = axios.create({
                baseURL,
                headers: {
                    'X-CSRF-Token' : token,
                }
            });
            this.ajax.post(`/entity/comment`,{
                "entity_id" :[{"target_id": `${this.props.match.params.nid}`}],
                "entity_type" :[{"value": "node"}],
                "comment_type": [{"target_id": "comment"}],
                "field_name": [{"value": "field_comment"}],
                "subject" :[{"value": `${this.state.comment.substring(0,15)}`}],
                "comment_body": [
                    {"value": `${this.state.comment}`}
                ]
            }).then(()=> {
                this.getComments();
            })
        });
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
                    <div align="center">
                        {this.state.comments.map(({subject, comment_body},index) => (
                            <Comment
                                key={index}
                                title={subject[0].value}
                                content={comment_body[0].value}
                            />
                        ))}
                    </div>
                    <div align="center">
                        <form onSubmit={this.handleSubmit}>
                            <div className="col-md-2">
                                <label>Comment:</label>
                            </div>
                            <div className="col-md-8">
                                <textarea  value={this.state.value} onChange={this.handleChange}/>
                            </div>
                            <div className="col-md-2">
                                <input type="submit" value="Submit"/>
                            </div>
                        </form>
                    </div>
                </div>
            )
    }
}

export default Article;