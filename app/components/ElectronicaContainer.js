/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");
var Router = require('react-router');

var $ = require('jquery');
var ElectronicaComponent = require('./ElectronicaComponent');

var { Route, RouteHandler, Link } = Router;
   /*
   i.setState({ 
       electronicaData: 
	       { winners: 
		        { games: [ 
			                 { 	gameDate: "a", 
				                  gameDisplayName: "b", 
				                  gameDraw: "c", 
			                   	gameName: "d", 
				                  gameWinner: "e"
			                 }
			             ]
		         }
	       }
	})
  */
 
var ElectronicaContainer = React.createClass({
  getInitialState: function() {
    return {
      url: 'http://www.loteria-pr.com/api/loteria/electronica/',
      electronicaData: {
        winners: {
          games: []
        }
      },
      defaultDateCb: null,
      displayDateCb: null
      
    };
  },
  componentDidMount: function(){
    this.getElectronicaWinners();
  },
  datesCb: function(defaultcb, displaycb){
		this.setState({
			defaultDateCb: defaultcb,
			displayDateCb: displaycb
		});
	},
  getElectronicaWinners: function(){
    console.log("Connecting to: "+ this.state.url+"latest/.json");
    $.ajax({
        url: this.state.url+"latest/.json",
        dataType: 'JSONP',
        error: function(error){
          console.log("Error: ", error);
        },
        success: function(data){
          var d = new Date(data.winners.games[0].gameDate);
          this.state.defaultDateCb(d)
          this.setState({
            electronicaData: data            
          });

        }.bind(this)
    });
  }, 
  render: function() {  
    return (
      <div>
        <ElectronicaComponent winnerdata={this.state.electronicaData} 
                              datesCb={this.datesCb} />
      </div>   
    );
  }
});

module.exports = ElectronicaContainer;

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/