# Version 1
In this version we have created a basic React application as a starting point to begin your project.

## How is this created?

### 1. Install React and ReactDom
     npm install --save react react-dom
   * react: gives us access to all the react functionality including things such as JSX which is xml style syntax inside of js. 
   * React-dom: Used with react applications to create Virtual Dom which it makes changes against to avoid multiple queries against the actual DOM. Compares changes vs what the Virtual dom originally got from the dom then updates the dom based on that.
### 2. Create index.html
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
 ### 3. Create app.js
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
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './components/app/app';
    
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
 ### 5. Install Babel
     npm install --save-dev babel-core babel-loader babel-preset-react
   * Babel: In our case used to convert reacts JSX(xml inside of js) into a minified js file so it can be interpreted by the browser.Create CSS file
    
 ### 6. Install CSS Loader
     npm install css-loader style-loader --save-dev 
   * Similar to babel except takes all css and adds it to the transformation file.
   
 ### 7. Install Webpack
     npm install --save-dev webpack webpack-dev-server html-webpack-plugin webpack-cli 
   * Webpack: using this to run the React Application through various transformations such as utilizing babel for js and css-loader for css.(similar transformations can be done with things such as less and svg’s)
   * Webpack-dev-server: used to spin up a small server using the webpack bundle which will listen for changes in files and react accordingly.

 ### 8. Create  webpack.config.js
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
     
 ### 9. Add NPM scripts to package.json
     "scripts": {
         "build": "webpack",
         "start": "webpack-dev-server"
     },
     
### 10. Build your environment
     npm run build
     npm run start
     
### 11. View your App!
go to http://localhost:3000/
