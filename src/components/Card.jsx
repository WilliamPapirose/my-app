import React from 'react';
import { PropTypes } from 'prop-types';


const Card = ({
  text,
  author,
  user,
  deleteCard,
}) => (
  <React.Fragment>
    <div className="card">
      <p className="left">
        Author: {author}
      </p>
      <p className="right">
        Comments:
      </p>
      {text}
      <div className="card_buttons">
        <button
          type="button"
          className="button button_card button_left"
        >
          More information
        </button>
        {user.name === author && (
          <button
            type="button"
            className="button button_card button_right"
            onClick={deleteCard}
          >
          X
          </button>
        )}
      </div>
    </div>
  </React.Fragment>
);

Card.propTypes = {
  text: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  deleteCard: PropTypes.func.isRequired,
};

export default Card;
