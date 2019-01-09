import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isFormShowed: false,
    };
  }

  componentDidUpdate() {
    const { isFormShowed } = this.state;
    if (isFormShowed) {
      this.input.focus();
    }
  }

  onChange = (e) => {
    const name = e.target.value;
    this.setState({ name });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { add } = this.props;
    const { name } = this.state;
    add(name);
    this.setState({ name: '', isFormShowed: false });
  }

  openForm = () => {
    this.setState({ isFormShowed: true });
  }

  cancel = () => {
    this.setState({ name: '', isFormShowed: false });
  }

  render() {
    const { isFormShowed, name } = this.state;
    return (
      <div className="addform">
        <button type="button" className="button plus" onClick={this.openForm}> + </button>
        {isFormShowed && (
          <div>
            <form onSubmit={this.handleSubmit}>
              <p>
                <input
                  maxLength="42"
                  ref={(ref) => { this.input = ref; }}
                  className="new_card_name"
                  type="text"
                  placeholder="Card Name"
                  value={name}
                  required="required"
                  onChange={this.onChange}
                />
                <input className="button" type="submit" value="Create" />
              </p>
            </form>
            <button type="button" className="button" onClick={this.cancel}> Cancel </button>
          </div>
        )}
      </div>
    );
  }
}

AddForm.propTypes = {
  add: PropTypes.func.isRequired,
};

export default AddForm;
