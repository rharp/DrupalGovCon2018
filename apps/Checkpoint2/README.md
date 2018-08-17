# Starting from Checkpoint 2
Previously in [Starting from Checkpoint 1](../Checkpoint1/README.md), we linked our article teasers from the home page to a separate landing page. This page was rendered by the NID that had been passed in the url. 

Now, we are going to configure Drupal to return the comments for each node. Then we will render these comments in our React application on the existing node page.

After we have the list of comments, we are going to create a form in React. This form will allow for our anonymous users to post their own comment for the article they are viewing. Once the user submits the comment, it will be sent to Drupal and inserted into the database and rendered in our previously created comments section.

## What Drupal Needs
### 1. Create Comments REST Service
 For this step, we will need to create a View inside of Drupal to expose the comments for all nodes. 
 *  Go to `http://18.188.24.108/admin/structure/views/add`.
 *  For our example, we will enter the following: 
    *   View Name : ``Comments API``
    *   View Settings 
        * show: `Comments` 
        * type : ``comment``
        * sorted by: `Newest first`
    *   REST Export Settings
        *  Enable ``Provide a REST export``
        *   REST export path: ``api/comments``
     *  Save and Edit
     
  Now, inside the view configuration we will do a few different thing. 
  
  We need to allow for the NID to be passed to the view in order to display only relevant comments.
  * Contextual filter: of `ID` for the Content category.
    * Filter value not available: Display contents of "No results found"
  
  We need to Remove the required approval to display comments, since we want to see added comments instantly.
   * Remove the filter criteria of Comment: Approved status(= Yes)
   
  We need to limit the comments to display to 3 items. This way we will only have the 3 most recent comments.
   * Pager: Items to display = 3 items
  
  After all of that we can Save and exit the configuration form.
    
### 2. Configure RestUI
For this process, we will need to be able to send user comments back to Drupal. To do this we will use our contributed module RestUI.


 **Note:** The following paths are based on the a Drupal instance for training at http://18.188.24.108. This will need to be changed to point to your Drupal instance.

* Go to `http://18.188.24.108/admin/config/services/rest`.
* Enable the `Comment` Resource (this will bring you to the configuration page).
    *  For our example we will use the following settings:
        *   Granularity : ``Resource``
        *   Methods : ``POST``
        *   Accepted request formats : ``json``
        *   Authentication providers: ``basic_auth and cookie``
        *   Save Configuration
        
 ## What Our Application Needs
 
 ### 1. Create Comment.js
 Let's start by creating a new directory for this component named `Comment` in the `components` folder.
  
  This will be our sub-component of the Article component. The purpose of this is to take in the data from `Article.js` and render the comment display for each comment.
  
  Now let's create our script `Comment.js` inside of the `Comment` folder.
  
  This script will do the following.
  
  1. Declare the properties we will need from our API.
  2. Define the types of each property.
  3. Create the markup we will use to display the Comment.
   
   
         import React from 'react';
         import PropTypes from 'prop-types';
         
         const Comment = ({title, content}) => (
             <div className="row">
                 <div className="comment">
                     <div className="col-md-12">
                         <h2 className="comment__title">{title}</h2>
                         {content}
                     </div>
                 </div>
             </div>
         );
         
         Comment.defaultProps = {
             title: '',
             content: '',
         };
         
         Comment.propTypes = {
             title: PropTypes.string.isRequired,
             content: PropTypes.string.isRequired,
         };
         
         export default Comment;
       
 ### 2. Update Article.js
 First we need to import the comment component
 
    import Comment from '../Comment/Comment'
 
 Add `comments: []` to the sate.
 
 Add to the bottom of the `componentDidMount()` function. After our article request.
       
       this.ajax.get(`/api/comments/${this.props.match.params.nid}?_format=json`).then(function(comments) {
            component.setState({
                comments: comments.data
            });
        });
        
 Add after the article data row
 
    <div className="row">
       <div className="col-md-12" align="center">
           {this.state.comments.map(({subject, comment_body}) => (
              <Comment
                  title={subject[0].value}
                  content={comment_body[0].value}
              />
           ))}
       </div>
    </div>
    
 Render application to display recent comments. `npm run base`
 
 Now lets create our form for users to create a new comment under our comments row
 
     <div className="row">
        <div className="col-md-12" align="center">
           <form onSubmit={this.handleSubmit} >
               <div className="col-md-2">
                 <label>Comment:</label>
               </div>
               <div className="col-md-8">
                  <textarea id="comment" value={this.state.value} onChange={this.handleChange} />
               </div>
               <div className="col-md-2">
                  <input type="submit" value="Submit" />
               </div>
            </form>
          </div>
      </div>
      
  Add `comment: ''` to state
      
 Create functions
 
    handleSubmit(event) 
    handleChange(event)
 
 bind component to this object in constructor
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
 Add code to `handleChange(event)`
 
    handleChange(event) {
        this.setState({comment: event.target.value});
    }
 
 Create function for rendering our comments then move all code from `componentDidMount()` and move it to `getComments()`
 
    getComments(){
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
                })
                this.ajax.get(`/node/${this.props.match.params.nid}?_format=json`).then(function(article) {
                    component.setState({
                        article: {
                            title: article.data.title[0].value,
                            body: article.data.body[0].value,
                            imageURL: article.data.field_image[0].url,
                            date: article.data.field_date[0].value,
                        },
                    });
    
                })
                this.ajax.get(`/api/comments/${this.props.match.params.nid}?_format=json`).then(function(comments) {
                    component.setState({
                        comments: comments.data
                    });
                });
            })
        }

Add `this.getcomments();` into the now empty `componentsDidMount();`
 

 write code in handle submit
 
    handleSubmit(event) {
            event.preventDefault();
            const baseURL = 'http://18.188.24.108';
            const tokenURL = baseURL + '/rest/session/token';
            const tokenReq = axios.get(tokenURL);
            tokenReq.then((response) => {
                this.ajax = axios.create({
                    baseURL,
                    headers: {
                        'X-CSRF-Token': response.data,
                    },
                })
                this.ajax.post(`/entity/comment`, {
                    "entity_id":[{"target_id":3}],
                    "entity_type":[{"value":"node"}],
                    "comment_type":[{"target_id":"comment"}],
                    "field_name":[{"value":"field_comment"}],
                    "subject":[{"value":`${this.state.comment.substring(0, 15)}`}],
                    "comment_body":[
                        {"value":`${this.state.comment}`}
                    ]
                });
            }).then(()=> {
                this.getComments();
            });
    
        }