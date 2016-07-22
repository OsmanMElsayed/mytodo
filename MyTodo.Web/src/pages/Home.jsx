/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var CurrentDate = require('../components/CurrentDate.jsx');
var TasksContainer = require('../components/TasksContainer.jsx');
var CurrentWeekSummaryChart = require('../components/CurrentWeekSummaryChart.jsx');
var tasksStore = require('../mock/tasksStore.js');

var HomePage = React.createClass({

    getInitialState: function () {
        return { taskGroups: tasksStore.getTaskGroups(), currentWeekSummary: tasksStore.getCurrentWeekSummary() };
    },

    render() {
      return (
        <div className="container">
            <div className="row">
                <div className="col-md-offset-1 col-md-5">
                    <CurrentDate />
                    <TasksContainer taskGroups={this.state.taskGroups} />
                </div>
                <div className="col-md-4">
                    <CurrentWeekSummaryChart data={this.state.currentWeekSummary} />
                </div>
            </div>
        </div>
      );
    }
});

module.exports = HomePage;
