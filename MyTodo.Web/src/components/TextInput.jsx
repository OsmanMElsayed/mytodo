'use strict';

var React = require('react');

var TextInput = React.createClass({

    render() {
        return (
            <div className="form-group">
                <label htmlFor="{this.props.id}">{this.props.label}</label>
                <input type="text" className="form-control" id="{this.props.id}" onChange={this.props.changeHandler} required={this.props.required} />
            </div>
        );
    }
});

module.exports = TextInput;