import React, { Component } from 'react';
import './App.css';
import Column from './components/Column.js';
import CardInfo from './components/CardInfo.js';
import NameForm from './components/NameForm.js';

class App extends Component {
	constructor() {
		super();
		let descriptions = JSON.parse(localStorage.getItem('descr'));
		if (descriptions === null) descriptions = [[],[],[],[]];
		let columns = JSON.parse(localStorage.getItem('columns'));	
		if (columns === null) columns = [{name:'TODO',id:0},{name:'In Progress',id:1},{name:'Testing',id:2},{name:'Done',id:3}];
		this.state = {
		  columns: columns,
		  user: '',
		  card_info: {},
		  showed_form: "none",
		  name_form: "block",
		  descriptions: descriptions,
		};
		this.form_show = this.form_show.bind(this);
		this.form_hide = this.form_hide.bind(this);
		this.save_columns = this.save_columns.bind(this);
		this.save_description = this.save_description.bind(this);
		this.change_descr = this.change_descr.bind(this);
		this.signUp = this.signUp.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
	}
	signUp(val) {
		this.setState({user: val, name_form: "none"});
	}
	save_description(column_id,card_id,desc){
		let descriptions = this.state.descriptions;
		let card_info = this.state.card_info;
		card_info.reserve = desc;
		descriptions[column_id][card_id] = desc;
		this.setState({descriptions: descriptions, card_info: card_info});
		localStorage.setItem('descr',JSON.stringify(this.state.descriptions));
	}
	change_descr(val){
		let card_info = this.state.card_info;
		card_info.description = val;
		this.setState({card_info: card_info});
	}
	form_show(name,column,author,comments,column_id,id) {
		let card_info = this.state.card_info;
		card_info.name = name;
		card_info.column = column;
		card_info.author = author;
		card_info.comments = comments;
		card_info.column_id = column_id;
		card_info.id = id;
		card_info.editable = (card_info.author === this.state.user) ? true : false;
		card_info.description = (this.state.descriptions[column_id][id] === undefined) ? '' : this.state.descriptions[column_id][id];
		card_info.reserve = card_info.description;
		this.setState({card_info: card_info, showed_form: this.state.showed_form==="none" ? "block" : "none"});
	}
	form_hide() {
		this.setState({showed_form: this.state.showed_form==="none" ? "block" : "none"});
	}
	save_columns(rename,id){
		let columns = this.state.columns;
		columns[id].name = rename;
		this.setState({columns: columns});
		localStorage.setItem('columns', JSON.stringify(this.state.columns));
	}
	handleKeyUp(event) {
        event.preventDefault();
        const keyValue = event.key;
        if (keyValue === "Escape") {
            this.setState({showed_form: "none"});
        }
    }
	render() {
		return (
		<header onKeyUp={this.handleKeyUp}>
			<div style={{display: this.state.showed_form, position: "fixed", width:"100%", height:"100%"}}>
				<CardInfo user={this.state.user} redesc={this.change_descr} hide={this.form_hide} card={this.state.card_info} save_desc={this.save_description}/>
			</div>
			<div class="fade" style={{display: this.state.name_form}}>		
				<NameForm signUp={this.signUp} />
			</div>
			<div class="App">
				{this.state.columns.map((column) => {
						return (
						<Column name={column.name} id={column.id} user={this.state.user} show_info={this.form_show} save={this.save_columns}/>
						)})}
			</div>
		</header>
		)
	}
}

export default App;