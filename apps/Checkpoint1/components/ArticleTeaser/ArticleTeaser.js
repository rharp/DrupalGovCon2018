import React from 'react';
import PropTypes from 'prop-types';

const ArticleTeaser = ({title,content,image}) => {
    return (
        <div>
            <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
            <h2>{title}</h2>
            {content}
        </div>
    );
};

ArticleTeaser.defaultProps = {
    title: '',
    content: '',
    image: {},
};

ArticleTeaser.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.shape({
        url: PropTypes.string,
        height: PropTypes.number,
        width: PropTypes.number,
        alt: PropTypes.string,
    }),
};

export default ArticleTeaser;