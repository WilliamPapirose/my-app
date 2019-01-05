import React, { Component } from 'react';

class Hat extends Component {
    render() {
        return (
            <div class="hat">
				<button class='button' style={{float:'left',padding:0}} onClick={()=>{this.props.signUp('')}}>Exit profile</button><p style={{fontSize:'22px'}}>{this.props.user}</p>
			</div>
        )
    }
}

export default Hat;