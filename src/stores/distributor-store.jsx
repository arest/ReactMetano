var Reflux = require('reflux');
var Actions = require('../actions');
var elasticsearch = require('elasticsearch');
var Config = require("../config");
var client = new elasticsearch.Client({
  host: Config.api.baseUrl
  //log: 'trace'
});

module.exports = Reflux.createStore({
	listenables: [Actions],
	getDistributors: function(lat,lng,distance) {
		this.lat = lat;
		this.lng = lng;
		this.distance = distance;
		client.search({
		  index: 'metano',
		  type: 'distributor',
		  body: {
		    query: {
      			filtered: {
        			query: {
						"match_all" : {}
					}
				}
			},
			filter: {
				"geo_distance" : {
                	"distance" : distance+"km",
                	"location" : lat+','+lng
            	}
			},
			"sort": [
			    {
			      "_geo_distance": {
			        "location": { 
			          "lat":  lat,
			          "lon": lng
			        },
			        "order":         "asc",
			        "unit":          "km", 
			        "distance_type": "plane" 
			      }
			    }
			]
		  }
		}).then(function (resp) {
		    this.items = resp.hits.hits;
		    this.triggerChange();
		}.bind(this), function (err) {
		    console.trace(err.message);
		});
	},
	triggerChange:function() {
		this.trigger('change',this.items,{lat: this.lat,lng: this.lng});
	}
});