import React, { Component } from 'react';
import Description from './Description.js';

class CardInfo extends Component{
    constructor(props) {
        super(props);
    }
    render(){
        return (  
            <div class="fade_inf">
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
                </div> 
            </div>
        )
    }
}

export default CardInfo;