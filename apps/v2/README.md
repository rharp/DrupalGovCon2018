# Version 2
In this Version, we have configured Drupal 8 to expose our content and accept connections from our application. We will be using [Version 1](../v1/README.md) as a base.

## What Drupal Needs?

### 1. Enable Core Modules
In Drupal, we will need to enable the required core modules to gain access to the API.
 We will do this by
 * Logging in as an administrator.
 * Going to ```/admin/modules```.
 * Enabling the Modules in Web Services.
    * HAL
    * HTTP Basic Authentication
    * Restful web services
    * Serialization

### 2. Create REST Service
 For this step, we will need to create a View inside of Drupal to expose the content we would like to display in our application.
 *  Go to ```/admin/structure/views/add```.
 *  For our example, we will enter the following information:
    *   View Name : ``Articles API``
    *   View Settings -> Type : ``Article``
    *   REST Export Settings
        *  Enable ``Provide a REST export``
        *   REST Export Path: ``api/articles``
     *  Save
     
 ### 3. Add CORS Configuration
 **Note:** These changes only need to be added if our Drupal instance is running on a different domain than our React application.
 
 For this, we will need to add some changes to our ``services.yml`` . This can be found in ``sites/default/`` . If the file does not exist, you can copy the ``default.services.yml`` over to services.yml and then add this to the bottom of the file.
 
 **Note:** ``allowedOrigins`` should be set to the domain you will access the API from, for security reason. For our example, we have set it to ```*``` which indicates any domain can access this API.
 
    cors.config:
        enabled: true
        allowedHeaders: ['x-csrf-token', 'content-type']ones.
        allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE']
        allowedOrigins: ['*']
        exposedHeaders: false
        maxAge: false
        supportsCredentials: true
        
 
 #### Drupal is now configured for our application!
 
 ## How Was This Version Created

 ### 1. Install Axios and React Router DOM
    npm install --save axios react-router-dom
  * **Axios:** Allows us to make our HTTP requests from React to interact with our Drupal API.
  * **React Router DOM:** Allows for us to link to other components.

 ### 2. Create Home.js
 TODO: Break this down as instructions
 
    import React from 'react';
    import ArticleTeaser from "../ArticleTeaser/ArticleTeaser";
    import axios from "axios";
    
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
            const req = axios.get(tokenURL);
            req.then((response) => {
                const token = response.data;
                this.ajax = axios.create({
                    baseURL,
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
 
 ### 3. Create ArticleTeaser.js
 TODO: Break this down as instructions
 
    import React from 'react';
    import PropTypes from 'prop-types';
    
    const ArticleTeaser = ({title, content, image}) => (
        <div className="article-teaser">
            <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
            <h2 className="article-teaser__title">{title}</h2>
            {content}
        </div>
    );
    
    ArticleTeaser.defaultProps = {
        title: '',
        content: '',
        image: {},
    };
    
    ArticleTeaser.propTypes = {
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        image: PropTypes.shape({
            url: PropTypes.string,
            height: PropTypes.string,
            width: PropTypes.string,
            alt: PropTypes.string,
        }),
    };
    
    export default ArticleTeaser;
 
 ### 4. Update App.js
 TODO: Break this down as instructions
 
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {
        BrowserRouter as Router,
        Route,
    } from 'react-router-dom';
    import Home from '../Home/Home';
    
    class App extends React.Component {
    
        render() {
            return (
                <Router>
                    <div>
                        <Route exact path="/" component={Home} />
                    </div>
                </Router>
            );
        }
    }
    // rendering into the DOM
    ReactDOM.render(
       <App source="http://18.188.24.108" />,
        document.getElementById('app')
    );
    
    export default App
    
### 5. Build Your Environment
     npm run build
     npm run start
     
### 6. View Your App!
go to http://localhost:3000/
