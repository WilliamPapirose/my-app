import React, { Component } from 'react';
import './App.css';
import Board from './components/Board.js';

class App extends Component {
	render() {
		return (
		<header>
			<Board/>
		</header>
		)
	}
}

export default App;