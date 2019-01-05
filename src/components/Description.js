import React, { Component } from 'react';
import './CardInfo.css';

class Description extends Component{
    constructor(props) {
        super(props);
        this.state = {
            edit: this.props.card.description === '' ? true : false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }
	handleSubmit() {
        this.props.save_desc(this.props.card.column_id, this.props.card.id, this.description.value);
        this.setState({edit: false});
    }
	onChange(e) {
        const val = e.target.value;
        if (this.props.card.editable)
        this.props.redesc(val);
    }
	handleKeyDown(event) {
        const keyValue = event.key;
        if (keyValue === "Enter") {
            event.preventDefault();
            this.description.blur();
            this.handleSubmit();
        }
    }
    render(){
        return ( 
            <div onFocus={()=>{
                if (this.props.card.editable)
                this.setState({edit: true})
                else this.description.blur();
                }} class="description">
                <textarea onKeyDown={this.handleKeyDown} placeholder='Description' onChange={this.onChange} value={this.props.card.description} ref={ref => this.description = ref} class="textarea"></textarea>
                <div class="author_buttons" style={{display: (this.props.card.editable) ? "block" : "none"}}>
                    <div class="with_desc" style={{display: (this.state.edit) ? "block" : "none"}}>
                        <button class="button" onClick={this.handleSubmit}>Save</button>
                        <button class="button" onClick={() => {
                            this.props.redesc(this.props.card.reserve);
                            this.setState({edit: false});
                        }}>Cancel</button>
                        <button class="button" onClick={() => {
                            if (this.props.card.editable) {
                                this.props.redesc('');
                                this.props.save_desc(this.props.card.column_id, this.props.card.id, '');
                                this.props.add_desc(false);
                                this.setState({edit: false});
                            }
                        }}>Delete description</button>
                    </div>
                </div>
            </div>
        )
    }
}
                
export default Description;