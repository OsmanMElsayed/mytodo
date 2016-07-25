'use strict';

var React = require('react');
var moment = require('moment');
var Enumerable = require('linq');

function TasksStore() {

    this._categories = [
        {
            id: 1,
            color: 'red',
            name: 'Home'
        },
        {
            id: 2,
            color: 'blue',
            name: 'Work'
        },
        {
            id: 3,
            color: 'orange',
            name: 'Friends'
        }
    ];

    this._tasks = [
        {
            category: this._categories[0],
            description: 'Buy bed sheets',
            dueDate: moment('2016-7-26'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: this._categories[1],
            description: 'Present react.js',
            dueDate: moment('2016-7-27'),
            reminderDate: moment('2016-7-22 8:30')
        },
        {
            category: this._categories[0],
            description: 'Water the plants',
            dueDate: moment('2016-7-28'),
            reminderDate: moment('2016-7-22 9:00')
        },
        {
            category: this._categories[2],
            description: 'chill out',
            dueDate: moment('2016-7-26'),
            reminderDate: moment('2016-7-22 22:00')
        },
        {
            category: this._categories[0],
            description: 'Buy bed sheets',
            dueDate: moment('2016-7-27'),
            reminderDate: moment('2016-7-21 12:20')
        },
        {
            category: this._categories[1],
            description: 'Study ES6',
            dueDate: moment('2016-7-26'),
            reminderDate: moment('2016-7-20 8:30')
        },
        {
            category: this._categories[0],
            description: 'bake a cake',
            dueDate: moment('2016-7-28'),
            reminderDate: moment('2016-7-27 9:00')
        },
        {
            category: this._categories[2],
            description: 'watch Real Madrid match',
            dueDate: moment('2016-7-26'),
            reminderDate: moment('2016-7-26 22:00')
        }
    ];

    this.addTask = function (task) {
        var maxId = Enumerable.from(this._tasks).max(function (task) { return task.id; });
        task.id = maxId + 1;
        console.log(task.categoryId);
        task.category = Enumerable.from(this._categories).first(function (category) {
            console.log(category);
            return category.id == task.categoryId;
        });
        delete task.categoryId;

        this._tasks.push(task);
    }

    this.getTaskGroups = function () {
        console.log('Get Task Groups');
        var taskGroups = Enumerable.from(this._tasks).where(function (task) {
            return task.dueDate >= moment();
        }).groupBy(function (task) {
            return task.dueDate.format('YYYY-M-D');
        }, null, function (key, group) {
            return { dueDate: moment(key), tasks: group.toArray() };
        }).orderBy(function (tasksGroup) {
            return tasksGroup.dueDate;
        }).toArray();

        return taskGroups;
    }

    this.getCurrentWeekSummary = function () {
        var dueTasksByCategory = Enumerable.from(this._tasks).where(function (task) {
            return task.dueDate.isBefore(moment().add(8, 'days'));
        }).groupBy(function (task) { return task.category }, null, function (key, group) {
            return { category: key, value: group.toArray().length };
        }).toArray();

        return {
            data: dueTasksByCategory,
            total: Enumerable.from(dueTasksByCategory).sum(function (dueTasksByCategoryItem) {
                return dueTasksByCategoryItem.value;
            }),
            unit: ''
        };
    }

    this.getCategories = function () {
        return this._categories;
    }
};

module.exports = new TasksStore();