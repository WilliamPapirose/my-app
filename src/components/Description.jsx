import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  constructor(props) {
    super(props);
    const { card } = this.props;
    this.state = {
      editMode: false,
      description: card.description,
      addingMode: !!card.description,
    };
  }

  componentDidUpdate() {
    const { editMode, addingMode } = this.state;
    if (addingMode && editMode) this.description.focus();
  }

  onChange = (e) => {
    const description = e.target.value;
    this.setState({ description });
  }

  editDescription = (description) => {
    const { editDescription } = this.props;
    editDescription(description);
    this.setState({ editMode: false });
    this.description.blur();
  }

  handleKeyDown = (event) => {
    const keyValue = event.key;
    const { description } = this.state;
    if (keyValue === 'Enter') {
      event.preventDefault();
      this.description.blur();
      this.editDescription(description);
    }
  }

  isCeditMode = () => {
    const { card, user } = this.props;
    if (card.author === user) {
      this.setState({ editMode: true });
    } else this.description.blur();
  }

  addDescription = () => {
    this.setState({ addingMode: true });
  }

  cancel = () => {
    const { card } = this.props;
    this.setState({ description: card.description, editMode: false });
    this.description.blur();
  }

  delete = () => {
    this.editDescription('');
    this.setState({ description: '', addingMode: false });
  }

  saveDescription = () => {
    const { description } = this.state;
    this.editDescription(description);
  }

  render() {
    const {
      user,
      card,
    } = this.props;
    const { description, editMode, addingMode } = this.state;
    return (
      <div
        onFocus={this.isCeditMode}
        className="description"
      >
        {(card.author === user && !addingMode) && (
          <div className="description">
            <button type="button" className="button plus" onClick={this.addDescription}> Add description </button>
          </div>
        )}
        {addingMode && (
        <React.Fragment>
          <textarea
            onKeyDown={this.handleKeyDown}
            placeholder="Description"
            value={description}
            onChange={this.onChange}
            ref={(ref) => { this.description = ref; }}
            className="textarea"
          />
          {card.author === user && editMode && (
          <div className="author_buttons with_desc">
            <button type="button" className="button" onClick={this.save}> Save </button>
            <button type="button" className="button" onClick={this.cancel}> Cancel </button>
            <button type="button" className="button" onClick={this.delete}> Delete description </button>
          </div>
          )}
        </React.Fragment>
        )}
      </div>
    );
  }
}

Description.propTypes = {
  card: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.string.isRequired,
  editDescription: PropTypes.func.isRequired,
};

export default Description;
