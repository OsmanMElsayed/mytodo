'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var { Router, Route, IndexRoute, browserHistory } = require('react-router');
var DefaultLayout = require('./layouts/Default.jsx');
var Home = require('./pages/Home.jsx');
var AddTask = require('./pages/AddTask.jsx');

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={DefaultLayout}>
            <IndexRoute component={Home} />
            <Route path="tasks/add" component={AddTask} />
        </Route>
    </Router>,
  document.body
);