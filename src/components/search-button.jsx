var React = require('react');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var Link = Router.Link;

module.exports = React.createClass({
	componentWillMount: function() {
		this.setState({
        	enabled: this.props.lat ? true : false
		});
  	},
    getInitialState: function() {
        return {
        	enabled: this.props.lat ? true : false
        }
    },
	componentWillReceiveProps: function(nextProps) {
		this.setState({
        	enabled: nextProps.lat ? true : false
		});
    },
    render: function() {
        return <Button 
        		bsStyle="success" 
        		bsSize="large" 
        		href={"#list/" + this.props.lat + '/' + this.props.lng + '/' + this.props.distance }
        		disabled={this.state.enabled ? false : true}
        	>
        	Elenco Distributori vicini
        </Button>
    }
});