import React from 'react';

export class Card extends React.Component{
	render(){
		return(
			<div className="card p-3 m-3">
			{this.props.cardContent}
			</div>
		);
	}
}

Card.defaultProps = {
	cardContent : "Card content here"
}