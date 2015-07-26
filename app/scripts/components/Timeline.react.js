var React = require('react-native');

var Post = require('./Post.react');

var secrets = require('../../config/secrets.json');
var slackToken = secrets.token.slack;

var {
  Text,
  View,
  ListView,
  StyleSheet,
} = React;

var Timeline = React.createClass({

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
    console.log("-------")
    console.log(this.state)
    if (!this.state.history) {
      return null;
    }

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    return (
      <View>
        <ListView
            dataSource={ds.cloneWithRows(this.state.history)}
            renderRow={ (rowData) =>
              <Post message={rowData}/>
            }
        />
      </View>
    );
  }

});

module.exports = Timeline;
