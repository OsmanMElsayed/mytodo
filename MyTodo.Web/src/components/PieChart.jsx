/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var PieChart = require('react-d3-basic').PieChart;


var CurrentDate = React.createClass({

    render() {
        var chartData = this.props.dueTasks;
        value = function (task) {
            return task.population;
        };
        name = function (d) {
            return d.age;
        };

        return (
            <section className="pie-chart">
                <PieChart data={chartData}
                          value={value}
                          name={name}
                          innerRadius={innerRadius} />
            </section>
        );
    }
});

module.exports = CurrentDate;
