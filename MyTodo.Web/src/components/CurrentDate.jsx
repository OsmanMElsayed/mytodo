/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var moment = require('moment');

var CurrentDate = React.createClass({
    render() {
        var now = moment();

        return (
            <section className="panel panel-default current-date">
                <div className="panel-body">
                    <div className="day-of-month">
                        {now.format('D')}
                    </div>
                    <div className="full-date">
                        <span className="day-of-week">{now.format('dddd')}</span>
                        <span className="month-day-year">{now.format('MMMM D, YYYY')}</span>
                    </div>
                    <div className="add-on">
                        <span className="glyphicon glyphicon-calendar"></span>
                    </div>
                </div>
            </section>
        );
    }
});

module.exports = CurrentDate;
