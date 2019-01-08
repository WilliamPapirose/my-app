import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Description extends Component {
  constructor(props) {
    super(props);
    const { card } = this.props;
    this.state = {
      onEdit: false,
      description: card.description,
      withDescription: card.description,
    };
  }

  componentDidUpdate() {
    const { onEdit, withDescription } = this.state;
    if (withDescription && onEdit) this.description.focus();
  }

  onChange = (e) => {
    const description = e.target.value;
    this.setState({ description });
  }

  editDescription = (description) => {
    const { editDescription } = this.props;
    editDescription(description);
    this.setState({ onEdit: false });
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

  isCanEdit = () => {
    const { card, user } = this.props;
    if (card.author === user) {
      this.setState({ onEdit: true });
    } else this.description.blur();
  }

  render() {
    const {
      user,
      card,
    } = this.props;
    const { description, onEdit, withDescription } = this.state;
    return (
      <div
        onFocus={this.isCanEdit}
        className="description"
      >
        {(card.author === user && !withDescription) && (
          <div className="description">
            <button
              type="button"
              className="button plus"
              onClick={() => { this.setState({ withDescription: true }); }}
            >
              Add description
            </button>
          </div>
        )}
        {(withDescription) && (
        <React.Fragment>
          <textarea
            onKeyDown={this.handleKeyDown}
            placeholder="Description"
            value={description}
            onChange={this.onChange}
            ref={(ref) => { this.description = ref; }}
            className="textarea"
          />
          {(card.author === user && onEdit) && (
          <div className="author_buttons with_desc">
            <button type="button" className="button" onClick={() => { this.editDescription(description); }}>Save</button>
            <button
              type="button"
              className="button"
              onClick={() => {
                this.setState({ description: card.description, onEdit: false });
                this.description.blur();
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                this.editDescription('');
                this.setState({ description: '', withDescription: false });
              }}
            >
              Delete description
            </button>
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
