import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './card.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }

  onChange = (e) => {
    const val = e.target.value;
    const {
      edit,
      card,
      id,
      author,
    } = this.props;
    edit(card.columnId, card.id, id, val, author);
  }

  handleKeyDown = (e) => {
    const keyValue = e.key;
    if (keyValue === 'Enter') {
      e.preventDefault();
      this.handleSubmit();
    }
  }

  handleSubmit = () => {
    const { isEditable } = this.state;
    const {
      add,
      card,
      id,
      author,
    } = this.props;
    if (isEditable) {
      add(card.columnId, card.id, id, this.comment.innerText, author);
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
      card,
    } = this.props;
    return (
      <div className="comment">
        <div
          role="presentation"
          style={
            {
              padding: '10px',
              boxSizing: 'border-box',
              backgroundColor: isEditable ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.2)',
            }
          }
          onKeyDown={this.handleKeyDown}
          className="comment_textarea"
          ref={ref => this.comment = ref}
          onChange={this.onChange}
          contentEditable={(author === user && isEditable)}
        >
          {text}
        </div>
        {(author === user) && (
          <div style={{ marginTop: '5px'}}>
            <button
              type="button"
              style={{ float: 'right' }}
              className="button"
              onClick={() => {
                deleteComment(card.columnId, card.id, id);
              }}
            >
                delete
            </button>
            <button
              type="button"
              style={{ float: 'right' }}
              className="button"
              onClick={() => {
                this.handleSubmit();
              }}
            >
              {(isEditable) ? 'Save' : 'Edit'}
            </button>
          </div>
        )}
        <div style={{
          marginTop: '5px', marginLeft: '5px', float: 'left', wordBreak: 'normal', maxWidth: '60px', fontSize: '14px',
        }}
        >
          Author:
          {author}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  edit: PropTypes.func.isRequired,
  add: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  card: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
