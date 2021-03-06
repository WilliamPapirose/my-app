import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import AddForm from './AddForm';
import EditableTitle from './EditableTitle';

class Column extends Component {
  constructor(props) {
    super(props);
    const { name } = this.props;
    this.state = {
      name,
    };
  }

  rename = (name) => {
    const { renameColumn, id } = this.props;
    renameColumn(name, id);
  }

  addCard = (name) => {
    const { addCard, id } = this.props;
    addCard(name, id);
  }

  deleteCard = (cardId) => {
    const { deleteCard, id } = this.props;
    deleteCard(id, cardId);
  }

  editCard = (name, cardId) => {
    const { editCard, id } = this.props;
    editCard(name, id, cardId);
  }

  render() {
    const { name } = this.state;
    const {
      id,
      comments,
      user,
      showInfoPopup,
      cards,
      editCard,
      deleteCard,
    } = this.props;
    return (
      <div className="column">
        <EditableTitle canEdit name={name} rename={this.rename} />
        <AddForm add={this.addCard} />
        <div>
          {cards.map(card => (
            <Card
              key={card.id}
              name={card.name}
              id={card.id}
              commentsCount={comments[card.id].length}
              author={card.author}
              column={name}
              columnId={id}
              deleteCard={deleteCard}
              editCard={editCard}
              user={user}
              showInfoPopup={showInfoPopup}
            />
          ))}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfoPopup: PropTypes.func.isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  editCard: PropTypes.func.isRequired,
  cards: PropTypes.arrayOf(PropTypes.any).isRequired,
  renameColumn: PropTypes.func.isRequired,
  comments: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Column;
