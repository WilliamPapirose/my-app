import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

class Comments extends Component {
  handleKeyDown = (event) => {
    const {
      addComment,
      user,
    } = this.props;
    const keyValue = event.key;
    if (keyValue === 'Enter') {
      event.preventDefault();
      addComment(this.comment.value, user);
    }
  };

  addComment = () => {
    const { addComment, user } = this.props;
    if (this.comment.value !== '') {
      addComment(this.comment.value, user);
      this.comment.value = '';
    }
  }

  render() {
    const {
      comments,
      user,
      editComment,
      deleteComment,
    } = this.props;
    return (
      <div className="comments">
        <div className="writerCommnets">
          <textarea
            onKeyDown={this.handleKeyDown}
            className="textarea comment_text"
            ref={(ref) => { this.comment = ref; }}
          />
          <button
            type="button"
            className="button plus right"
            onClick={this.addComment}
          >
            Add comment
          </button>
        </div>
        <div className="all_comments">
          {comments.map((comment) => {
            if (comment !== null) {
              return (
                <Comment
                  editComment={editComment}
                  user={user}
                  author={comment.author}
                  text={comment.text}
                  id={comment.id}
                  deleteComment={deleteComment}
                />
              );
            } return null;
          })}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  user: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  editComment: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comments;
