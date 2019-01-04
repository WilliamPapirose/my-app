import React, { Component } from 'react';
import Description from './Description.js';
import Comment from './Comment.js';

class CardInfo extends Component{
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
            <div>
                <div class="fade_inf"></div>
                <div class="window">
                    <div class="popup">
                        <div class="head"><p class='author'>Author: {this.props.card.author}</p><p style={{margin:0}}>{this.props.card.name}</p>
                        <p class="column_name">{this.props.card.column}</p>
                            <div class="buttons">   
                                <button class="button plus" style={{float: "right"}}  onClick={() => {
                                    this.props.hide();
                                }}>X</button>
                                <button class="button plus" style={{float: "right"}}  onClick={() => {
                                    
                                }}>+</button>
                            </div>
                        </div>  
                        <div style={{display: (this.props.card.with_desc) ? 'block' : 'none'}}>
                            <Description add_desc={this.props.add_desc} redesc={this.props.redesc} save_desc={this.props.save_desc} card={this.props.card}/>
                        </div> 
                        <div class="description" style={{display: (this.props.card.with_desc || !this.props.card.editable) ? 'none' : 'block'}}>
                            <button class="button plus" onClick={() => {
                                this.props.add_desc(true);
                            }}>Add description</button>
                        </div> 
                        <div class='comments'>
                        <div class=''>
                            <textarea onKeyDown={this.handleKeyDown} class='textarea comment_text' ref={ref => this.comment = ref}></textarea>
                            <button class="button plus" style={{float: "right"}}  onClick={() => {
                                if (this.comment.value!=='') {
                            this.props.add_comment(this.props.card.column_id,this.props.card.id,this.props.card.comments.length,this.comment.value,this.props.user);
                            this.comment.value='';
                            }
                            }}>Add comment</button>
                        </div>
                            {(this.props.card.comments === undefined) ? [] : this.props.card.comments.map((comment)=>{
                            if (comment !== null) 
                                return (
                                <Comment edit={this.props.edit} add={this.props.add_comment} user={this.props.user} author={comment.author} text={comment.text} id={comment.id} card={this.props.card} delete={this.props.delete_comment}/> 
                            ); else return null})}
                        </div>
                    </div> 
                </div> 
            </div>
        )
    }
}

export default CardInfo;