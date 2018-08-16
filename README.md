# Off With the Head (Of Drupal)

### Assumptions
* You know Drupal.
    * This is not a Drupal 101 training. You should know your way around Drupal site-building and basic development.

* You are comfortable with front-end development.
    * You should know basic Javascript. ES6 knowledge is a plus.
 
 ### Requirements
 For this training you will required to use **npm**.
 
 To see if you currently have npm installed, you can run `npm --version` in the terminal and check. If it is not currently installed, you can download it at https://nodejs.org/en/.
 
 ### Get the Environment Set Up!
 You can do this a couple of different ways:
 * Git: If you have Git installed, you can clone the repository.
 * Download and unzip the file.
 
 After the repository is on your computer, you will need to  navigate to the root folder in your terminal and run 
 
    npm install
    
 This will install the packages required for the training.
 ### Versions
 We have broken this training into different version folders in the case that you are falling behind, or would like to see the steps that we took to create each version of the application.

##### Version Documentation

[Version 1](/apps/v1/README.md)

[Version 2](/apps/v2/README.md)

[Version 3](/apps/v3/README.md)

[Version 4](/apps/v4/README.md)

##### Building a Different Version
If you would like to build a different version of the application, you can use one of the defined npm scripts to specify which version.

**Note:** This command will need to be run in the root directory.

    npm run build
    npm run buildv2
    npm run buildv3
    npm run buildv4
    
And view the application at http://localhost:3000.
