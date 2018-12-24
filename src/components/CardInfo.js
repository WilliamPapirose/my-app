import React, { Component } from 'react';
import './CardInfo.css';
import './Style.css';

class CardInfo extends Component{
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }
    handleKeyUp(event) {
        event.preventDefault();
        const keyValue = event.key;
        if (keyValue==="Escape") {
            this.props.hide();
        }
    }
    render(){
        return (  
            <div onKeyUp={this.handleKeyUp} class="fade">
                <div class="popup">
                <div class="head"><p style={{margin:0}}>{this.props.card.name}</p>
                <p class="column_name">{this.props.card.column}</p>
                    <div class="buttons">   
                        <button class="button plus" style={{float: "right"}}  onClick={() => {
                            this.props.hide();
                        }}>X</button>
                        <button class="button plus" style={{float: "right"}}  onClick={() => {
                            
                        }}>+</button>
                    </div>
                </div>
                    <div>
                        <div class="description">
                            <div ref={ref => this.description = ref} contentEditable="true" class="textarea"></div>
                        </div>
                    </div>
                </div> 
            </div>
        )
    }
}

export default CardInfo;