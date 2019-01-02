import React, { Component } from 'react';
import './AddForm.css';
import './Style.css';

class AddForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  name: "",
		  showed_form: "none",
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	onChange(e) {
        const val = e.target.value;
        this.setState({name: val});
    }
	handleSubmit(e) {
        e.preventDefault();
        this.props.add(this.state.name);
		this.setState({name:"",showed_form: "none"});
		
	}
	focused(){
		this.setState({showed_form: "block"});
		this.input.focus();
	}
	render() {
		return (
		<div class="addform">
			<button class="button plus" onClick={()=>{this.focused()}}>+</button>
			<div style={{display: this.state.showed_form}}>
				<form onSubmit={this.handleSubmit}>
					<p>
						<input maxlength='42' ref={ref => this.input = ref} class="new_card_name" type="text" placeholder="Card Name" value={this.state.name} required="required" onChange={this.onChange}/>
						<input class="button" type="submit" value="Create" />
					</p>
				</form>
				<button class="button" onClick={()=>{this.setState({name:"", showed_form: "none"})}}>Cancel</button>
			</div>
		</div>
		)
	}
}

export default AddForm;