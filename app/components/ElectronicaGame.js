/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");

var ElectronicaGame = React.createClass({
	propTypes: {
		gameName: React.PropTypes.string.isRequired,
		gameDisplayName: React.PropTypes.string.isRequired,
		gameWinner: React.PropTypes.string.isRequired,
		gameDate: React.PropTypes.string.isRequired,
		gameDraw: React.PropTypes.string.isRequired
	},
	render: function(){
		return(
			<div>
				<ul>
					<li>{this.props.gameName}</li>
					<li>{this.props.gameDisplayName}</li>
					<li>{this.props.gameWinner}</li>
					<li>{this.props.gameDate}</li>
					<li>{this.props.gameDraw}</li>
				</ul>
			</div>
		)
	}
});

module.exports = ElectronicaGame;