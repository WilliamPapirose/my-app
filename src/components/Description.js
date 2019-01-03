import React, { Component } from 'react';
import './CardInfo.css';

class Description extends Component{
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
	handleSubmit() {
        this.props.save_desc(this.props.card.column_id, this.props.card.id, this.description.value);
    }
	onChange(e) {
        const val = e.target.value;
        if (this.props.card.editable)
        this.props.redesc(val);
    }
    render(){
        return ( 
            <div class="description">
                <textarea placeholder='Description' onChange={this.onChange} value={this.props.card.description} ref={ref => this.description = ref} class="textarea"></textarea>
                <div class="author_buttons" style={{display: this.props.card.editable ? "block" : "none"}}>
                    <div class="with_desc">
                        <button class="button" onClick={this.handleSubmit}>Save</button>
                        <button class="button" onClick={() => {
                            this.description.value = this.props.card.reserve; 
                        }}>Cancel</button>
                        <button class="button" onClick={() => {
                            if (this.props.card.editable) {
                                this.props.redesc('');
                                this.props.save_desc(this.props.card.column_id, this.props.card.id, '');
                                this.props.add_desc(false);
                            }
                        }}>Delete description</button>
                    </div>
                </div>
            </div>
        )
    }
}
                
export default Description;