import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';

import Arrow from '../Carrousel/Arrow';
import Card from '../Card';

const Recommendations = ({ recommendations, type }) => {
  const sliderSettings = {
    dots: false,
    slidesToShow: 7,
    slidesToScroll: 7,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <div className="recommendation">
      <h1>Recommendations</h1>
      <Slider {...sliderSettings} className="slider">
        {recommendations.map((recommendation) => (
          <div className="recommendation-card" key={recommendation.id}>
            <Card type={type} data={recommendation} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

Recommendations.propTypes = {
  type: PropTypes.string,
  recommendations: PropTypes.array,
};

Recommendations.defaultProps = {
  type: '',
  recommendations: [],
};

export default Recommendations;
