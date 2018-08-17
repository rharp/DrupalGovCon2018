# Building the Base application
We have already created the base application to expedite the training process and get hands on with Drupal's API. However, if you would like more information on the steps required to build our base React application, you can find the answers here.
 
Before starting, Make sure you have the [Prerequisites](../README.md)!

## How Was This Created?

### 1. Lets set up our Environment
Since we will be using npm, we need to initialize our npm project. To do this we will use the terminal to navigate to the root directory of the folder we would like to use for our application Then run `npm init`. You will be prompted with a list of options to fill out relevant to your application, but none of the option will matter for what we are doing. 


### 2. Install React and ReactDom
Before we get started we need to install some base packages with npm to create the react application 

**Note:** These commands will need to be run in the root directory.

     npm install --save react react-dom

   * **React:** gives us access to all the react functionality including things such as JSX which is xml style syntax inside of js. 
   * **React-dom:** Used with react applications to create Virtual Dom which it makes changes against to avoid multiple queries against the actual DOM. Compares changes vs what the Virtual dom originally got from the dom then updates the dom based on that.

### 3. Setup our file structure
From here, we are going to create the file structure for our application. First we will create an `apps` folder then inside of apps another folder named `Base`. This is where we will putting our application files.

### 4. Create index.html
This file will be created inside of the `apps` directory. All of our versions will be using this file and it will not change.
 
The file will act as the markup that the page will display by default. We are including bootstrap css for some base styling.

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
    
### 5. Create App.js
We will be adding this file inside of our `/apps/Base` folder.

 This will acts as a basic React component. 
 
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
    
### 6. Install More Node Modules
**Note:** These commands will need to be run in the root directory.

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
 

### 7. Create  webpack.config.js
We will create this file in the root directory.

 Now that we have added all the required packages, we need to configure webpack so it knows what to do!
 
 Here we will pass the javascript and any css files through a series of transformations. 
We are going to be including any javascript not in node_modules and passing it through babel. Then any css not in node_modules then passing it through style-loader and css-loader. The files it will be transforming will be any file included in our components.

After all the transformations have been made, webpack will create or update the folder `build` and compile everything into `transformed.js`.

 The HtmlWebpackPlugin will be used to set the template for the markup which will be generated to include all of our javascript in the `build` directory. We are going to pass our original `index.html` we created.
 
 Finally, we are going to set the port for the dev server to `3000`
 
     const HtmlWebpackPlugin = require('html-webpack-plugin');
     
     module.exports = {
         context: __dirname,
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
     
### 8. Add NPM scripts to package.json
 One thing we can do with npm is create some custom scripts. This will make our build process slightly easier. Inside the `package.json` which exists in the root directory, we will add this code snippet to the bottom of the file.
 
     "scripts": {
         "base": "webpack ./apps/Base/App.js && webpack-dev-server ./apps/Base/App.js",
         "cp1": "webpack ./apps/Checkpoint1/App.js && webpack-dev-server ./apps/Checkpoint1/App.js",
         "cp2": "webpack ./apps/Checkpoint2/App.js && webpack-dev-server ./apps/Checkpoint2/App.js",
         "final": "webpack ./apps/Final/App.js && webpack-dev-server ./apps/Final/App.js"
     },
     
Here we are defining entry points for webpack and webpack-dev-server to build on this will always point to `App.js` for the corresponding version.

Now that the scripts have been added we can type in these commands to generate the application.

**Note:** These commands will need to be run in the root directory.

     npm run base
     
### 10. View your App!
Now is the moment you've been waiting for. You have a working React Application!

* Go to http://localhost:3000/

When you are ready you can continue with [Starting with the Base application](./Base/README.md).
