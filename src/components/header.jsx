var React = require('react');
var Router = require('react-router');
var Link = Router.Link;

module.exports = React.createClass({

    getInitialState: function() {
        return {
            topics: []
        }
    },
    render: function() {
        return <nav className="navbar navbar-default header">
        	<div className="container-fluid">
        		<Link to="/" className="navbar-brand">
        			Metano Trova Distributore
        		</Link>
        		<ul className="nav navbar-nav navbar-right">
                    {this.renderTopics()}
        		</ul>
        	</div>
        </nav>
    },
    renderTopics: function() {  
        return this.state.topics.slice(0,4).map(function(topic) {
            return <li key={topic.id} className="">
                <Link activeClassName="active" to={"/topics/"+topic.id}>
                    {topic.name}
                </Link>
            </li>
        });
    }
});