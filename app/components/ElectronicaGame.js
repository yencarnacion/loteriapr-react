/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");

var ElectronicaGame = React.createClass({
	propTypes: {
		gameName: React.PropTypes.string.isRequired,
		gameDisplayName: React.PropTypes.string.isRequired,
		gameWinner: React.PropTypes.string.isRequired,
		gameDate: React.PropTypes.string.isRequired,
		gameDraw: React.PropTypes.number.isRequired
	},
	render: function(){
		return(
			<div>
				<ul>
					<li>{this.props.gameDisplayName}</li>
					<li><span dangerouslySetInnerHTML={{__html: this.props.gameWinner}} /></li>
				</ul>
			</div>
		)
	}
});

module.exports = ElectronicaGame;