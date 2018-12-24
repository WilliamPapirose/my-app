import React, { Component } from 'react';
import './Card.css';
import './Style.css';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  name: this.props.name,
		  showed_form: "none",
		  comments: {},
		  description: '',
		  comments_count: 0,
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit() {
		if (this.cardName.innerHTML!=="") {
		this.setState({showed_form: "none", name: this.cardName.innerText});
		this.props.save(this.cardName.innerText,this.props.id);}
	}
	render() {
		return(
			<div class="card"> 
				<div style={{height: "22px"}}>
					<p style={{float: "left",}}>Author: {this.props.author}</p>
					<p style={{float: "right"}}>Comments: {this.state.comments_count}</p>
				</div>
				<div ref={ref => this.cardName = ref} onFocus={() => {
					if (this.props.author===this.props.user) this.setState({showed_form: "block"});
					else this.cardName.blur();
					}} contentEditable="true" class="textarea">{this.state.name}</div>
				<div style={{display: this.state.showed_form, marginTop:"10px"}}>
					<button class="button" onClick={this.handleSubmit}>Save</button>
					<button class="button" onClick={() => {
						this.cardName.innerHTML = this.state.name; 
					}}>Cancel</button>
				</div>
				<div style={{height:"37px"}}>
					<button class="button button_card" style={{float:"left",marginLeft:0}} onClick={() => {
						this.props.show_info(this.state.name, this.props.column, this.state.description, this.state.comments);
					}}>More information</button>
					<button class="button button_card" style={{float:"right",marginRight:0}} onClick={() => {
						if (this.props.user === this.props.author) this.props.del(this.props.id);
						else alert('You are not author!');
					}}>X</button>
				</div>
			</div>
		);
	}
}

export default Card;