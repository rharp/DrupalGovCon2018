# Version 2
In this Version, we have configured Drupal 8 to expose our content and accept connections from our application. We will be using [Version 1](../v1/README.md) as a base.

## What Drupal Needs?

### 1. Enable Core Modules
In Drupal, we will need to enable the required core modules to gain access to the api.
 We will do this by
 * logging in as an administrator 
 *  going to ```/admin/modules``` 
 * Enable the Modules in Web Services
    * HAL
    * HTTP Basic Authentication
    * Restful web services
    * Serialization

### 2. Create REST Service
 For this step, we will need to create a view inside of Drupal to expose the content we would like to display in our application.
 *  go to ```/admin/structure/views/add```
 *  For our example we will enter the following
    *   View name : ``Articles API``
    *   View Settings -> type : ``Article``
    *   REST Export Settings
        *  Enable ``Provide a REST export``
        *   REST export path: ``api/articles``
     *  Save
     
 ### 3. Add CORS Configuration
 **Note:** These changes will only need to be added if our drupal instance is running on a different domain than our React application.
 
 For this we will need to add some changes to our ``services.yml`` . This can be found in ``sites/default/`` . If the file does not exist, you can copy the ``default.services.yml`` over to services.yml and then add this to the bottom of the file.
 
 **Note:** ``allowedOrigins`` should be set to the domain you will access the api from, for security reason. For our example, we have set it to ```*``` which indicates any domain can access this api.
 
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

 ### 1. Install Axios and React Router Dom
    npm install --save axios react-router-dom
  * **Axios:** allows us to make our http requests from react to interact with our drupal api.
  * **React Router Dom:** allows for us to link to other components

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
    
### 5. Build your environment
     npm run build
     npm run start
     
### 6. View your App!
go to http://localhost:3000/
