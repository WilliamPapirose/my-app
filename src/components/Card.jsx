import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EditableTitle from './EditableTitle';

class Card extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
    };
  }

  rename = (name) => {
    const { editCard, id, columnId } = this.props;
    editCard(name, columnId, id);
  }

  deleteCard = () => {
    const { deleteCard, id, columnId } = this.props;
    deleteCard(columnId, id);
  }

  showInfoPopup = () => {
    const { id, columnId, showInfoPopup } = this.props;
    showInfoPopup({ columnId, id });
  }

  render() {
    const {
      user,
      author,
      commentsCount,
    } = this.props;
    const { name } = this.state;
    return (
      <div className="card">
        <p className="left">
          Author: {author}
        </p>
        <p className="right">
          Comments: {commentsCount}
        </p>
        <EditableTitle
          canEdit={user === author}
          name={name}
          rename={this.rename}
        />
        <div className="card_buttons">
          <button
            type="button"
            className="button button_card button_left"
            onClick={this.showInfoPopup}
          >
            More information
          </button>
          {user === author && (
            <button
              type="button"
              className="button button_card button_right"
              onClick={this.deleteCard}
            >
            X
            </button>
          )}
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  columnId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfoPopup: PropTypes.func.isRequired,
  commentsCount: PropTypes.number,
};

Card.defaultProps = {
  commentsCount: 0,
};

export default Card;
