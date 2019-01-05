import React, { Component } from 'react';
import Comment from './Comment.js';

class CommentForm extends Component{
    constructor(props) {
		super(props);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
	handleKeyDown(event) {
        const keyValue = event.key;
        if (keyValue === "Enter") {
            event.preventDefault();
            if (this.comment.value!=='') {
                this.props.add_comment(this.props.card.column_id,this.props.card.id,this.props.card.comments.length,this.comment.value,this.props.user);
                this.comment.value='';
            }
        }
    }
    render(){
        return ( 
            <div class='comments'>
                <div>
                    <textarea style={{height: '120px'}} onKeyDown={this.handleKeyDown} class='textarea comment_text' ref={ref => this.comment = ref}></textarea>
                    <button class="button plus" style={{float: "right"}}  onClick={() => {
                        if (this.comment.value!=='') {
                            this.props.add_comment(this.props.card.column_id,this.props.card.id,this.props.card.comments.length,this.comment.value,this.props.user);
                            this.comment.value='';
                            }}}>Add comment</button>
                </div>
                    {(this.props.card.comments === undefined) ? [] : this.props.card.comments.map((comment)=>{
                    if (comment !== null) 
                    return (
                    <Comment edit={this.props.edit} add={this.props.add_comment} user={this.props.user} author={comment.author} text={comment.text} id={comment.id} card={this.props.card} delete={this.props.delete}/> 
                    ); 
                    else return null})}
            </div>
        )
    }
}
                    
export default CommentForm;