import React from 'react';
import PropTypes from 'prop-types';
import Description from './Description.jsx';
import CommentForm from './CommentForm.jsx';

const CardInfo = ({
  user,
  hide,
  card,
  addDescription,
  changeDescription,
  saveDescription,
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
            Author:
            {card.author}
          </p>
          <p style={{ margin: 0 }}>{card.name}</p>
          <p className="column_name">{card.column}</p>
          <div className="buttons">
            <button
              type="button"
              className="button plus"
              style={{ float: 'right' }}
              onClick={() => {
                hide();
              }}
            >
              X
            </button>
          </div>
        </div>
        <div style={{ display: (card.withDescriprion) ? 'block' : 'none' }}>
          <Description
            addDescription={addDescription}
            changeDescription={changeDescription}
            saveDescription={saveDescription}
            card={card}
          />
        </div>
        <div className="description" style={{ display: (card.withDescriprion || !card.editable) ? 'none' : 'block' }}>
          <button
            type="button"
            className="button plus"
            onClick={() => {
              addDescription(true);
            }}
          >
            Add description
          </button>
        </div>
        <CommentForm
          user={user}
          card={card}
          addComment={addComment}
          edit={editComment}
          deleteComment={deleteComment}
        />
      </div>
    </div>
  </div>
);

CardInfo.propTypes = {
  user: PropTypes.string.isRequired,
  hide: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  addDescription: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  saveDescription: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
};

export default CardInfo;
