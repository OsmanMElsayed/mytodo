/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var CurrentDate = require('../components/CurrentDate.jsx');
var TasksContainer = require('../components/TasksContainer.jsx');
var PieChart = require('../components/PieChart.jsx');
var tasksMock = require('../mock/tasksMock.js');

var HomePage = React.createClass({

    getInitialState: function () {
        return { taskGroups: tasksMock.getTaskGroups(), dueTasks: tasksMock.getCurrentWeekDueTasks() };
    },

    render() {
      return (
        <div className="container">
            <div className="row">
                <div className="col-md-offset-1 col-md-4">
                    <CurrentDate />
                    <TasksContainer taskGroups={this.state.taskGroups} />
                </div>
                <div className="col-md-5">
                    <PieChart dueTasks={this.state.dueTasks} />
                </div>
            </div>
        </div>
      );
    }
});

module.exports = HomePage;
