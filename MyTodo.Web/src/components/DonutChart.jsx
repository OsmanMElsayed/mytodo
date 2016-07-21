/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');


var DonutChart = React.createClass({

    render() {
        var chartData = this.props.chartData;
        console.log('Chart Data!');
        console.log(chartData);
        var value = function (item) {
            return item.tasksCount;
        };
        var name = function (item) {
            return item.category.name;
        };

        var data = function () {
            return chartData;
        }

        return (
            <section className="pie-chart">
                
            </section>
        );
    }
});

module.exports = DonutChart;
