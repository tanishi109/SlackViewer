/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');

// var someComponent = require('./components/current');
var token = "xoxp-2435567268-2435567274-6653820643-5ee449";

var SlackViewer = React.createClass({
  getInitialState: function () {
    return {
      channels: "a",
    };
  },
  componentDidMount: function() {
    this.fetchData();
  },
  fetchData: function() {
    fetch('https://slack.com/api/channels.list?token='+token)
      .then((response) => response.text())
      .then((responseText) => {
        var values = JSON.parse(responseText);
        var channelNames = [];
        values.channels.forEach(function(channel) {
          channelNames.push(channel.name);
        });
        this.setState({
          channels: channelNames,
          loaded: true,
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  },

  render: function() {
    console.log("-----------")
    console.log(this)
    if (!this.state.channels) {
      return null;
    }
    return (
      <View>
        <Text>
          This is very first app made by react!! {this.state.channels}
        </Text>
      </View>
    );
  }
});
// var ChannelsList = require('./components/ChannelsList');
// var Channel = require('./components/Channel');

// var SlackViewer = React.createClass({
//   render: function() {
// return (
//   <View style={styles.container}>
// <Text style={styles.welcome}>
//   This is very first app made by react!!
// </Text>
// <Text style={styles.welcome}>
//   Welcome to React Native!
// </Text>
// <Text style={styles.instructions}>
//   To get started, edit index.ios.js
// </Text>
// <Text style={styles.instructions}>
//   Press Cmd+R to reload,{'\n'}
//   Cmd+D or shake for dev menu
// </Text>
//   </View>
// );
//   }
// });

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

// var styles = StyleSheet.create({
//   container: {
// flex: 1,
// justifyContent: 'center',
// alignItems: 'center',
// backgroundColor: '#F5FCFF',
//   },
//   welcome: {
// fontSize: 20,
// textAlign: 'center',
// margin: 10,
//   },
//   instructions: {
// textAlign: 'center',
// color: '#333333',
// marginBottom: 5,
//   },
// });

AppRegistry.registerComponent('SlackViewer', () => SlackViewer);
