import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './cardInfo.css';

class Description extends Component {
  constructor(props) {
    super(props);
    const { card } = this.props;
    this.state = {
      edit: card.description === '',
    };
  }

  onChange = (e) => {
    const { card, changeDescription } = this.props;
    const val = e.target.value;
    if (card.editable) {
      changeDescription(val);
    }
  }

  handleSubmit = () => {
    const { card, saveDescription } = this.props;
    saveDescription(card.columnId, card.id, this.description.value);
    this.setState({ edit: false });
  }

  handleKeyDown = (event) => {
    const keyValue = event.key;
    if (keyValue === 'Enter') {
      event.preventDefault();
      this.description.blur();
      this.handleSubmit();
    }
  }

  render() {
    const {
      card,
      changeDescription,
      addDescription,
      saveDescription,
    } = this.props;
    const { edit } = this.state;
    return (
      <div
        onFocus={() => {
          if (card.editable) {
            this.setState({ edit: true });
          } else this.description.blur();
        }}
        className="description"
      >
        <textarea
          onKeyDown={this.handleKeyDown}
          placeholder="Description"
          onChange={this.onChange}
          value={card.description}
          ref={ref => this.description = ref}
          className="textarea"
        />
        <div className="author_buttons" style={{ display: (card.editable) ? 'block' : 'none' }}>
          <div className="with_desc" style={{ display: (edit) ? 'block' : 'none' }}>
            <button type="button" className="button" onClick={this.handleSubmit}>Save</button>
            <button
              type="button"
              className="button"
              onClick={() => {
                changeDescription(card.reserve);
                this.setState({ edit: false });
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="button"
              onClick={() => {
                if (card.editable) {
                  changeDescription('');
                  saveDescription(card.columnId, card.id, '');
                  addDescription(false);
                  this.setState({ edit: false });
                }
              }}
            >
              Delete description
            </button>
          </div>
        </div>
      </div>
    );
  }
}

Description.propTypes = {
  card: PropTypes.object.isRequired,
  changeDescription: PropTypes.func.isRequired,
  saveDescription: PropTypes.func.isRequired,
  addDescription: PropTypes.func.isRequired,
};

export default Description;
