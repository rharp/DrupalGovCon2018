# Off With the Head (Of Drupal)
### Goals
This training is meant to provide you all the information required to decouple an existing Drupal 8 project. In doing so, we will be teaching you some of the basics of React as a front-end application, and how it interacts with Drupal's RESTful Web Services. 

The steps we will be taking:

* Set-up your local environment
* Configure existing Drupal environment
* Create a connection to Drupal environment
* Display a page that lists articles
* Display a single article page
* Create comments in an individual article front-end


### Assumptions
* You know Drupal.
    * This is not a Drupal 101 training. You should know your way around Drupal site-building and basic development.

* You are comfortable with front-end development.
    * You should know basic Javascript.
 
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

##  Documentation
We have broken this training into multiple sections. If you have missed a step, or would like a better understanding of the process, you can reference the documentation here.

[Building the Base application](/apps/README.md) (This will only briefly be covered in the training, but here is how we did it)

[Starting with the Base application](/apps/Base/README.md)

[Starting from Checkpoint 1](/apps/Checkpoint1/README.md)

[Starting from Checkpoint 2](/apps/Checkpoint2/README.md)

### Building from a different application folder
If you would like to build your application from any of the starting points, you can use one of the defined npm scripts to specify which directory you are now working from.

**Note:** This command will need to be run in the root directory.

    npm run base
    npm run cp1
    npm run cp2
    npm run final
    
Your application can then be viewed at http://localhost:3000
