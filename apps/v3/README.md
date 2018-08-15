# Version 3
In this version, we have added to the previous [Version 2](../v2/README.md) to link to each node individually and view more details.

## How Was This Version Created?

### 1. Create Article.js
First, we will need to create the component for the node landing page.

*TODO:*  Break this down as instructions

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
            // console.log('Article', this.state.article);
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
                    </div>
                </article>
            );
        }
    }
    
    export default Article;

### 2. Update Home.js
Add nid to passed properties.
    
    {this.state.articles.map(({title, field_image, body, nid}, index) => (
         <ArticleTeaser
               key={index}
               title={title[0].value}
               image={field_image[0]}
               content={`${body[0].value.substring(0, 250)}...`}
               nid={nid[0].value}
       />
    ))}

### 3. Update ArticleTeaser.js
We will need to add the nid property to ArticleTeaser so we can access the nid from Home.js.
    
    ArticleTeaser.defaultProps = {
       title: '',
       content: '',
       image: {},
       nid: '',
    };

**AND**
    
    ArticleTeaser.propTypes = {
       title: PropTypes.string.isRequired,
       content: PropTypes.string.isRequired,        
       image: PropTypes.shape({
       url: PropTypes.string,
       height: PropTypes.string,
       width: PropTypes.string,
       alt: PropTypes.string,
       }),
        nid: PropTypes.string.isRequired,
    };
    
 Now we will need to create a link directly to the node's content. To do this, we will first need to include Link from React Router DOM.
        
        import { Link } from 'react-router-dom';
   
  Then, we can add the `<Link>` to the node page.
  
    const ArticleTeaser = ({title, content, image, nid}) => (
        <div className="article-teaser">
            <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
            <h2 className="article-teaser__title">{title}</h2>
            {content}
            <Link to={`/node/${nid}`} title={title}>Read More</Link>
        </div>
     );
     
### 4. Update App.js
We will now need to include the Article.js.

    import Article from '../Article/Article';
     
Then, add the new route for the Article component inside the render function.

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
        
 ### 5. Build Your Environment
      npm run build
      npm run start
      
 ### 6. View Your App!
 Go to http://localhost:3000/
