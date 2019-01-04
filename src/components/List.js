import React, { Component } from 'react';
import Column from './Column.js';
import CardInfo from './CardInfo.js';
import NameForm from './NameForm.js';
import Hat from './Hat.js';

class List extends Component {
	constructor() {
		super();
		let descriptions = JSON.parse(localStorage.getItem('descr'));
		if (descriptions === null) descriptions = [[],[],[],[]];
		let comments = JSON.parse(localStorage.getItem('comments'));
		if (comments === null) comments = [[[]],[[]],[[]],[[]]];
		let columns = JSON.parse(localStorage.getItem('columns'));	
		if (columns === null) columns = [{name:'TODO',id:0},{name:'In Progress',id:1},{name:'Testing',id:2},{name:'Done',id:3}];
		this.state = {
		  columns: columns,
		  user: '',
		  card_info: {},
		  showed_form: "none",
		  name_form: "block",
		  descriptions: descriptions,
		  comments: comments,
		};
		this.form_show = this.form_show.bind(this);
		this.form_hide = this.form_hide.bind(this);
		this.save_columns = this.save_columns.bind(this);
		this.save_description = this.save_description.bind(this);
		this.change_descr = this.change_descr.bind(this);
		this.add_descr = this.add_descr.bind(this);
		this.signUp = this.signUp.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.add_comment = this.add_comment.bind(this);
		this.delete_comment = this.delete_comment.bind(this);
		this.edit_comment = this.edit_comment.bind(this);
	}
	signUp(val) {
		this.setState({user: val, name_form: "none"});
	}
	save_columns(rename,id){
		let columns = this.state.columns;
		columns[id].name = rename;
		this.setState({columns: columns});
		localStorage.setItem('columns', JSON.stringify(this.state.columns));
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
	add_descr(val){
		let card_info = this.state.card_info;
		card_info.with_desc = val;
		this.setState({card_info: card_info});
	}
	edit_comment(column_id,card_id,id,comment,author) {
		let comments = this.state.comments;
		let card_info = this.state.card_info;
		if (comments[column_id][card_id] === undefined) comments[column_id][card_id] = [];
		comments[column_id][card_id][id]={text: comment, author: author,  id: id};
		card_info.comments[id] = {text: comment, author: author,  id: id};
		this.setState({card_info: card_info, comments: comments});
	}
	add_comment(column_id,card_id,id,comment,author){
		let comments = this.state.comments;
		let card_info = this.state.card_info;
		if (comments[column_id][card_id] === undefined) comments[column_id][card_id] = [];
		comments[column_id][card_id][id]={text: comment, author: author,  id: id};
		card_info.comments[id] = {text: comment, author: author,  id: id};
		this.setState({card_info: card_info, comments: comments});
		localStorage.setItem('comments', JSON.stringify(this.state.comments));
	}
	delete_comment(column_id,card_id,id){
		let comments = this.state.comments;
		let card_info = this.state.card_info;
		delete comments[column_id][card_id][id];
		delete card_info.comments[id];
		this.setState({card_info: card_info, comments: comments});
		localStorage.setItem('comments', JSON.stringify(this.state.comments));
	}
	form_show(name,column,author,column_id,id) {
		let card_info = this.state.card_info;
		card_info.name = name;
		card_info.column = column;
		card_info.author = author;
		card_info.column_id = column_id;
		card_info.id = id;
		card_info.comments = (this.state.comments[column_id][id] === undefined) ? [] : this.state.comments[column_id][id];
		card_info.editable = (card_info.author === this.state.user) ? true : false;
		card_info.description = (this.state.descriptions[column_id][id] === undefined) ? '' : this.state.descriptions[column_id][id];
		card_info.reserve = card_info.description;
		card_info.with_desc = (card_info.description !== '') ? true : false; 
		this.setState({card_info: card_info, showed_form: this.state.showed_form==="none" ? "block" : "none"});
	}
	form_hide() {
		let card_info = this.state.card_info;
		card_info.description = '';
		this.setState({card_info: card_info, showed_form: "none"});
	}
	handleKeyUp(event) {
        event.preventDefault();
        const keyValue = event.key;
        if (keyValue === "Escape") {
            this.form_hide();
        }
    }
	render() {
		return (
			<header onKeyUp={this.handleKeyUp}>
				<Hat user={this.state.user}/>
				<div style={{display: this.state.showed_form}} class="info_popup">
					<CardInfo user={this.state.user} edit={this.edit_comment} add_comment={this.add_comment} delete_comment={this.delete_comment} add_desc={this.add_descr} redesc={this.change_descr} hide={this.form_hide} card={this.state.card_info} save_desc={this.save_description}/>
				</div>
				<div onKeyDown={(e)=>{ if (e.key === "Tab") {e.preventDefault()}}} class="fade" style={{display: this.state.name_form}}>		
					<NameForm signUp={this.signUp} />
				</div>
				<div class="App">
					{this.state.columns.map((column) => {
					return (
						<Column comments={this.state.comments} name={column.name} id={column.id} user={this.state.user} show_info={this.form_show} save={this.save_columns}/>
					)})}
				</div>
			</header>
		)
	}
}

export default List;