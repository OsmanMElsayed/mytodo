'use strict';

var React = require('react');
var TasksGroup = require('../components/TasksGroup.jsx');

var TasksContainer = React.createClass({

    render() {
        console.log(this.props.taskGroups);
        var taskGroups = this.props.taskGroups.map(function (tasksGroup) {
            return <TasksGroup tasksGroup={tasksGroup} />;
        });

        return (
            <section className="tasks-container">
                { taskGroups }
            </section>
        );
    }
});

module.exports = TasksContainer;
