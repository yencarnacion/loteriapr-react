/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");

var $ = require('jquery');
var ElectronicaComponent = require('./ElectronicaComponent');
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
var Home = React.createClass({
  getInitialState: function() {
    return {
      url: 'http://www.loteria-pr.com/api/loteria/electronica/',
      electronicaData: {
        winners: {
          games: []
        }
      }
      
    };
  },
  componentDidMount: function(){
    this.getElectronicaWinners();
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
          this.setState({
            electronicaData: data            
          });
          debugger;
        }.bind(this)
    });
  }, 
  render: function() {  
          window.i=this;
          debugger;
    return (
          <ElectronicaComponent winnerdata={this.state.electronicaData} />
    );
  }
});

module.exports = Home;

/*
 This is your root route. When you wrap it with Reapp()
 it passes your class two properties:

  - viewListProps: Passes the scrollToStep to your ViewList so it animates
  - child: The child route
*/