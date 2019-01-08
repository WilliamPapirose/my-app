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
    const { edit, id } = this.props;
    edit(name, id);
  }

  render() {
    const {
      user,
      id,
      columnId,
      author,
      commentsCount,
      showInfoPopup,
      del,
    } = this.props;
    const { name } = this.state;
    return (
      <div className="card">
        <div>
          <p className="left">
            Author:&nbsp;
            {author}
          </p>
          <p className="right">
            Comments:&nbsp;
            {commentsCount}
          </p>
        </div>
        <EditableTitle
          canEdit={user === author}
          name={name}
          rename={this.rename}
        />
        <div className="card_buttons">
          <button
            type="button"
            className="button button_card button_left"
            onClick={() => {
              showInfoPopup({ columnId, id });
            }}
          >
            More information
          </button>
          {(user === author) && (
            <button
              type="button"
              className="button button_card button_right"
              onClick={() => {
                del(id);
              }}
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
  del: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfoPopup: PropTypes.func.isRequired,
  commentsCount: PropTypes.number.isRequired,
};

export default Card;
