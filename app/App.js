/// <reference path="../typings/tsd.d.ts" />
var React = require('react');
var Router = require('react-router');
var ElectronicaContainer = require('./components/ElectronicaContainer');
var Navbar = require('react-bootstrap').Navbar;

var { Route, RouteHandler, Link, DefaultRoute } = Router;

var App = React.createClass({
  render: function(){
    return (
      <div className="container">
        <div className="row">
          <Navbar brand='Loter&iacute;a-PR' />
          <RouteHandler />
        </div>
      </div>
    )
  }
});

var routes = (
  <Route path="/" handler={App}>
    <Route name="electronica/:edateyear/:edatemonth/:edateday" handler={ElectronicaContainer} />
    <DefaultRoute handler={ElectronicaContainer} />
  </Route>
)

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('app'));
});

