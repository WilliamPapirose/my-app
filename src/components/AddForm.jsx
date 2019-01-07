import React, { Component } from 'react';
import './addForm.css';

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isFormShowed: 'none',
    };
  }

  componentDidUpdate() {
    const { isFormShowed } = this.state;
    if (isFormShowed === 'block') {
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
    this.setState({ name: '', isFormShowed: 'none' });
  }

  render() {
    const { isFormShowed, name } = this.state;
    return (
      <div className="addform">
        <button type="button" className="button plus" onClick={() => {this.setState({ isFormShowed: 'block' }); }}>+</button>
        <div style={{ display: isFormShowed }}>
          <form onSubmit={this.handleSubmit}>
            <p>
              <input
                maxLength="42"
                ref={ref => this.input = ref}
                className="new_card_name"
                type="text"
                placeholder="Card Name"
                value={name}
                required="required"
                onChange={this.onChange}/>
              <input className="button" type="submit" value="Create" />
            </p>
          </form>
          <button type="button" className="button" onClick={() => { this.setState({ name: '', isFormShowed: 'none' }); }}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

export default AddForm;
