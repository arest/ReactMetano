var React = require('react');
var ReactRouter = require('react-router');
var HashHistory = require('react-router/lib/HashHistory');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var Main = require('./components/main');
var DistributorList = require('./components/distributor-list');
var DistributorNear = require('./components/distributor-near');


module.exports = (
	<Router history={new HashHistory}>
		<Route path="/" component={Main}>
			<Route path="/list/:lat/:lng/:distance" component={DistributorList}></Route>
			<Route path="/i-feel-lucky/:lat/:lng/:distance" component={DistributorNear}></Route>
		</Route>
	</Router>
);