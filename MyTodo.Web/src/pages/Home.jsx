'use strict';

var React = require('react');
var CurrentDate = require('../components/CurrentDate.jsx');
var TasksContainer = require('../components/TasksContainer.jsx');
var CurrentWeekSummaryChart = require('../components/CurrentWeekSummaryChart.jsx');
var FloatingActionButton = require('../components/FloatingActionButton.jsx');
var tasksStore = require('../stores/tasksStore.js');
var { browserHistory } = require('react-router');

var HomePage = React.createClass({

    getInitialState: function () {
        return { taskGroups: tasksStore.getTaskGroups(), currentWeekSummary: tasksStore.getCurrentWeekSummary() };
    },

    navigateToAddTask() {
        browserHistory.push('/tasks/add');
    },

    render() {
        return (
            <div>
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

                <div className="floating-actions">
                    <FloatingActionButton action="add" clickHandler={this.navigateToAddTask} />
                </div>
            </div>

      );
    }
});

module.exports = HomePage;
