import React, { Component } from 'react';
import './Card.css';
import './Style.css';
import CardName from './Name.js';

class Card extends Component {
	constructor(props) {
		super(props);
		this.state = {
		  name: this.props.name,
		  comments: {},
		  comments_count: 0,
		};
		this.rename = this.rename.bind(this);
	}
	rename(val) {
		this.setState({name: val});
		this.props.save(val,this.props.id);
	}
	render() {
		return(
			<div class="card"> 
				<div style={{height: "22px"}}>
					<p style={{float: "left",}}>Author: {this.props.author}</p>
					<p style={{float: "right"}}>Comments: {this.state.comments_count}</p>
				</div>
				<CardName user={this.props.user} author={this.props.author} name={this.state.name} rename={this.rename} />
				<div style={{height:"37px"}}>
					<button class="button button_card" style={{float:"left",marginLeft:0}} onClick={() => {
						this.props.show_info(this.state.name, this.props.column, this.props.author, this.state.comments, this.props.column_id, this.props.id);
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