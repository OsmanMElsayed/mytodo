/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var ReactDOM = require('react');
var DonutChart = require('../charts/DonutChart');


var CurrentWeekSummaryChart = React.createClass({

    componentDidMount() {
        var donutChart = new DonutChart('#current-week-summary-chart');
        donutChart.draw(this.props.data);
    },

    render() {
        return (
            <section className="panel panel-default panel-mytodo">
                <div className="panel-heading">
                    <strong>Current Week Summary</strong>
                </div>
                <div id="current-week-summary-chart" className="panel-body">
                </div>
            </section>
        );
    }
});

module.exports = CurrentWeekSummaryChart;
