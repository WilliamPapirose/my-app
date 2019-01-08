import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }

  componentDidUpdate() {
    const { isEditable } = this.state;
    if (isEditable) this.comment.focus();
  }

  handleKeyDown = (e) => {
    const keyValue = e.key;
    if (keyValue === 'Enter') {
      e.preventDefault();
      this.editComment();
    }
  }

  editComment = () => {
    const { isEditable } = this.state;
    const { editComment, id } = this.props;
    if (isEditable && this.comment.innerText) {
      editComment(id, this.comment.innerText);
      this.setState({ isEditable: false });
    } else {
      this.setState({ isEditable: true });
    }
  }

  render() {
    const { isEditable } = this.state;
    const {
      id,
      text,
      author,
      user,
      deleteComment,
    } = this.props;
    return (
      <div className="comment">
        <div
          role="presentation"
          className={
            isEditable ? 'comment_textarea' : 'comment_textarea transparant'}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => { this.comment = ref; }}
          contentEditable={(author === user && isEditable)}
        >
          {text}
        </div>
        {(author === user) && (
          <div className="comment_footer">
            <button
              type="button"
              className="button right"
              onClick={() => {
                deleteComment(id);
              }}
            >
                delete
            </button>
            <button
              type="button"
              className="button right"
              onClick={this.editComment}
            >
              {(isEditable) ? 'Save' : 'Edit'}
            </button>
          </div>
        )}
        <div className="comment_author">
          Author:&nbsp;
          {author}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  editComment: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
