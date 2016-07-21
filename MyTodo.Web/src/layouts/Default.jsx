/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');

var DefaultLayout = React.createClass({
    render() {
        return (
          <div className="main-container">
              <this.props.activeRouteHandler />
          </div>
        );
    }
});

module.exports = DefaultLayout;
