'use strict';

var React = require('react');

var TextInput = React.createClass({

    render() {
        var self = this;

        var options = this.props.options.map(function (option) {
            return <option value={option.value}>{option.text}</option>
        });

        return (
            <div className="form-group">
                <label htmlFor="{this.props.id}">{this.props.label}</label>
                <select className="form-control" id="{this.props.id}" required={this.props.required} onChange={self.props.changeHandler}>
                    <option value="" disabled selected>Select a category</option>
                    {options}
                </select>
            </div>
        );
    }
});

module.exports = TextInput;