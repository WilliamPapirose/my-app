import React, { Component } from 'react';
import './Column.css';
import './Style.css';
import Card from './Card.js';
import AddForm from './AddForm.js';

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
		this.handleSubmit = this.handleSubmit.bind(this);
		this.delete_card = this.delete_card.bind(this);
		this.add_card = this.add_card.bind(this);
		this.save_cards = this.save_cards.bind(this);
	}
	handleSubmit(e) {
        e.preventDefault();
		if (this.columnName.innerHTML!=="")
		this.setState({showed_form: "none", name: this.columnName.innerText});
		this.props.save(this.columnName.innerText,this.props.id);
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
			<div ref={ref => this.columnName = ref} onFocus={() => {
					this.setState({showed_form: "block"})
					}} contentEditable="true" class="textarea">{this.state.name}</div>
				<div style={{display: this.state.showed_form,marginTop:"10px"}}>
					<button class="button" onClick={this.handleSubmit}>Save</button>
					<button class="button" onClick={() => {
						this.columnName.innerHTML = this.state.name; 
						this.setState({showed_form: "none"});
					}}>Cancel</button>
				</div>
			<AddForm add={this.add_card}/>
			<div>	
				{this.state.cards.map((card) => {
					if (card !== null) return (
					<Card name={card.name} id={card.id} author={card.author} column={this.state.name} del={this.delete_card} user={this.props.user} show_info={this.props.show_info} save={this.save_cards}/>
					)
					else return null;
					})} 
			</div>	
		</div>
		)
	}
};

export default Column;