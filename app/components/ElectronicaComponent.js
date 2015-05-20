/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");
var ElectronicaDate = require('./ElectronicaDate');
var ElectronicaGame = require('./ElectronicaGame');
var sprintf = require("../utilities/sprintf").sprintf;

var ElectronicaComponent = React.createClass({
	propTypes: {
		winnerdata: React.PropTypes.object.isRequired,
		datesCb: React.PropTypes.func.isRequired,
		setNewDateCb: React.PropTypes.func.isRequired
	},	
	getInitialState: function(){
		return ({
			displayDate: null,
			defaultDateCb: null,
			displayDateCb: null
		})
	},
	componentDidMount: function(){
		this.props.datesCb(this.setDefaultDate);	
	},
	datesCb: function(defaultcb, displaycb){
		this.setState({
			defaultDateCb: defaultcb,
			displayDateCb: displaycb
		});
	},
	setDisplayDate: function(d){
		this.state.displayDateCb(d);
	},
	setDefaultDate: function(d){
		this.state.defaultDateCb(d);
	},
	render: function(){		
		var today = new Date();
		var minYear = today.getFullYear()-1;
		var displayDate = sprintf("%04d-%02d-%02d", 
									today.getFullYear(),
									(today.getMonth()+1),
									today.getDate());
		
		var minDate = minYear+"-01-01"
				
		var gameList = [];
		var games = '';
		if(this.props.winnerdata && this.props.winnerdata.winners){
			gameList = this.props.winnerdata.winners.games.map(function(game, index){			
				return (
							<ElectronicaGame key={game.gameName}
												gameName={game.gameName}
												gameDisplayName={game.gameDisplayName}
												gameWinner={game.gameWinner}
												gameDate={game.gameDate}
												gameDraw={game.gameDraw}
							/>	 
				)
			});
		}
		
		if(gameList.length===0){
			games = (<div>No hubo juegos ese d&iacute;a</div>);
		} else {
			games = gameList;
		}			
		return (
			<div>
				<div><ElectronicaDate 	
								defaultDate={displayDate} 
								minDate={minDate}
								datesCb={this.datesCb}
								setNewDateCb={this.props.setNewDateCb}
					/></div>
				<div>{games}</div>
			</div>
		)	
	}
});

module.exports = ElectronicaComponent;