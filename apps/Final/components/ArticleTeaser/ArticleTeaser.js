import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './article-teaser.css';

const ArticleTeaser = ({title, content, image, nid}) => (
    <div className="article-teaser">
        <img src={image.url} height={image.height} width={image.width} alt={image.alt} />
        <h2 className="article-teaser__title">{title}</h2>
        {content}
        <Link to={`/node/${nid}`} title={title}>Read More</Link>
    </div>
);

ArticleTeaser.defaultProps = {
    title: '',
    content: '',
    image: {},
    nid: '',
};

ArticleTeaser.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    image: PropTypes.shape({
        url: PropTypes.string,
        height: PropTypes.string,
        width: PropTypes.string,
        alt: PropTypes.string,
    }),
    nid: PropTypes.string.isRequired,
};

export default ArticleTeaser;