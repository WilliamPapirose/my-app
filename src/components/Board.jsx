import React, { Component } from 'react';
import Column from './Column';
import CardInfoPopup from './CardInfoPopup';
import SignIn from './SignIn';
import Header from './Header';

class Board extends Component {
  constructor() {
    super();
    const user = window.localStorage.getItem('lastUserName');
    const cards = JSON.parse(window.localStorage.getItem('myAppCards')) || {
      0: [],
      1: [],
      2: [],
      3: [],
    };
    const comments = JSON.parse(window.localStorage.getItem('myAppComments')) || { };
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

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.closePopupByEsc);
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
    const newCards = {
      ...cards,
      [columnId]: [...cards[columnId],
        {
          id: nextId,
          name,
          author: user,
          description: '',
        },
      ],
    };
    const newComments = {
      ...comments,
      [nextId]: [],
    };
    this.setState({ cards: newCards, comments: newComments, nextId: nextId + 1 });
    window.localStorage.setItem('nextId', nextId + 1);
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  deleteCard = (columnId, cardId) => {
    const { cards, comments } = this.state;
    const newColumnCards = cards[columnId].filter(card => card.id !== cardId);
    const newCards = {
      ...cards,
      [columnId]: newColumnCards,
    };
    const newComments = {
      ...comments,
    };
    delete newComments[cardId];
    this.setState({ cards: newCards, comments: newComments });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  editCard = (name, columnId, cardId) => {
    const { cards } = this.state;
    const newCards = {
      ...cards,
      [columnId]: cards[columnId].map((card) => {
        if (card.id === cardId) {
          return {
            ...card,
            name,
          };
        }
      
        return card;
      }),
    };
    this.setState({ cards: newCards });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
  }

  renameColumn = (name, columnId) => {
    const { columns } = this.state;
    const newColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          name,
        };
      }

      return column;
    });
    this.setState({ columns: newColumns });
    window.localStorage.setItem('myAppColumns', JSON.stringify(newColumns));
  }

  editDescription = (description) => {
    const { cards, currentCard } = this.state;
    const newCards = {
      ...cards,
      [currentCard.columnId]: cards[currentCard.columnId].map((card) => {
        if (card.id === currentCard.id) {
          return {
            ...card,
            description,
          };
        }

        return card;
      }),
    };
    this.setState({ cards: newCards });
    window.localStorage.setItem('myAppCards', JSON.stringify(newCards));
  }

  editComment = (id, text) => {
    const { currentCard, comments } = this.state;
    const newComments = {
      ...comments,
      [currentCard.id]: comments[currentCard.id].map((comment) => {
        if (comment.id === id) {
          return {
            ...comment,
            text,
          };
        }

        return comment;
      }),
    };
    this.setState({ comments: newComments });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  addComment = (text, author) => {
    const { currentCard, comments, nextCommentId } = this.state;
    const newComments = {
      ...comments,
      [currentCard.id]: [
        ...comments[currentCard.id],
        {
          id: nextCommentId,
          text,
          author,
        },
      ],
    };
    this.setState({ comments: newComments, nextCommentId: nextCommentId + 1 });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
    window.localStorage.setItem('nextCommentId', nextCommentId + 1);
  }

  deleteComment = (commentId) => {
    const { comments, currentCard } = this.state;
    const newCardComments = comments[currentCard.id].filter(item => item.id !== commentId);
    const newComments = {
      ...comments,
      [currentCard.id]: newCardComments,
    };
    this.setState({ comments: newComments });
    window.localStorage.setItem('myAppComments', JSON.stringify(newComments));
  }

  showInfoPopup = (currentCard) => {
    this.setState({ currentCard, isInfoPopupShowed: true });
  }

  hideForm = () => {
    this.setState({ isInfoPopupShowed: false });
  }

  closePopupByEsc = (event) => {
    const keyValue = event.key;
    if (keyValue === 'Escape') {
      event.preventDefault();
      this.hideForm();
    }
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
      <React.Fragment>
        {user && <Header user={user} signIn={this.signIn} />}
        {isInfoPopupShowed && (
          <React.Fragment>
            <CardInfoPopup
              user={user}
              card={cards[currentCard.columnId].find(card => card.id === currentCard.id)}
              comments={comments[currentCard.id]}
              columnName={columns[currentCard.columnId].name}
              editComment={this.editComment}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
              editDescription={this.editDescription}
              hide={this.hideForm}
            />
          </React.Fragment>
        )}
        {!user && (
          <div className="fade">
            <SignIn signIn={this.signIn} />
          </div>
        )}
        {user && (
          <div className="App">
            {columns.map(column => (
              <Column
                suppressContentEditableWarning
                key={column.id}
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
        )}
      </React.Fragment>
    );
  }
}

export default Board;
