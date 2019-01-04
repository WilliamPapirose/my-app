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
            this.props.add(this.props.card.column_id,this.props.card.id,this.props.id,this.comment.value,this.props.author);
            this.setState({can_edit: false});
        }
        else {
            this.setState({can_edit: true});
        }
    }
	render() {
		return(
			<div class="comment"> 
                <div><p style={{margin: '10px', float: 'left', wordBreak: 'normal', maxWidth: '50px', fontSize: '14px'}}>Author: {this.props.author}</p><p style={{margin: '10px', float: 'left'}}></p>
                <textarea onKeyDown={this.handleKeyDown} class='comment_textarea' ref={ref => this.comment = ref} onChange={this.onChange} value={this.props.text} disabled={(this.props.author === this.props.user && this.state.can_edit) ? false : true}></textarea>
                </div>
				<div style={{display: (this.props.author === this.props.user) ? 'block' : 'none'}}>
                    <button style={{float: 'right'}} class="button" onClick={() => {
						this.props.delete(this.props.card.column_id,this.props.card.id,this.props.id);
					}}>delete</button>
                    <button style={{float: 'right'}} class="button" onClick={() => {
                       this.handleSubmit()
					}}>{(this.state.can_edit) ? 'Save' : 'Edit'}</button>
                </div>
			</div>
		);
	}
}

export default Comment;