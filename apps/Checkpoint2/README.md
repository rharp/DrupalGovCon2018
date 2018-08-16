# Starting from Checkpoint 2
Previously in [Starting from Checkpoint 1](../Checkpoint1/README.md), we linked our article teasers from the home page to a separate landing page. This page was rendered by the NID that had been passed in the url. 

Now, we are going to configure Drupal to return the comments for each node. Then we will render these comments in our React application on the existing node page.

After we have the list of comments, we are going to create a form in React. This form will allow for our anonymous users to post their own comment for the article they are viewing. Once the user submits the comment, it will be sent to Drupal and inserted into the database and rendered in our previously created comments section.

## What Drupal Needs
