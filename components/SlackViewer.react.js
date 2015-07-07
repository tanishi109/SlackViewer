var React = require('react-native');
var token = "xoxp-2435567268-2435567274-6653820643-5ee449";

var {
  Text,
  View,
} = React;

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

module.exports = SlackViewer;
