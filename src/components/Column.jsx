import React from 'react';
import { PropTypes } from 'prop-types';
import AddCard from './AddCard';
import CardContainer from '../containers/CardContainer';

const Column = ({
  cards,
  id,
  name,
  addCard,
  user,
  deleteCard,
  hideAddForm,
  showAddForm,
}) => (
  <div className="column App">
    {name}
    <AddCard hideAddForm={() => { hideAddForm(id); }} showAddForm={() => { showAddForm(id); }} addCard={(text) => { addCard(text, id, user.name); }} />
    {cards[id].map((card) => {
      return (
        <CardContainer
          key={card.id}
          {...card}
          deleteCard={() => { deleteCard(card.id, id); }}
        />
      );
    })}
  </div>
);

Column.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  user: PropTypes.objectOf(PropTypes.string).isRequired,
  cards: PropTypes.objectOf(PropTypes.array).isRequired,
  addCard: PropTypes.func.isRequired,
  deleteCard: PropTypes.func.isRequired,
  hideAddForm: PropTypes.func.isRequired,
  showAddForm: PropTypes.func.isRequired,
};

export default Column;
