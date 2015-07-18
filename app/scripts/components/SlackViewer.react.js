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
    this.fetchChannels()
      .then(() => {
        return new Promise((resolve, reject) => {
          var historyPromises = this.state.channels.map(this.fetchHistory);
          console.log(historyPromises);
          Promise.all(historyPromises)
            .done(() => {
              resolve();
            })
        });
      })
      .then(() => {
        console.log("then 2 !!", this);
      })
  },

  fetchChannels: function() {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.list?token='+token)
        .then((response) => response.text())

        .then((responseText) => {
          var values = JSON.parse(responseText);
          var channelIds = [];
          values.channels.forEach((channel) => {
            channelIds.push(channel.id);
          });
          this.setState({
            channels: channelIds,
            loaded: true,
          });
        })

        .catch((error) => {
          console.warn(error);
        })
        .done(() => {
          resolve();
        });
    });
  },

  fetchHistory: function(channelId) {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.history?token='+token+'&channel='+channelId)
        .then((response) => response.text())

        .then((responseText) => {
          var values = JSON.parse(responseText);
          var messages = messages || [];
          values.messages.forEach((message) => {
            // console.log(message.text);
            messages.push(message.text);
          })
          this.setState({
            history: messages
          });
        })

        .catch((error) => {
          console.warn(error);
        })
        .done(() => {
          resolve();
        });
    });
  },

  render: function() {
    if (!this.state.history) {
      return null;
    }
    return (
      <View>
        {this.state.history.map(function(elm, i){
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
