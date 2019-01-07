import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment.jsx';

const handleKeyDown = (event, addComment, card, user, comment) => {
  const keyValue = event.key;
  if (keyValue === 'Enter') {
    event.preventDefault();
    if (comment.value !== '') {
      addComment(card.columnId, card.id, card.comments.length, comment.value, user);
      comment.value = '';
    }
  }
};

const CommentForm = ({
  addComment,
  card,
  user,
  edit,
  deleteComment,
}) => {
  let comment;
  return (
    <div>
      <div className="writerCommnets">
        <textarea
          style={{ height: '120px' }}
          onKeyDown={(event) => {
            handleKeyDown(event, addComment, card, user, comment);
          }}
          className="textarea comment_text"
          ref={ref => comment = ref}
        />
        <button
          type="button"
          className="button plus"
          style={{ float: 'right' }}
          onClick={() => {
            if (comment.value !== '') {
              addComment(card.columnId, card.id, card.comments.length, comment.value, user);
              comment.value = '';
            }
          }}
        >
          Add comment
        </button>
      </div>
      <div className="information">
        {(card.comments == null) ? [] : card.comments.map((comment)=>{
          if (comment !== null) {
            return (
              <Comment
                edit={edit}
                add={addComment}
                user={user}
                author={comment.author}
                text={comment.text}
                id={comment.id}
                card={card}
                deleteComment={deleteComment}
              />
            );
          } return null;
        })}
      </div>
    </div>
  );
};

CommentForm.propTypes = {
  user: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  edit: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentForm;
