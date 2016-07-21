'use strict';

var React = require('react');
var moment = require('moment');
var Enumerable = require('linq');

function TasksStore() {

    var self = this;

    var homeTasks = {
        id: 1,
        color: 'red',
        name: 'Home'
    };
    var workTasks = {
        id: 2,
        color: 'blue',
        name: 'Work'
    };
    var firendsTasks = {
        id: 3,
        color: 'orange',
        name: 'Friends'
    };

    this._tasks = [
        {
            category: homeTasks,
            title: 'Buy bed sheets',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: workTasks,
            title: 'Present react.js',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 8:30')
        },
        {
            category: homeTasks,
            title: 'Water the plants',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 9:00')
        },
        {
            category: firendsTasks,
            title: 'chill out',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 22:00')
        },
        {
            category: homeTasks,
            title: 'Buy bed sheets',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: workTasks,
            title: 'Present react.js',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-20 8:30')
        },
        {
            category: homeTasks,
            title: 'Water the plants',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-20 9:00')
        },
        {
            category: firendsTasks,
            title: 'chill out',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-20 22:00')
        }
    ];

    this.addTask = function (task) {
        var maxId = Enumerable.from(self._tasks).max(function (task) { return task.id; });
        task.id = maxId + 1;

        self._tasks.push(task);
    }

    this.getTaskGroups = function () {
        console.log('Get Task Groups');
        var taskGroups = Enumerable.from(self._tasks).groupBy(function (task) { 
            return task.dueDate.format('YYYY-M-D');
        }, null, function (key, group) {
            return { dueDate: moment(key), tasks: group.toArray() };
        }).toArray();
        console.log(taskGroups);

        return taskGroups;
    }

    this.getCurrentWeekSummary = function () {
        var dueTasksByCategory = Enumerable.from(self._tasks).where(function (task) {
            return task.dueDate.isBefore(moment().add(8, 'days'));
        }).groupBy(function (task) { return task.category }, null, function (key, group) {
            return { category: key, tasksCount: group.toArray().length };
        }).toArray();

        return dueTasksByCategory;
    }
};

module.exports = new TasksStore();