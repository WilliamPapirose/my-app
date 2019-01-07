import React, { Component } from 'react';
import './card.css';
import PropTypes from 'prop-types';
import CardName from './Name.jsx';

class Card extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
    };
  }

  rename = (name) => {
    this.setState({ name });
    const { save, id } = this.props;
    save(name, id);
  }

  render() {
    const {
      user,
      id,
      column,
      columnId,
      author,
      comments,
      showInfo,
      del,
    } = this.props;
    const { name } = this.state;
    return (
      <div className="card">
        <div style={{ height: '22px' }}>
          <p style={{ float: 'left' }}>
            Author:
            {author}
          </p>
          <p style={{ float: 'right' }}>
            Comments:
            {(comments[id] == null) ? 0 : comments[id].filter(x => x !== null).length}
          </p>
        </div>
        <CardName
          user={user}
          author={author}
          name={name}
          rename={this.rename}
        />
        <div style={{ height: '37px' }}>
          <button
            type="button"
            className="button button_card"
            style={{ float: 'left', marginLeft: 0 }}
            onClick={() => {
              showInfo(name, column, author, columnId, id);
            }}
          >
            More information
          </button>
          <button
            type="button"
            className="button button_card"
            style={{ float: 'right', marginRight: 0 }}
            onClick={() => {
              if (user === author) del(id);
            }}
          >
           X
          </button>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  columnId: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  del: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfo: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
  column: PropTypes.object.isRequired,
};

export default Card;
