# Version 3
In this version we have added to the previous [Version 2](../Checkpoint1/README.md) which will link the Article Teasers and link them to the node page individually in order to view more details.

## What Drupal Needs?

### 1. Install RestUI
[RestUI](https://www.drupal.org/project/restui) is a contributed module that will need to be manually installed on your drupal server.

### 2. Configure RestUI
For this version we will need to be able to access each node's content individually. Here we will configure RestUI to allow for this.

 **Note:** The following paths are based on the a drupal instance for training at http://18.188.24.108. This will need to be changed to point to your drupal instance.

* Go to `http://18.188.24.108/admin/config/services/rest`
* Enable the `Content` Resource (this will bring you to the configuration page.)
    *  For our example we will use the following settings:
        *   Granularity : ``Resource``
        *   Methods : ``GET``
        *   Accepted request formats : ``json``
        *   Authentication providers: ``basic_auth``
        *   Save Configuration

## How Was This Version Created?

### 1. Update ArticleTeaser.js
First, since we will be linking each teaser to the node page directly. We will need to get the node id from our data object, retrieved in Version 2, passed into this component.

In order for us to do that, we will need to create the property first. This can be seen below.
    
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
    
 Now that we know we will have the nid coming from our data object. We need to create a link directly to the node's content. To do this we will first need to include Link from React Router Dom.
        
        import { Link } from 'react-router-dom';
   
  Then we can add the `<Link>` to the node page.
  
    const ArticleTeaser = ({title, content, image, nid}) => (
        <div className="article-teaser">
            <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
            <h2 className="article-teaser__title">{title}</h2>
            {content}
            <Link to={`/node/${nid}`} title={title}>Read More</Link>
        </div>
     );
     
### 2. Update Home.js
Now that this property exists in `ArticleTeaser.js` we can use the value from `nid` which is already stored in our **article** state and assign it to our nid property for the ArticleTeaser component.
   
    {this.state.articles.map(({title, field_image, body, nid}, index) => (
         <ArticleTeaser
               key={index}
               title={title[0].value}
               image={field_image[0]}
               content={`${body[0].value.substring(0, 250)}...`}
               nid={nid[0].value}
         />
    ))}


### 3. Create Article.js
First we will need to make a new component folder named `Article` inside of this versions app directory. For this example we will use `apps/v3/components/`. Then create the file `Article.js` inside of the Article folder.

At this point we have the `nid` from our data object and have passed it to the ArticleTeaser which we have used to create a link to the url `/node/${nid}`. In this step we will create the component which will be viewed at that url.

This script will do the following:
    
   1. Make a request using axios to get a session token from drupal 
   2. Attach the token to the header to make another request to our api we created through `RestUI`, and collect the data for the nid passed in the url.
   3. Take the returned data and pass them into our **article** state defined in the constructor.
   4. Render the data from that **article**.
   
   **Note:** On this page we will need to fetch the article data once again. The reason for this, is each component can not share information stored as a state by default. This would require something such as flux or redux, which will take some configuration and outside of the scope of this training.
      
```
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
```
### 4. Update App.js
We now have all of the components and data objects ready to render. Let's head back over to our routing file in `App.js` and include the Article page.

    import Article from './components/Article/Article';
     
Just as before with the Home page we will add the route for the Article page. In Step 1 we created a link to `/node/${nid}` however that link will not go anywhere without creating the route first. The path will have`:nid` at the end which indicates it will be a variable.

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
        
 ### 5. Build your environment
 At this point your application will now have a link to each individual node page and render a full display of the nodes content.
 
 **Note:** This command will need to be run in the root directory.
 
      npm run buildv3
      
 ### 6. View your App!
 go to http://localhost:3000/