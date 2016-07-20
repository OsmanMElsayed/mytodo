'use strict';

var React = require('react');
var moment = require('moment');
var Enumerable = require('../linq');

function TasksMock() {

    var self = this;

    this._tasks = [
        {
            category: {
                id: 1,
                color: 'red',
                name: 'Home'
            },
            title: 'Buy bed sheets',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: {
                id: 2,
                color: 'blue',
                name: 'Work'
            },
            title: 'Present react.js',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 8:30')
        },
        {
            category: {
                id: 1,
                color: 'red',
                name: 'Home'
            },
            title: 'Water the plants',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 9:00')
        },
        {
            category: {
                id: 3,
                color: 'orange',
                name: 'Friends'
            },
            title: 'chill out',
            dueDate: moment('2016-7-23'),
            reminderDate: moment('2016-7-22 22:00')
        },
        {
            category: {
                id: 1,
                color: 'red',
                name: 'Home'
            },
            title: 'Buy bed sheets',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: {
                id: 2,
                color: 'blue',
                name: 'Work'
            },
            title: 'Present react.js',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-20 8:30')
        },
        {
            category: {
                id: 1,
                color: 'red',
                name: 'Home'
            },
            title: 'Water the plants',
            dueDate: moment('2016-7-22'),
            reminderDate: moment('2016-7-20 9:00')
        },
        {
            category: {
                id: 3,
                color: 'orange',
                name: 'Friends'
            },
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
        var taskGroups = Enumerable.from(self._tasks).groupBy(function (task) { return task.dueDate; });
        console.log(taskGroups);

        return taskGroups;
    }

    this.getCurrentWeekDueTasks = function () {
        console.log('Due Tasks');
        var dueTasks = Enumerable.from(self._tasks).where(function (task) { return task.dueDate < moment().add(7, 'days'); }).groupBy(function (task) { return category });
        console.log(dueTasks);

        return dueTasks;
    }
};

module.exports = new TasksMock();