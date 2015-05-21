/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");
var Router = require('react-router');
var sprintf = require("../utilities/sprintf").sprintf;

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
  contextTypes: {
    router: React.PropTypes.func
  },
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
  componentWillReceiveProps: function(newprops){
    this.getElectronicaWinners();
  },
  datesCb: function(defaultcb, displaycb){
		this.setState({
			defaultDateCb: defaultcb,
			displayDateCb: displaycb
		});
	},
  getElectronicaWinners: function(){
    var year = this.context.router.getCurrentParams().edateyear;
    var month = this.context.router.getCurrentParams().edatemonth;
    var day = this.context.router.getCurrentParams().edateday;

    var edate = null;
    if(year&&month&&day){
      edate = sprintf("%04d/%02d/%02d",
                          year,
                          month,
                          day);
    }

    var api = "latest/.json";
    if(edate){
      api = edate + "/.json";  
    }
    console.log("Connecting to: "+ this.state.url+api);
    $.ajax({
        url: this.state.url+api,
        dataType: 'JSONP',
        error: function(error){
          console.log("Error: ", error);
        },
        success: function(data){
          if(data && data.winners && data.winners.games && data.winners.games.length > 0){
            var dt = new Date(data.winners.games[0].gameDate);
            this.state.defaultDateCb(dt);
            this.setState({
              electronicaData: data            
            });
          } else {
            var dt = new Date(edate);
            this.state.defaultDateCb(dt);
            this.setState({
              electronicaData: null            
            });
            // no games on that day
          }

        }.bind(this)
    });
  }, 
  render: function() {  
    return (
      <div>
        <ElectronicaComponent winnerdata={this.state.electronicaData} 
                              datesCb={this.datesCb}
                              />
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