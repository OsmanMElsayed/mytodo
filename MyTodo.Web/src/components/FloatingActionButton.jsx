'use strict';

var React = require('react');

var FloatingActionButton = React.createClass({
    render() {

        var buttonCssClasses = 'button floating-action ';
        var spanCssClasses = 'glyphicon glyphicon-'

        switch (this.props.action)
        {
            case 'save':
                buttonCssClasses += 'primary';
                spanCssClasses += 'floppy-disk';
                break;
            case 'cancel':
                buttonCssClasses += 'warning';
                spanCssClasses += 'ban-circle';
                break;
            case 'add':
            default:
                buttonCssClasses += 'primary'
                spanCssClasses += 'plus';
                break;
        }
        
        return (
            <button className={buttonCssClasses} onClick={this.props.clickHandler}>
                <span className={spanCssClasses} />
            </button>
        );
    }
});

module.exports = FloatingActionButton;
