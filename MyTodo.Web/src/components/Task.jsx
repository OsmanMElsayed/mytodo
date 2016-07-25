'use strict';

var React = require('react');

var Task = React.createClass({
    render() {
        var taskIndicatorStyle = {
            backgroundColor: this.props.task.category.color
        };

        return (
            <li className="task">
                <span style={taskIndicatorStyle} className="task-color" title={this.props.task.category.name}></span>
                <span className="task-title">
                    {this.props.task.description}
                </span>
            </li>
        );
    }
});

module.exports = Task;
