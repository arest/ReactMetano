var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Alert = require('react-bootstrap').Alert;
var ListGroup = require('react-bootstrap').ListGroup;
var DistributorStore = require('../stores/distributor-store');
var PositionStore = require("../stores/position-store");
var Actions = require('../actions');


module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(DistributorStore,'onChange')
    ],
    componentWillMount: function() {
        var lat = this.props.params.lat;
        var lng = this.props.params.lng;
        var distance = this.props.params.distance;
        Actions.getDistributors(lat,lng,distance);
    },
    getInitialState: function() {
        return {
            loaded:false,
            items: [],
            lat: null,
            lng: null
        }
    },
    render: function() {
        if (this.state.loaded && this.state.items.length == 0) {
            return <Alert bsStyle="warning">
                <strong>Nussun risultato con questi criteri</strong>
            </Alert>
        };
        if (this.state.loaded)
            return <ListGroup>
                {this.renderItems()}
            </ListGroup>
        else
            return <div className={ "whirly-loader " + (this.state.loaded ? 'hidden' : null) }>
                    Loading...
            </div>

    },
    renderItems: function() { 
        var lat = this.state.lat;
        var lng = this.state.lng;
        return this.state.items.slice(0,5).map(function(item,index) {
            var distributor = item._source;
            var link = "maps://maps.google.com/maps?saddr="+lat+","+lng+"&daddr=" + distributor.location.lat+","+ distributor.location.lon;
            return <ListGroupItem 
                    href={ link }
                    key={ index }
                >
                <h4>{distributor.name}</h4>
                {distributor.address} {distributor.town} ({distributor.province}) {distributor.country}
            </ListGroupItem>
        });
    },
    onChange: function(event,items,location) {
        this.setState({
            items:items,
            loaded:true,
            lat:location.lat,
            lng:location.lng
        })
    }
});