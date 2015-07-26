var React = require('react-native');

var Timeline = require('./Timeline.react');

var {
  Text,
  View,
} = React;

var SlackViewer = React.createClass({

  getInitialState: function () {
    return {
      channels: ["empty"],
    };
  },

  render: function() {
    return (
      <View>
        <Timeline/>
      </View>
    );
  }

});

module.exports = SlackViewer;
