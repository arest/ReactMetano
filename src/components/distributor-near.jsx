var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var ListGroup = require('react-bootstrap').ListGroup;
var DistributorStore = require('../stores/distributor-store');
var PositionStore = require("../stores/position-store");
var Actions = require('../actions');
var Alert = require('react-bootstrap').Alert;


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(DistributorStore,'onChange'),
    ],
    componentWillMount: function() {
        var lat = this.props.params.lat;
        var lng = this.props.params.lng;
        var distance = this.props.params.distance;
        Actions.getDistributors(lat,lng,distance);
    },
    getInitialState: function() {
        return {
            items: [],
            lat: null,
            lng: null,
            loaded: false
        }
    },
    render: function() {
        if (this.state.loaded && this.state.items.length == 0) {
            return <Alert bsStyle="warning">
                <strong>Nussun risultato con questi criteri</strong>
            </Alert>
        };
        return <div>Invio dati a google maps ....</div>
    },
    onChange: function(event,items,location) {
        if (items.length > 0) {
            var distributor = items[0]._source;
            var lat = location.lat;
            var lng = location.lng;
            var link ="maps://maps.google.com/maps?saddr="+lat+","+lng+"&daddr=" + distributor.location.lat+","+ distributor.location.lon;
            window.location = link;
        };
        this.setState({
            loaded: true,
            items: items
        });
    }
});