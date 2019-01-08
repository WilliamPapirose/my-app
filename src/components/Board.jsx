import React, { Component } from 'react';
import Column from './Column';
import CardInfoPopup from './CardInfoPopup';
import SignIn from './SignIn';
import Header from './Header';

class Board extends Component {
  constructor() {
    super();
    const user = window.localStorage.getItem('lastUserName');
    const cards = JSON.parse(window.localStorage.getItem('myAppCards')) || [[], [], [], []];
    const comments = JSON.parse(window.localStorage.getItem('myAppComments')) || [];
    const columns = JSON.parse(window.localStorage.getItem('myAppColumns')) || [{ name: 'TODO', id: 0 }, { name: 'In Progress', id: 1 }, { name: 'Testing', id: 2 }, { name: 'Done', id: 3 }];
    this.state = {
      nextId: parseInt(window.localStorage.nextId, 10) || 0,
      nextCommentId: parseInt(window.localStorage.nextCommentId, 10) || 0,
      currentCard: null,
      columns,
      user,
      cards,
      isInfoPopupShowed: false,
      comments,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.closePopupByEsc);
  }

  signIn = (user) => {
    this.setState({ user });
    window.localStorage.setItem('lastUserName', user);
  }

  addCard = (name, columnId) => {
    const {
      cards,
      comments,
      user,
      nextId,
    } = this.state;
    let newNextId = nextId;
    const newCards = cards;
    newCards[columnId].push({ id: nextId, name, author: user });
    const newComments = comments;
    newComments.push({ id: nextId, comments: [] });
    newNextId += 1;
    this.setState({ cards: newCards, comments: newComments, nextId: newNextId });
    window.localStorage.setItem('nextId', newNextId);
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  deleteCard = (columnId, cardId) => {
    const { cards, comments } = this.state;
    const newCards = cards;
    newCards[columnId] = cards[columnId].filter(card => (card.id !== cardId));
    const newComments = comments.filter(cardComments => (cardComments.id !== cardId));
    this.setState({ cards: newCards, comments: newComments });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  editCard = (name, columnId, cardId) => {
    const { cards } = this.state;
    const newCards = cards;
    newCards[columnId] = cards[columnId].map((card) => {
      if (card.id === cardId) {
        return {
          ...card,
          name,
        };
      } return card;
    });
    this.setState({ cards: newCards });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
  }

  renameColumn = (name, columnId) => {
    const { columns } = this.state;
    const newColumns = columns;
    newColumns[columnId] = {
      ...columns[columnId],
      name,
    };
    this.setState({ columns: newColumns });
    window.localStorage.setItem('myAppColumns', JSON.stringify(newColumns));
  }

  editDescription = (description) => {
    const { cards, currentCard } = this.state;
    const newCards = cards;
    newCards[currentCard.columnId] = cards[currentCard.columnId].map((card) => {
      if (card.id === currentCard.id) {
        return {
          ...card,
          description,
        };
      } return card;
    });
    this.setState({ cards: newCards });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
  }

  editComment = (id, text) => {
    const { currentCard, comments } = this.state;
    const newComments = comments;
    const newCardComments = comments.find(
      item => item.id === currentCard.id,
    ).comments.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          text,
        };
      } return item;
    });
    newComments.find(
      item => item.id === currentCard.id,
    ).comments = newCardComments;
    this.setState({ comments: newComments });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  addComment = (text, author) => {
    const { currentCard, comments, nextCommentId } = this.state;
    let newNextCommentId = nextCommentId;
    const newComments = comments;
    newComments.find(
      item => item.id === currentCard.id,
    ).comments.push({
      id: nextCommentId,
      text,
      author,
      description: '',
    });
    newNextCommentId += 1;
    this.setState({ comments: newComments, nextCommentId: newNextCommentId });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
    window.localStorage.setItem('nextCommentId', newNextCommentId);
  }

  deleteComment = (commentId) => {
    const { comments, currentCard } = this.state;
    const newComments = comments;
    const newCardComments = newComments.find(item => item.id === currentCard.id).comments;
    newComments.find(
      item => item.id === currentCard.id,
    ).comments = newCardComments.filter(c => c.id !== commentId);
    this.setState({ comments: newComments });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  showInfoPopup = (currentCard) => {
    this.setState({ currentCard, isInfoPopupShowed: true });
  }

  hideForm = () => {
    this.setState({ isInfoPopupShowed: false });
  }

  componentDidUnmont = () => {
    window.removeEventListener('keydown', this.closePopupByEsc);
  }

  closePopupByEsc = (event) => {
    const keyValue = event.key;
    if (keyValue === 'Escape') {
      event.preventDefault();
      this.hideForm();
    }
  }

  noneTabulation = (e) => {
    if (e.key === 'Tab') { e.preventDefault(); }
  }

  render() {
    const {
      user,
      cards,
      currentCard,
      isInfoPopupShowed,
      columns,
      comments,
    } = this.state;
    return (
      <header>
        {user && (<Header user={user} signIn={this.signIn} />)}
        {isInfoPopupShowed && (
          <div className="info_popup">
            <CardInfoPopup
              user={user}
              card={cards[currentCard.columnId].find(card => card.id === currentCard.id)}
              comments={comments.find(item => item.id === currentCard.id).comments}
              columnName={columns[currentCard.columnId].name}
              editComment={this.editComment}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
              editDescription={this.editDescription}
              hide={this.hideForm}
            />
          </div>
        )}
        {!user && (
          <div role="presentation" onKeyDown={this.noneTabulation} className="fade">
            <SignIn signIn={this.signIn} />
          </div>
        )}
        <div className="App">
          {columns.map(column => user && (
            <Column
              addCard={this.addCard}
              deleteCard={this.deleteCard}
              editCard={this.editCard}
              cards={cards[column.id]}
              renameColumn={this.renameColumn}
              comments={comments}
              name={column.name}
              id={column.id}
              user={user}
              showInfoPopup={this.showInfoPopup}
              saveColumns={this.saveColumns}
            />
          ))}
        </div>
      </header>
    );
  }
}

export default Board;
