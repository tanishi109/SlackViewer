var React = require('react-native');
var token = "xoxp-2435567268-2435567274-6653820643-5ee449";

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

  componentDidMount: function() {
    this.fetchChannels();
    this.fetchHistory(this.state.channels[0]);
  },

  fetchChannels: function() {
    fetch('https://slack.com/api/channels.list?token='+token)
      .then((response) => response.text())
      .then((responseText) => {
        var values = JSON.parse(responseText);
        var channelIds = [];

        values.channels.forEach(function(channel) {
          channelIds.push(channel.id);
        });
        console.log(channelIds);
        this.setState({
          channels: channelIds,
          loaded: true,
        });
      })
      .catch((error) => {
        console.warn(error);
      })
      .done();
  },

  fetchHistory: function(channelId) {
    fetch('https://slack.com/api/channels.history?token='+token+'&channel='+channelId)
      .then((response) => response.text())
      .then((responseText) => {
        var values = JSON.parse(responseText);
        console.log(values);
        this.setState({
          channels: values,
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
        {this.state.channels.map(function(elm, i){
          return (
            <Text>
              {elm}
            </Text>
          );
        })}
      </View>
    );
  }

});

module.exports = SlackViewer;
