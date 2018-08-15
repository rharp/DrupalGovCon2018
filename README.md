# Off With the Head (Of Drupal)

### Assumptions
* You know Drupal
    * This is not a Drupal 101 training. You should know your way around Drupal site-building and basic development

* You are comfortable with front-end development
    * You should know basic Javascript. ES6 knowledge is a plus
 
 ### Requirements
 For this training you will required to use **npm**.
 
 To see if you currently have npm installed you can run `npm --version` in the terminal and check. If it is not currently installed you can download it at https://nodejs.org/en/
 
 ### Versions
 We have broken this training into different version folders in the case that you are falling behind, or would like to see the steps that we took to create that version of the application.

##### Version Documentation

[Version 1](/apps/v1/README.md)

[Version 2](/apps/v2/README.md)

[Version 3](/apps/v3/README.md)

[Version 4](/apps/v4/README.md)


##### Building a different version
If you would like to build a different version of the application you will need to change the `version` variable inside of `webpack.config.js` from "v1" to the version of the application you would like to build. 

Then you will need to run the npm scripts 

    npm run build
    npm run start
 