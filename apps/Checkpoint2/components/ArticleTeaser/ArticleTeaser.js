import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ArticleTeaser = ({title,content,image, nid}) => {
    return (
        <div>
            <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
            <h2>{title}</h2>
            {content}
            <Link to={`/node/${nid}`}>Read More</Link>
        </div>
    );
};

ArticleTeaser.defaultProps = {
    title: '',
    content: '',
    image: {},
    nid: ''
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
    nid: PropTypes.number,
};

export default ArticleTeaser;