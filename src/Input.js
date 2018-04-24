import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.Component{
	constructor(props){
		super(props);
		this.selectChange = this.selectChange.bind(this);
	}
	selectChange(e){
		const val = e.target.value;
		let isNum = true;
		if (val === 'html' || val === 'json'){
			isNum = false;
		}
		this.props.onChange(val, isNum);
	}
	render(){
		return(
			<form onChange={this.selectChange}>
				<h4>Number of Paragraphs: </h4> 
				<select className="mb-3">
					<option value='1'>1</option>
					<option value='2'>2</option>	
					<option value='3'>3</option>	
					<option value='4'>4</option>	
				</select>
				<h4>HTML? </h4>
				<select>
					<option value='html'>Yes</option>
					<option value='json'>No</option>
				</select>
			</form>
		);
	}
}
Input.propTypes = {
	onChange : PropTypes.func
}