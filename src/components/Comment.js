import React, { Component } from 'react';
import './Card.css';

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
          text: this.props.text,
          id: this.props.id,
          can_edit: false,
        };
        this.onChange = this.onChange.bind(this);
    }
	onChange(e) {
        const val = e.target.value;
        this.setState({text: val});
    }
	render() {
		return(
			<div class="comment"> 
                <div><p style={{margin: '10px', float: 'left', wordBreak: 'normal', maxWidth: '50px', fontSize: '14px'}}>Author: {this.props.author}</p><p style={{margin: '10px', float: 'left'}}></p>
                <textarea class='comment_textarea' ref={ref => this.comment = ref} onChange={this.onChange} value={this.state.text} disabled={(this.props.author === this.props.user && this.state.can_edit) ? false : true}></textarea>
                </div>
				<div style={{display: (this.props.author === this.props.user) ? 'block' : 'none'}}>
                    <button style={{float: 'right'}} class="button" onClick={() => {
						this.props.delete(this.props.card.column_id,this.props.card.id,this.state.id);
					}}>delete</button>
                    <button style={{float: 'right'}} class="button" onClick={() => {
                        if (this.state.can_edit) {
                            this.props.edit(this.props.card.column_id,this.props.card.id,this.state.id,this.comment.value,this.props.author);
                            this.setState({can_edit: false});
                        }
                        else this.setState({can_edit: true});
					}}>{(this.state.can_edit) ? 'Save' : 'Edit'}</button>
                </div>
			</div>
		);
	}
}

export default Comment;