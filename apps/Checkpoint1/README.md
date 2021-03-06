# Starting from Checkpoint 1
Previously in [Starting with the Base application](../Base/README.md) we displayed a teaser on the Home page for all of our article content, which we configured Drupal to expose. 

Now, we will configure Drupal to give us each individual node, using a contributed module. The article teasers from the previous step with then link to each of their node pages. 

## What Drupal Needs

### 1. Install RestUI
[RestUI](https://www.drupal.org/project/restui) is a contributed module that will need to be manually installed on your Drupal server.

### 2. Configure RestUI
For this process, we will need to be able to access each node's content individually. Here we will configure RestUI to allow for this.

 **Note:** The following paths are based on the a Drupal instance for training at https://headless.mobomo.net. This will need to be changed to point to your Drupal instance.

* Go to `https://headless.mobomo.net/admin/config/services/rest`.
* Enable the `Content` Resource (this will bring you to the configuration page).
    *  For our example we will use the following settings:
        *   Granularity : ``Resource``
        *   Methods : ``GET``
        *   Accepted request formats : ``json``
        *   Authentication providers: ``basic_auth``
        *   Save Configuration

## What Our Application Needs

### 1. Update ArticleTeaser.js
We will be linking each teaser to the node page directly. We will first need to get the node ID from our data object, retrieved in [Starting with the Base application](../Base/README.md), passed into this component.

In order for us to do that, we will need to create the property first. This will be added to the existing sections, as seen below.
    
    ArticleTeaser.defaultProps = {
        title: '',
        content: '',
        image: {},
        nid: ''
    };

**AND**
    
    ArticleTeaser.propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.shape({
            url: PropTypes.string,
            alt: PropTypes.string,
        }),
        nid: PropTypes.number,
    };
    
 Now that we know we will have the NID coming from our data object, we need to create a link directly to the node's content. To do this, we will first need to include Link from React Router DOM.
        
        import { Link } from 'react-router-dom';
   
  Then, we can add the `<Link>` to the node page.
  
    const ArticleTeaser = ({title,content,image, nid}) => {
        return (
            <div>
                <img src={image.url} alt={image.alt} />
                <h2>{title}</h2>
                {content}
                <Link to={`/node/${nid}`}>Read More</Link>
            </div>
        );
    };
     
### 2. Update Home.js
Now that this property exists in `ArticleTeaser.js`, we can use the value from `nid`, which is already stored in our **article** state and assign it to our NID property for the ArticleTeaser component.
   
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
First, we will need to make a new component folder named `Article` inside of this version's app directory. For this example, we will use `apps/Base/components/`. Then, create the file `Article.js` inside of the Article folder.

At this point we have the `nid` from our data object and have passed it to the ArticleTeaser which we have used to create a link to the url `/node/${nid}`. In this step we will create the component which will be viewed at that url.

This script will do the following:
    
   1. Make a request using Axios to get a session token from Drupal. 
   2. Attach the token to the header to make another request to our API we created through `RestUI`, and collect the data for the NID passed in the url.
   3. Take the returned data and pass them into our **article** state defined in the constructor.
   4. Render the data from that **article**.
   
   **Note:** On this page, we will need to fetch the article data once again. The reason for this is each component cannot share information stored as a state by default. This would require something such as Flux or Redux, which will take some configuration and is outside of the scope of this training.
      
```
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
```
### 4. Update App.js
We now have all of the components and data objects ready to render. Let's head back over to our routing file in `App.js` and include the Article page.

    import Article from './components/Article/Article';
     
Just as before with the Home page, we will add the route for the Article page. In Step 1 we created a link to `/node/${nid}`; however, that link will not go anywhere without creating the route first. The path will have`:nid` at the end, which indicates it will be a variable.

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
At this point, your application will now have a link to each individual node page and render a full display of the nodes content.

**Note:** This command will need to be run in the root directory.

If you are manually configuring the application in the `Base` directory you will use

     npm run base
     
 Otherwise you can build from our `Checkpoint2` directory which includes all of the changes we have completed so far.
 
      npm run cp2
      
### 7. View Your App!
Go to http://localhost:3000/.


When you are ready you can continue with [Starting from Checkpoint 2](../Checkpoint2/README.md).
