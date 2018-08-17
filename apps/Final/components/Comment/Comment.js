import React from 'react';
import PropTypes from 'prop-types';
import './comment.css';

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