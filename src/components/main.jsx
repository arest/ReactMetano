var React = require('react');
var Reflux = require('reflux');
var Header = require('./header');
var SearchButton = require('./search-button');
var LuckyButton = require('./lucky-button');
var ButtonToolbar = require('react-bootstrap').ButtonToolbar;
var PositionStore = require("../stores/position-store");
var Actions = require('../actions');
var ReactSlider = require('react-slider');

module.exports = React.createClass({
  mixins: [
        Reflux.listenTo(PositionStore,'onChange')
  ],
  componentWillMount: function() {
    Actions.getPosition();
  },
  getInitialState: function() {
    return {
      lat: null,
      lng: null,
      distance: 50
    }
  },
  getChildren: function() {
  	if (this.props.children)
  		return this.props.children;
	else return <div>
      <ButtonToolbar>
      <SearchButton lat={this.state.lat} lng={this.state.lng} distance={this.state.distance} />
      <LuckyButton lat={this.state.lat} lng={this.state.lng} distance={this.state.distance} />
    </ButtonToolbar>
      <div id="horizontal-0">
          <ReactSlider 
            defaultValue={this.state.distance} 
            min={10} 
            max={100} 
            step={10} 
            className='horizontal-slider'
            onChange={this.handlOnChange}
        />
          Raggio di ricerca: { this.state.distance } Km.
      </div>
    </div>
  },
  render: function() {
    return <div>
    	<Header />
      	{this.getChildren()}
    </div>
  },
  onChange: function(event,location) {
    this.setState({
      lat: location.lat,
      lng: location.lng
    });
  },
  handlOnChange:function(item) {
    this.setState({
      distance: item
    });
  }
});