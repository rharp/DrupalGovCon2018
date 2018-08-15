# Version 1
In this version we have created a basic React application as a starting point to begin your project. Make sure you have the [Prerequisites](../../README.md) before continuing with this step.

## How Was This Version Created?

### 1. Install React and ReactDom
Before we get started we need to install some base packages with npm to create the react application 

     npm install --save react react-dom

   * **React:** gives us access to all the react functionality including things such as JSX which is xml style syntax inside of js. 
   * **React-dom:** Used with react applications to create Virtual Dom which it makes changes against to avoid multiple queries against the actual DOM. Compares changes vs what the Virtual dom originally got from the dom then updates the dom based on that.

### 2. Create index.html
This will act as the markup the page will display by default. We are including bootstrap css for some base styling.

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
    
 ### 4. Install More Node Modules
 We are going to need some more libraries to enable us to build our application.
 
 #### Babel
  In our case used to convert reacts JSX(xml inside of js) into a minified js file so it can be interpreted by the browser
        
        npm install --save-dev babel-core babel-loader babel-preset-react
    
 #### CSS Loader and Style Loader
 Similar to babel except takes all css and adds it to the transformation file.
 
     npm install css-loader style-loader --save-dev 
   
 #### Webpack
 * **Webpack:** using this to run the React Application through various transformations such as utilizing babel for js and css-loader for css.(similar transformations can be done with things such as less and svg’s)
 * **Webpack-dev-server:** used to spin up a small server using the webpack bundle which will listen for changes in files and react accordingly.
    
          npm install --save-dev webpack webpack-dev-server html-webpack-plugin webpack-cli 
   

 ### 5. Create  webpack.config.js
 Now that we have added all the required packages, we need to configure webpack so it knows what to do! 
 
 Here we will define the `version` folder we would like to build from to start with, if ever you would like to build from a different version folder this is where you will change it.
 
 The `entry` point will be the base component file we will be building from. In this case we will always point it to the `App.js` file we created earlier.
 
 From here we will pass the javascript and any css files through a series of transformations. 
We are going to be including any javascript not in node_modules and passing it through babel. Then any css not in node_modules then passing it through style-loader and css-loader.

After all the transformations have been made, we will create or update the folder `build/` and compile it all in the `transformed.js` file.

 The HtmlWebpackPlugin will be used to set the template for the markup which will be generated to include all of our javascript in `/build` . We are going to pass our original `index.html` we created.
 
 Finally, we are going to set the port for the dev server to `3000`
 
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     const version = 'v1';
     
     module.exports = {
         context: __dirname,
         entry: './apps/' + version + '/App.js',
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
     
 ### 6. Add NPM scripts to package.json
 One thing we can do with npm is create some custom scripts. This will make our build process slightly easier. Inside the `package.json`which is generated by node, we will add this code snippet to the bottom of the file.
 
     "scripts": {
         "build": "webpack",
         "start": "webpack-dev-server"
     },
     
### 7. Build your environment
Now that the scripts have been added we can type in these commands to generate the application.

     npm run build
     npm run start
     
### 8. View your App!
Now is the moment you've been waiting for. You have a working React Application!

go to http://localhost:3000/
