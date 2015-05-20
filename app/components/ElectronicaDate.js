/// <reference path="../../typings/tsd.d.ts" />
var React = require("react");
var $ = require('jquery');
var sprintf = require("../utilities/sprintf").sprintf;

var ElectronicaDate = React.createClass({
	propTypes: {
		defaultDate: React.PropTypes.string.isRequired,
		minDate: React.PropTypes.string.isRequired,
    datesCb: React.PropTypes.func.isRequired
	},
  getInitialState: function(){
    return {
      newDate: null,
      defaultDate: this.props.displayDate
    }
  },
  /*formatUrl: function(){
    var dateTerm = this.state.newDate;
	  debugger;
    var myDate = new Date(dateTerm);
    var myDateString =  myDate.getFullYear() +'/'+ ('0' + (myDate.getMonth()+1)).slice(-2) + '/' + ('0' + myDate.getDate()).slice(-2);
    url = url + myDateString+"/.json";
    console.log("New URL:"+url);
    return "http://www.loteria-pr.com/api/loteria/electronica/2015/05/04/.json";
  },
  handleChange: function(e){
    debugger;
    this.setState({
      newDate: e.target.value
    })
  },
  handleSubmit: function(e){
    e.preventDefault();
    debugger;
    var url = this.formatUrl();
    console.log(url);
    $.ajax({
      url: url,
      dataType: 'JSONP',
      error: function(error){
        console.log("Error: ", error);
      },
      success: function(data){
        debugger;
		    //this.props.winnersCallback(data.results);
      }.bind(this)
    });
  },*/
  componentDidMount: function(){
    this.props.datesCb(this.setDefaultDate, this.setNewDate);
  },
  setNewDate: function(d){
    this.setState({
      newDate: d
    });
  },
  setDefaultDate: function(d){
    this.setState({
      defaultDate: d
    });  
  },
  render: function(){
    var dd = null;
    if(this.state.defaultDate){
      dd = sprintf("%04d-%02d-%02d",
                      this.state.defaultDate.getFullYear(),
                      (this.state.defaultDate.getMonth()+1),
                      this.state.defaultDate.getDate());
    }
    
    return (
      <div>
        <input type="date" 
          className="form-control" 
          value={dd}
		      min={this.props.minDate} 
 		   />
		  	<input type="button"  value="Dale!"></input>
      </div>
    )
  }
});

module.exports = ElectronicaDate;