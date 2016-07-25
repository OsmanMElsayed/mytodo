'use strict';

var React = require('react');
var Task = require('../components/Task.jsx');

var TasksGroup = React.createClass({
    render() {
        var tasks = this.props.tasksGroup.tasks.map(function(task) {
            return (
                <Task task={task} />
                );
        });

        return (
               <div className="panel panel-default panel-mytodo">
                   <div className="panel-heading">
                       <div className="day-of-week">
                           <strong>{this.props.tasksGroup.dueDate.format('dddd')}</strong>
                       </div>
                       <div className="date">
                           <strong>{this.props.tasksGroup.dueDate.format('D MMM')}</strong>
                       </div>
                   </div>
                   <div className="panel-body">
                       <ul className="tasks">
                           {tasks}
                       </ul>
                   </div>
               </div>
        );
    }
});

module.exports = TasksGroup;
