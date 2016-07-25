'use strict';

var DateTime = require('react-datetime');

var React = require('react');

var TextInput = React.createClass({

    render() {
        return (
            <div className="form-group">
                <label>{this.props.label}</label>
                <DateTime closeOnSelect="true" dateFormat="dddd, MMMM D, YYYY" onChange={this.props.changeHandler} />
            </div>
        );
    }
});

module.exports = TextInput;