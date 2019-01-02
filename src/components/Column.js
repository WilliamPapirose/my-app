import React, { Component } from 'react';
import './Column.css';
import './Style.css';
import Card from './Card.js';
import AddForm from './AddForm.js';
import ColumnName from './Name.js';

class Column extends Component {
	constructor(props) {
		super(props);
		let cards = JSON.parse(localStorage.getItem('cards_'+this.props.id));
		if (cards === null) cards = [];
		this.state = {
		  cards: cards,
		  name: this.props.name,
		  showed_form: "none",
		};
		this.delete_card = this.delete_card.bind(this);
		this.add_card = this.add_card.bind(this);
		this.save_cards = this.save_cards.bind(this);
		this.rename = this.rename.bind(this);
	}
	rename(val) {
		this.setState({name: val})
		this.props.save(val,this.props.id);
	}
	delete_card(id) {
		let new_cards = this.state.cards;
		delete new_cards[id];
		this.setState({cards: new_cards});
		this.save();
	}
	add_card(name) {
		let new_cards = this.state.cards;
		new_cards.push({name: name, id: this.state.cards.length, author: this.props.user});
		this.setState({cards: new_cards});
		this.save();
	}
	save(){
		localStorage.setItem('cards_'+this.props.id,JSON.stringify(this.state.cards));
	}
	save_cards(name,id){
		let cards = this.state.cards;
		cards[id].name = name;
		this.setState({cards: cards});
		localStorage.setItem('cards_'+this.props.id,JSON.stringify(this.state.cards));
	}
	render() {
		return (
		<div class="column">
			<ColumnName user={''} author={''} name={this.state.name} rename={this.rename}/>
			<AddForm add={this.add_card}/>
			<div>	
				{this.state.cards.map((card) => {
					if (card !== null) return (
					<Card name={card.name} id={card.id} author={card.author} column={this.state.name} column_id={this.props.id} del={this.delete_card} user={this.props.user} show_info={this.props.show_info} save={this.save_cards}/>
					)
					else return null;
					})} 
			</div>	
		</div>
		)
	}
};

export default Column;