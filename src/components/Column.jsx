import React, { Component } from 'react';
import './column.css';
import './style.css';
import PropTypes from 'prop-types';
import Card from './Card.jsx';
import AddForm from './AddForm.jsx';
import ColumnName from './Name.jsx';

class Column extends Component {
  constructor(props) {
    super(props);
    const { name, id } = this.props;
    const saveName = 'cards_massive_' + id;
    const cards = JSON.parse(window.localStorage.getItem(saveName)) || [];
    this.state = {
      cards,
      name,
      saveName,
    };
  }

  rename = (name) => {
    this.setState({ name });
    const { save, id } = this.props;
    save(name, id);
  }

  deleteCard = (id) => {
    const { cards } = this.state;
    delete cards[id];
    this.setState({ cards });
    this.save();
  }

  addCard = (name) => {
    const { cards } = this.state;
    const { user } = this.props;
    cards.push({ name, id: cards.length, author: user });
    this.setState({ cards });
    this.save();
  }

  save = () => {
    const { cards, saveName } = this.state;
    window.localStorage.setItem(saveName, JSON.stringify(cards));
  }

  saveCards = (name, id) => {
    const { cards, saveName } = this.state;
    cards[id].name = name;
    this.setState({ cards });
    window.localStorage.setItem(saveName, JSON.stringify(cards));
  }

  render() {
    const { name, cards } = this.state;
    const {
      id,
      comments,
      user,
      showInfo,
    } = this.props;
    return (
      <div className="column">
        <ColumnName user="" author="" name={name} rename={this.rename} />
        <AddForm add={this.addCard} />
        <div>
          {cards.map((card) => {
            if (card !== null) {
              return (
                <Card
                  comments={comments[id]}
                  name={card.name}
                  id={card.id}
                  author={card.author}
                  column={name}
                  columnId={id}
                  del={this.deleteCard}
                  user={user}
                  showInfo={showInfo}
                  save={this.saveCards}
                />
              );
            } return null;
          })}
        </div>
      </div>
    );
  }
}

Column.propTypes = {
  user: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  showInfo: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  comments: PropTypes.object.isRequired,
};

export default Column;
