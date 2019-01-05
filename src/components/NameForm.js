import React, { Component } from 'react';

class NameForm extends Component {
	constructor() {
        super();
        this.state = {
            user: '',
        }
		this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.a = this.a.bind(this);
    }
    a() {
        alert(2);
    }
	onChange(e) {
        const val = e.target.value;
        this.setState({user: val});
    }
	handleSubmit(e) {
        e.preventDefault();
		this.props.signUp(this.state.user)
	}
    render() {
        return (
            <div class="who">
				<p>Hi, what's your name?</p>
				<form onSubmit={this.handleSubmit}>
					<p>
						<input autoFocus class="new_card_name" type="text" maxlength="10" placeholder="Your Name" value={this.state.user} required="required" onChange={this.onChange}/>
						<input class="button" type="submit" value="Start" />
					</p>
				</form>
			</div>
        )
    }
}

export default NameForm;