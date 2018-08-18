import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({title,content}) => {
    return (
        <div >
            <h2>{title}</h2>
            {content}
        </div>
    );
};

Comment.defaultProps = {
    title: '',
    content: '',
};

Comment.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
};

export default Comment;
