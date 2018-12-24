import React, { Component } from 'react';
import './App.css';
import Column from './components/Column.js';
import CardInfo from './components/CardInfo.js';

class App extends Component {
	constructor() {
		super();
		const name = localStorage.getItem('UserName');
		let columns = JSON.parse(localStorage.getItem('columns'));	
		if (columns === null) columns = [{name:'TODO',id:0},{name:'In Progress',id:1},{name:'Testing',id:2},{name:'Done',id:3}];
		this.state = {
		  columns: columns,
		  name: "Desc",
		  user: name,
		  card_info: {name: '', column: '', description: '', author: '',comments: {}},
		  showed_form: "none",
		  name_form: "block",
		};
		this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.form_show = this.form_show.bind(this);
		this.form_hide = this.form_hide.bind(this);
		this.save_columns = this.save_columns.bind(this);
	}
	onChange(e) {
        const val = e.target.value;
        this.setState({user: val});
    }
	handleSubmit(e) {
        e.preventDefault();
		this.setState({name_form: "none"});
		localStorage.setItem('UserName',this.state.user);
	}
	form_show(name,column,description,author,comments) {
		let card_info = this.state.card_info;
		card_info.name = name;
		card_info.column = column;
		card_info.description = description;
		card_info.author = author;
		card_info.comments = comments;
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
	render() {
		return (
		<div>
			<div style={{display: this.state.showed_form, position: "fixed", width:"100%", height:"100%"}}>
				<CardInfo hide={this.form_hide} card={this.state.card_info}/>
			</div>
			<div class="fade" style={{display: this.state.name_form}}>		
				<div class="who">
				<p>Hi, what's your name?</p>
					<form onSubmit={this.handleSubmit}>
						<p>
							<input autoFocus class="new_card_name" type="text" maxlength="10" placeholder="Your Name" value={this.state.user} required="required" onChange={this.onChange}/>
							<input class="button" type="submit" value="Start" />
						</p>
					</form>
				</div>
			</div>
			<div class="App">
				{this.state.columns.map((column) => {
						return (
						<Column name={column.name} id={column.id} user={this.state.user} mass={this.get_mass} show_info={this.form_show} save={this.save_columns}/>
						)})}
			</div>
		</div>
		)
	}
}

export default App;