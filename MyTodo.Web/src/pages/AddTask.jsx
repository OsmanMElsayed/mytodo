'use strict';

var React = require('react');
var TextInput = require('../components/TextInput.jsx');
var SelectInput = require('../components/SelectInput.jsx');
var DateTimeInput = require('../components/DateTimeInput.jsx');
var FloatingActionButton = require('../components/FloatingActionButton.jsx');
var { browserHistory } = require('react-router');
var tasksStore = require('../stores/tasksStore.js');

var AddTask = React.createClass({

    getInitialState: function () {
        return { task: {}, };
    },

    updateDescription: function (event) {
        var task = Object.assign({}, this.state.task);
        task.description = event.target.value;

        this.setState({ task: task });
    },

    updateCategory: function (event) {
        var task = Object.assign({}, this.state.task);
        task.categoryId = event.target.value;

        this.setState({ task: task });
    },

    updateReminderDate: function (moment) {
        var task = Object.assign({}, this.state.task);
        task.reminderDate = moment;

        this.setState({ task: task });
    },

    updateDueDate: function (moment) {
        var task = Object.assign({}, this.state.task);
        task.dueDate = moment;

        this.setState({ task: task });
    },

    cancel: function() {
        browserHistory.push('/');
    },

    save: function() {
        tasksStore.addTask(this.state.task);
        browserHistory.push('/');
    },

    render() {
        var categoriesSelectOptions = tasksStore.getCategories().map(function (category) {
            return { value: category.id, text: category.name };
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <section className="panel panel-default panel-mytodo">
                            <div className="panel-heading">
                                <strong>Add New Task</strong>
                            </div>
                            <div className="panel-body">
                                <TextInput id="description" label="Description" required="true" changeHandler={this.updateDescription} />
                                <SelectInput id="category" label="Category" required="true" changeHandler={this.updateCategory} options={categoriesSelectOptions} />
                                <DateTimeInput label="Remind Me On" changeHandler={this.updateReminderDate} />
                                <DateTimeInput label="Due On" changeHandler={this.updateDueDate} />
                            </div>
                        </section>
                    </div>
                </div>
                <div className="floating-actions">
                    <FloatingActionButton action="cancel" clickHandler={this.cancel} />
                    <FloatingActionButton action="save" clickHandler={this.save} />
                </div>
            </div>
      );
    }
});

module.exports = AddTask;