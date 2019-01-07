import React, { Component } from 'react';
import Column from './Column.jsx';
import CardInfo from './CardInfo.jsx';
import NameForm from './NameForm.jsx';
import Hat from './Hat.jsx';

class Board extends Component {
  constructor() {
    super();
    const user = window.localStorage.getItem('lastUserName');
    const descriptions = JSON.parse(window.localStorage.getItem('descr')) || [[], [], [], []];
    const comments = JSON.parse(window.localStorage.getItem('comments')) || [[[]], [[]], [[]], [[]]];
    const columns = JSON.parse(window.localStorage.getItem('columns')) || [{ name: 'TODO', id: 0 }, { name: 'In Progress', id: 1 }, { name: 'Testing', id: 2 }, { name: 'Done', id: 3 }];
    this.state = {
      columns,
      user,
      cardInfo: {},
      isInfoShowed: false,
      descriptions,
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

  saveColumns = (rename, id) => {
    const { columns } = this.state;
    columns[id].name = rename;
    this.setState({ columns });
    window.localStorage.setItem('columns', JSON.stringify(columns));
  }

  saveDescription = (columnId, cardId, desc) => {
    const { descriptions, cardInfo } = this.state;
    cardInfo.reserve = desc;
    descriptions[columnId][cardId] = desc;
    this.setState({ descriptions, cardInfo });
    window.localStorage.setItem('descr', JSON.stringify(descriptions));
  }

  changeDescription = (val) => {
    const { cardInfo } = this.state;
    cardInfo.description = val;
    this.setState({ cardInfo });
  }

  addDescription = (val) => {
    const { cardInfo } = this.state;
    cardInfo.withDescription = val;
    this.setState({ cardInfo });
  }

  editComment = (columnId, cardId, id, text, author) => {
    const { comments, cardInfo } = this.state;
    if (comments[columnId][cardId] == null) comments[columnId][cardId] = [];
    comments[columnId][cardId][id] = { text, author, id };
    cardInfo.comments[id] = { text, author, id };
    this.setState({ cardInfo, comments });
  }

  addComment = (columnId, cardId, id, text, author) => {
    const { comments, cardInfo } = this.state;
    if (comments[columnId][cardId] == null) comments[columnId][cardId] = [];
    comments[columnId][cardId][id] = { text, author, id };
    cardInfo.comments[id] = { text, author, id };
    this.setState({ cardInfo, comments });
    window.localStorage.setItem('comments', JSON.stringify(comments));
  }

  deleteComment = (columnId, cardId, id) => {
    const { comments, cardInfo } = this.state;
    delete comments[columnId][cardId][id];
    delete cardInfo.comments[id];
    this.setState({ cardInfo, comments });
    window.localStorage.setItem('comments', JSON.stringify(comments));
  }

  showInfo = (name, column, author, columnId, id) => {
    const {
      cardInfo,
      comments,
      descriptions,
      user,
      isInfoShowed,
    } = this.state;
    cardInfo.name = name;
    cardInfo.column = column;
    cardInfo.author = author;
    cardInfo.columnId = columnId;
    cardInfo.id = id;
    cardInfo.comments = (comments[columnId][id] == null) ? [] : comments[columnId][id];
    cardInfo.editable = (cardInfo.author === user);
    cardInfo.description = (descriptions[columnId][id] == null) ? '' : descriptions[columnId][id];
    cardInfo.reserve = cardInfo.description;
    cardInfo.withDescription = (cardInfo.description !== '');
    this.setState({ cardInfo, isInfoShowed: (isInfoShowed === false) });
  }

  hideForm = () => {
    const { cardInfo } = this.state;
    cardInfo.description = '';
    this.setState({ cardInfo, isInfoShowed: false });
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

  render() {
    const {
      user,
      cardInfo,
      isInfoShowed,
      columns,
      comments,
    } = this.state;
    return (
      <header>
        <Hat user={user} signIn={this.signIn} />
        {isInfoShowed && (
          <div className="info_popup">
            <CardInfo
              user={user}
              editComment={this.editComment}
              addComment={this.addComment}
              deleteComment={this.deleteComment}
              addDescription={this.addDescription}
              changeDescription={this.changeDescription}
              hide={this.hideForm}
              card={cardInfo}
              saveDescription={this.saveDescription}
            />
          </div>
        )}
        {user === '' && (
          <div role="presentation" onKeyDown={(e) => { if (e.key === 'Tab') { e.preventDefault(); } }} className="fade">
            <NameForm signIn={this.signIn} />
          </div>
        )}
        <div className="App">
          {columns.map(column => (
            <Column
              comments={comments}
              name={column.name}
              id={column.id}
              user={user}
              showInfo={this.showInfo}
              save={this.saveColumns}
            />
          ))}
        </div>
      </header>
    );
  }
}

export default Board;
