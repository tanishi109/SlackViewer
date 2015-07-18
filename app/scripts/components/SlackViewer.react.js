var React = require('react-native');

var secrets = require('../../config/secrets.json');

var slackToken = secrets.token.slack;

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
      .then(this.fetchAllChannelsHistory)
      .then(() => {
        console.log("then 2 !!", this);
      })
  },

  fetchChannels: function() {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.list?token='+slackToken)
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

  // state.channelsからHistoriesを取得
  fetchAllChannelsHistory: function() {
    return new Promise((resolve, reject) => {
      var historyPromises = this.state.channels.map(this._fetchHistory);
      console.log(historyPromises);
      Promise.all(historyPromises)
        .done(() => {
          resolve();
        })
    });
  },

  _fetchHistory: function(channelId) {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.history?token='+slackToken+'&channel='+channelId)
        .then((response) => response.text())

        .then((responseText) => {
          var values = JSON.parse(responseText);
          var messages = this.state.history || [];
          values.messages.forEach((message) => {
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
