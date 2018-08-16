# Starting with the Base application
We created a basic, working, React application in [Building the Base application](../README.md). 

Now, we will walk through the steps for configuring Drupal 8 to expose our content and accept connections from our application. Then we will create a Home page in our React application which will display all of the content relating to our Articles content type from Drupal. 

## What Drupal Needs

### 1. Enable Core Modules
In Drupal, we will need to enable the required core modules to gain access to the API.
 
 **Note:** The following paths are based on the a Drupal instance for training at http://18.188.24.108. This will need to be changed to point to your Drupal instance.

 * Log in as an administrator.
 * Go to `http://18.188.24.108/admin/modules`.
 * Enable the following modules in Web Services:
    * HAL
    * HTTP Basic Authentication
    * Restful web services
    * Serialization

### 2. Create Articles REST Service
 For this step, we will need to create a View inside of Drupal to expose the content we would like to display in our application.
 *  Go to `http://18.188.24.108/admin/structure/views/add`.
 *  For our example, we will enter the following: 
    *   View Name : ``Articles API``
    *   View Settings -> type : ``Article``
    *   REST Export Settings
        *  Enable ``Provide a REST export``
        *   REST export path: ``api/articles``
     *  Save
     
 ### 3. Add CORS Configuration
 **Note:** These changes will only need to be added if our Drupal instance is running on a different domain than our React application.
 
 For this, we will need to add some changes to our ``services.yml``. This can be found in ``sites/default/``. If the file does not exist, you can copy ``default.services.yml`` over to services.yml and then add this to the bottom of the file.
 
 **Note:** ``allowedOrigins`` should be set to the domain you will access the API from, for security reason. For our example, we have set it to ```*``` which indicates that any domain can access this API.
 
    cors.config:
        enabled: true
        allowedHeaders: ['x-csrf-token', 'content-type']ones.
        allowedMethods: ['GET', 'POST', 'PATCH', 'DELETE']
        allowedOrigins: ['*']
        exposedHeaders: false
        maxAge: false
        supportsCredentials: true
        
 
 #### Drupal is now configured for our application!
 
 ## What Our Application Needs

 ### 1. Install Axios and React Router DOM
  * **Axios:** Allows us to make our HTTP requests from React to interact with our Drupal API.
  * **React Router DOM:** Allows for us to link to other components.
  
   **Note:** These commands will need to be run in the root directory.
  
        npm install --save axios react-router-dom
 

 ### 2. Create Home.js
 We are going to need to create a landing page to display our Articles. To do this, we will need a new component. Let's start by creating a folder named `components` in the `base` directory to store all of our components we will create going forward. 
 
 Then, let's create a directory specific to this component named `Home`. We can add any files related to our Home component here, such as CSS files.
 
 Now let's create our script `Home.js` inside of the `Home` folder.
 
  This script will do the following.
   1. Make a request using Axios to get a session token from Drupal.
   2. Attach the token to the header to make another request to our API we created earlier, and collect the data in JSON format.
   3. Take the returned Articles and pass them into our **article** state defined in the constructor.
   
 
    import React from 'react';
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
    };
    
    export default Home;
 
 ### 3. Create ArticleTeaser.js
 Let's start by creating a new directory for this component named `ArticleTeaser` in the `components` folder.
 
 This will be our sub-component of the Home component. The purpose of this is to take in the data from `Home.js` and render a teaser display for each article.
 
 Now let's create our script `ArticleTeaser.js` inside of the `ArticleTeaser` folder.
 
 This script will do the following.
 
 1. Declare the properties we will need from our API.
 2. Define the types of each property.
 3. Create the markup we will use to display the article teaser.
  
  
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
        
 ### 4. Update Home.js
 Now that we created an article teaser component, we can pass the data from our API to the component. 
 
 To do this, we will first need to include `ArticleTeaser.js`
 
        import ArticleTeaser from "./components/ArticleTeaser/ArticleTeaser";
        
 Now that we have a access to the component, we can create the render function and define what to display on the home page. 
 This will: 
 1. Loop through all of the articles retrieved from our API request.
 2. Create a new Article Teaser.
 3. Assign the property keys as defined in [Step 3](#3-create-articleteaserjs) a value from our **article** state.
 
 ```
 render() {
    return (
      <div className="container">
         <div className="row">
            <div className="col-md-12" align="center">
               <h1 className="title">All Articles</h1>
                  {this.state.articles.map(({title, field_image, body}, index) => (
                     <ArticleTeaser
                       key={index}
                       title={title[0].value}
                       image={field_image[0]}
                       content={`${body[0].value.substring(0, 250)}...`}
                     />
                  ))}
            </div>
         </div>
      </div>
    );
 }
 ```
    
### 5. Update App.js
 Now that we have created a directory of all the components we need, we will update `App.js` to include our new home page.
 
 Our `App.js` file is going to act as a router for any page we create. To do so, we first need to install React Router DOM.
 
 **Note:** This command will need to be run in the root directory.
    
    npm install react-router-dom
 
 We will then update our file to include the Home component and define our route.
  
    import React from 'react';
    import ReactDOM from 'react-dom';
    import {
        BrowserRouter as Router,
        Route,
    } from 'react-router-dom';
    import Home from './components/Home/Home';
    
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
    ReactDOM.render(<App />, document.getElementById('app'));
    

### 6. Build Your Environment
We now have a working React application using Drupal as a backend!

**Note:** This command will need to be run in the root directory.

If you are manually configuring the application in the `Base` directory you will use

     npm run base
     
 Otherwise you can build from our `Checkpoint1` directory which includes all of the changes we have completed so far.
 
      npm run cp1
      
### 7. View Your App!
Go to http://localhost:3000/.


When you are ready you can continue with [Starting from Checkpoint 1](../Checkpoint1/README.md).