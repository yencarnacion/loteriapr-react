/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");
var ElectronicaDate = require('./ElectronicaDate');
var ElectronicaGame = require('./ElectronicaGame');
var sprintf = require("../utilities/sprintf").sprintf;

var ElectronicaComponent = React.createClass({
	propTypes: {
		winnerdata: React.PropTypes.object.isRequired,
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
		window.h=this;
		debugger;
		if(this.props.winnerdata.winners){
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
			
			if(gameList.length===0){
				games = (<div></div>);
			} else {
				games = gameList;
			}	
			window.h = this;
			
		}
		
		return (
			/*<div><ElectronicaDate 	
								displayDate={displayDate} 
								minDate={minDate}
								
								/></div>*/
				<div>{games}</div>
		)	
	}
});

module.exports = ElectronicaComponent;