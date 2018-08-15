# Version 1
In this version, we have created a basic React application as a starting point to begin your project. Make sure you have the [prerequisites](../../README.md) before continuing with this step.

## How Was This Version Created?

### 1. Install React and ReactDom
Before we get started, we need to install some base packages with npm to create the React application. 

     npm install --save react react-dom

   * **React:** Gives us access to all the React functionality including JSX. JSX is XML style syntax inside of JS. 
   * **React-dom:** Used with React applications, it creates and then changes Virtual DOM to avoid multiple queries against the actual DOM. It also compares changes against what the Virtual DOM originally replicated from the DOM; it then updates the DOM based on these comparisons.

### 2. Create index.html
This will act as the markup, in which the page will display by default. We are including Bootstrap CSS for some base styling.

**Note:** The div with the id of "app" will be targeted later to render the application inside of.

    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <title>Drupal GovCon 2018</title>
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        </head>
        <body>
            <div id="app"></div>
        </body>
    </html>
    
 ### 3. Create App.js
 This is a basic React component. 
 
 Each React component requires returned markup from the render function. We will also need to use ReactDOM to render our component App with the `<App />` tag inside of the app div we created in `index.html`. 
 
 In this case, we will return some basic markup to display "Hello World". 
 
     import React from 'react';
     import ReactDOM from 'react-dom';
     
     class App extends React.Component {
         render() {
             return (
                 <div className="container">
                     <h1>Hello World!</h1>
                 </div>
             );
         }
     }
     
     ReactDOM.render(<App />, document.getElementById('app'));
     
 ### 4. Create index.js
 We are going to create our index Javascript, which points to our `App.js` file. We will need this for later.
 
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/App/App';
    
    ReactDOM.render(<App />,document.getElementById('app'));
    
 ### 5. Install More Node Modules
 We are going to need some more libraries to build our application.
 
 #### Babel
  In this case, it is used to convert React's JSX (XML inside of JS) into a minified version, so it can be interpreted by the browser.
        
        npm install --save-dev babel-core babel-loader babel-preset-react
    
 #### CSS Loader and Style Loader
 Similar to Babel, it takes all CSS files and adds it to the transformation file.
 
     npm install css-loader style-loader --save-dev 
   
 #### Webpack
 * **Webpack:** Runs the React application through various transformations, such as utilizing Babel for JS and css-loader for CSS (similar transformations can be done with CSS preprocessors and SVGs).
 * **Webpack-dev-server:** Spins up a small server using the Webpack bundle. This will listen for changes in files and perform accordingly.
    
          npm install --save-dev webpack webpack-dev-server html-webpack-plugin webpack-cli 
   

 ### 6. Create webpack.config.js
 Now that we have added all the required packages, we need to configure Webpack so it knows what to do! 
 
 Here we will define the `version` we would like to build our application from. If you would like to build from a different version folder, change the version variable.
 
 The `entry` point will be the base component file we will be building from. In this case, we will always point it to the `index.js` file we created earlier.
 
 From here, we will pass the Javascript and any CSS files through a series of transformations. 
We are going to include any Javascript (not in node_modules directory) and pass it through Babel. Then, any CSS (not in node_modules directory) should be passed through style-loader and css-loader.

After all the transformations have been made, we will create or update the folder `build/` and compile it all in the `transformed.js` file.

 The HtmlWebpackPlugin will be used to set the template for the markup, which will include all of our Javascript in `/build` directory. We are going to pass our original `index.html` we created.
 
 Finally, we are going to set the port for the dev server to `3000`
 
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     const version = 'v1';
     
     module.exports = {
         context: __dirname,
         entry: './apps/' + version + '/index.js',
         module: {
             rules: [
                 {
                     test: /\.js?$/,
                     exclude: "/node_modules/",
                     loader: 'babel-loader',
                     query: {
                         presets: ['react']
                     }
                 },
                 {
                     test: /\.css?$/,
                     exclude: "/node_modules/",
                     use: ['style-loader','css-loader']
                 }
             ]
         },
         output: {
             filename: 'transformed.js',
             path: __dirname + '/build'
         },
         plugins: [new HtmlWebpackPlugin({
             template: './apps/index.html'
         })],
         devServer: {
             port: 3000
         }
     };
     
 ### 7. Add NPM Scripts to package.json
 One thing we can do with npm is create custom scripts. This will make our build process slightly easier. Inside the `package.json` which is generated by node, we will add this code snippet to the bottom of the file.
 
     "scripts": {
         "build": "webpack",
         "start": "webpack-dev-server"
     },
     
### 8. Build Your Environment
We can run in the following commands to generate the application.

     npm run build
     npm run start
     
### 9. View Your App!
Now is the moment you've been waiting for. You have a working React Application!

Go to http://localhost:3000/.
