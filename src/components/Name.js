import React, { Component } from 'react';

class Name extends Component {
	constructor(props) {
        super(props); 
        this.state = {
            name: this.props.name,
            length: this.props.name.length,
            max_length: 42,
            count_color: "#fff",
            showed_form: "none"
          };   
        this.onChange = this.onChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
    }
	handleSubmit(e) {
        e.preventDefault();
		if (this.Name.innerText!=="" && this.Name.innerText.length<=this.state.max_length) {
        this.setState({name: this.Name.innerText, length: this.Name.innerText.length, count_color:"#fff", showed_form: "none",});
        this.props.rename(this.Name.innerText);
		} else alert('Wrong length: '+this.Name.innerText.length+'/'+this.state.max_length)
	}        
	onChange(e) {
        if (this.props.user!==this.props.author) e.preventDefault();
        else this.setState({length: this.Name.innerText.length,count_color: (this.Name.innerText.length > this.state.max_length) ? "#f00":"#fff"});
    }
	render() {
		return (
            <div>
                <div ref={ref => this.Name = ref} onFocus={() => {
                    if (this.props.user===this.props.author) this.setState({showed_form: "block",count_color: (this.Name.innerText.length > this.state.max_length) ? "#f00":"#fff"})
                    }} contentEditable="true" onKeyPress={(e) =>{this.onChange(e)}} onKeyUpCapture={(e) =>{this.onChange(e)}} class="textarea">{this.state.name}</div>
                <div style={{display: this.state.showed_form, marginTop:"10px"}}>
                    <div style={{color: this.state.count_color}}>{this.state.length}/{this.state.max_length}</div>
                    <button class="button" onClick={this.handleSubmit}>Save</button>
                    <button class="button" onClick={() => {
                        this.Name.innerHTML = this.state.name; 
                        this.setState({showed_form: "none", length: this.state.name.length});
                    }}>Cancel</button>
                </div>
            </div>
        )
    }
};

export default Name;