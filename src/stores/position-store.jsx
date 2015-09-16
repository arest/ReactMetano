var Reflux = require('reflux');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	listenables: [Actions],
	getPosition: function() {
    	if(navigator.geolocation)
      		navigator.geolocation.getCurrentPosition(this.onPositionUpdate)
	},
	onPositionUpdate: function(position) {
	    this.lat = position.coords.latitude;
	    this.lng = position.coords.longitude;
	    this.triggerChange();
  	},
	triggerChange:function() {
		this.trigger('change',{lat: this.lat,lng: this.lng});
	}
});