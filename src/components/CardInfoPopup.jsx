import React from 'react';
import PropTypes from 'prop-types';
import Description from './Description';
import Comments from './Comments';

const CardInfoPopup = ({
  user,
  hide,
  card,
  columnName,
  editDescription,
  comments,
  addComment,
  deleteComment,
  editComment,
}) => (
  <div>
    <div className="fade_inf" />
    <div className="window">
      <div className="popup">
        <div className="head">
          <p className="author">
            Author:&nbsp;
            {card.author}
          </p>
          <p className="card_name">{card.name}</p>
          <p className="column_name">{columnName}</p>
          <div className="buttons">
            <button
              type="button"
              className="button plus right"
              onClick={hide}
            >
              X
            </button>
          </div>
        </div>
        <Description
          editDescription={editDescription}
          card={card}
          user={user}
        />
        <Comments
          comments={comments}
          user={user}
          addComment={addComment}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  </div>
);

CardInfoPopup.propTypes = {
  user: PropTypes.string.isRequired,
  columnName: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  editDescription: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

export default CardInfoPopup;
