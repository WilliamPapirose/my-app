import React, { Component } from 'react';
import './Card.css';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
          can_edit: false,
        };
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
	onChange(e) {
        const val = e.target.value;
        this.props.edit(this.props.card.column_id,this.props.card.id,this.props.id,val,this.props.author);
    }
	handleKeyDown(event) {
        const keyValue = event.key;
        if (keyValue === "Enter") {
            event.preventDefault();
            this.handleSubmit();
        }
    }
    handleSubmit(){
        if (this.state.can_edit) {
            this.props.add(this.props.card.column_id,this.props.card.id,this.props.id,this.comment.innerText,this.props.author);
            this.setState({can_edit: false});
        }
        else {
            this.setState({can_edit: true});
        }
    }
	render() {
		return(
			<div class="comment"> 
                <div style={{padding: '10px', boxSizing: 'border-box',backgroundColor: this.state.can_edit ? 'rgba(0, 0, 0, 0.8)':'rgba(0, 0, 0, 0.2)'}} onKeyDown={this.handleKeyDown} class='comment_textarea' ref={ref => this.comment = ref} onChange={this.onChange} contentEditable={(this.props.author === this.props.user && this.state.can_edit) ? true : false}>{this.props.text}</div>
				<div style={{marginTop: '5px', display: (this.props.author === this.props.user) ? 'block' : 'none'}}>
                    <button style={{float: 'right'}} class="button" onClick={() => {
						this.props.delete(this.props.card.column_id,this.props.card.id,this.props.id);
					}}>delete</button>
                    <button style={{float: 'right'}} class="button" onClick={() => {
                       this.handleSubmit()
					}}>{(this.state.can_edit) ? 'Save' : 'Edit'}</button>
                </div>
                <div style={{marginTop: '5px', marginLeft: '5px', float: 'left', wordBreak: 'normal', maxWidth: '60px', fontSize: '14px'}}>Author: {this.props.author}</div>
			</div>
		);
	}
}

export default Comment;