var React = require('react-native');

var ChannelTimeline = require('./ChannelTimeline.react');

var secrets = require('../../config/secrets.json');
var slackToken = secrets.token.slack;

var {
  Text,
  View,
  ScrollView,
  StyleSheet,
} = React;

var Timeline = React.createClass({

  getInitialState: function () {
    return {
      channels: [],
      channelMessagesMap: {}
    };
  },

  componentDidMount: function() {
    this.fetchChannels()
      .then((channels) => { 
        return this.fetchAllChannelsInfo(channels);
      })
      .then(this.fetchAllChannelsHistory)
      .then(() => {
        // this._descMessagesByNewness();
      })
  },

  fetchChannels: function() {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.list?token='+slackToken)
        .then((response) => response.text())
        .then((responseText) => {
          var channels = JSON.parse(responseText).channels;
          return channels;
        })
        .catch((error) => {
          console.warn(error);
        })
        .done((channels) => {
          resolve(channels);
        });
    });
  },

  fetchAllChannelsInfo: function(channels) {
    return new Promise((resolve, reject) => {
      var channelInfoPromises = channels.map(this._fetchChannelInfo);
      Promise.all(channelInfoPromises)
        .done(() => {
          resolve();
        })
    });
  },

  _fetchChannelInfo: function(channel) {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.info?token='+slackToken+'&channel='+channel.id)
        .then((response) => response.text())
        .then((responseText) => {
          var fetchedChannel = JSON.parse(responseText).channel;
          fetchedChannel.history = [];
          this.state.channels.push(fetchedChannel);
          this.setState({
            channels: this.state.channels
          })
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
      Promise.all(historyPromises)
        .done(() => {
          resolve();
        })
    });
  },

  _fetchHistory: function(channel) {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.history?token='+slackToken+'&channel='+channel.id+'&count=5')
        .then((response) => response.text())

        .then((responseText) => {
          var messages = JSON.parse(responseText).messages;
          this.state.channelMessagesMap[channel.id] = messages;
          this.setState({
            channelMessagesMap: this.state.channelMessagesMap
          })
        })

        .catch((error) => {
          console.warn(error);
        })
        .done(() => {
          resolve();
        });
    });
  },

  _descMessagesByNewness: function () {
    this.state.history = this.state.history.sort(function (messageA, messageB) {
      return +messageA.ts - +messageB.ts;
    });
  },

  render: function() {
    if (Object.keys(this.state.channelMessagesMap).length <= 0) {
      return null;
    }
    return (
      <View>
        <ScrollView
            style={styles.listView}
        >
        {
          this.state.channels.map( (channel, i) => {
            return <ChannelTimeline
              messages={this.state.channelMessagesMap[channel.id]}
              channel={channel}
            />
          })
        }
        </ScrollView>
      </View>
    );
  }

});

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
  listView: {
    paddingTop: 32,
    width: width,
    height: height,
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Timeline;
