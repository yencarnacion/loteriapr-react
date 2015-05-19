/// <reference path="../typings/tsd.d.ts" />
var React = require('react');
var Home = require('./components/Home');

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <Home />
        </div>
      </div>
    )
  }
});

React.render(
  <App />,
  document.getElementById('app')
)
