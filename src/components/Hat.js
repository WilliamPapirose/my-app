import React, { Component } from 'react';

class Hat extends Component {
    render() {
        return (
            <div class="hat">
				<p>{this.props.user}</p>
			</div>
        )
    }
}

export default Hat;