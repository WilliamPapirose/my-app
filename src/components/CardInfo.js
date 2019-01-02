import React, { Component } from 'react';
import './CardInfo.css';
import Description from './Description.js';
import './Style.css';

class CardInfo extends Component{
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyUp(event) {
        event.preventDefault();
        const keyValue = event.key;
        if (keyValue === "Escape") {
            this.props.hide();
        }
    }
    render(){
        return (  
            <div onKeyUp={this.handleKeyUp} class="fade_inf">
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
                    <Description redesc={this.props.redesc} save_desc={this.props.save_desc} card={this.props.card}/>
                
                </div> 
            </div>
        )
    }
}

export default CardInfo;