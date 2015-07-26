/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SlackViewer = require('./app/scripts/components/SlackViewer.react');

var {
  AppRegistry,
} = React;

AppRegistry.registerComponent('SlackViewer', () => SlackViewer);
