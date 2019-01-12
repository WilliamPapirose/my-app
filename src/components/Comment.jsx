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
    if (isEditable) {
      this.comment.focus();
      this.setCursorToEnd(this.comment);
    }
  }

  setCursorToEnd = (element) => {
    const range = document.createRange();
    const sel = window.getSelection();
    range.setStart(element, 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  handleKeyDown = (e) => {
    const keyValue = e.key;
    if (keyValue === 'Enter') {
      e.preventDefault();
      this.saveComment();
    }
  }

  editComment = () => {
    this.setState({ isEditable: true });
  }

  saveComment = () => {
    const { editComment, id } = this.props;
    if (this.comment.innerText) {
      editComment(id, this.comment.innerText);
      this.setState({ isEditable: false });
    }
  }

  deleteComment = () => {
    const { deleteComment, id } = this.props;
    deleteComment(id);
  }

  render() {
    const { isEditable } = this.state;
    const {
      text,
      author,
      user,
    } = this.props;
    return (
      <div className="comment">
        <div
          suppressContentEditableWarning
          role="presentation"
          className={isEditable ? 'comment_textarea' : 'comment_textarea transparant'}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => { this.comment = ref; }}
          contentEditable={author === user && isEditable}
        >
          {text}
        </div>
        {author === user && (
          <div className="comment_footer">
            <button
              type="button"
              className="button right"
              onClick={this.deleteComment}
            >
                delete
            </button>
            {isEditable && (
            <button type="button" className="button right" onClick={this.saveComment}>
              Save
            </button>
            )}
            {!isEditable && (
            <button type="button" className="button right" onClick={this.editComment}>
              Edit
            </button>
            )}
          </div>
        )}
        <div className="comment_author">
          Author: {author}
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
