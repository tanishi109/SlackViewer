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
      .then(this.fetchMatchedChannelsHistory)
      .then(() => {
        console.log("END: fetchHistory !!");
        this._descMessagesByNewness();
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
            channelIds.push({
              id: channel.id,
              name: channel.name
            });
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
      Promise.all(historyPromises)
        .done(() => {
          resolve();
        })
    });
  },

  // RegexでhitしたChannel名のみのHistoriesを取得
  fetchMatchedChannelsHistory: function() {
    return new Promise((resolve, reject) => {
      var re = /h/
      var matchedChannels = this.state.channels.filter((channel) => {
        if (re.test(channel.name)) {
          return channel;
        }
      });
      var historyPromises = matchedChannels.map(this._fetchHistory);
      Promise.all(historyPromises)
        .done(() => {
          resolve();
        })
    });
  },

  _fetchHistory: function(channel) {
    return new Promise((resolve, reject) => {
      fetch('https://slack.com/api/channels.history?token='+slackToken+'&channel='+channel.id+'&count=3')
        .then((response) => response.text())

        .then((responseText) => {
          var values = JSON.parse(responseText);
          var messages = this.state.history || [];
          values.messages.forEach((message) => {
            message.channel = channel;
            messages.push(message);
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

  _descMessagesByNewness: function () {
    this.state.history.sort(function (messageA, messageB) {
      return +messageA.ts - +messageB.ts;
    });
  },

  render: function() {
    console.log("-------")
    console.log(this.state.history)
    if (!this.state.history) {
      return null;
    }

    // this.state.history = []
    // i=100;
    // while(i){
    //   this.state.history.push(i);
    //   i -= 1;
    // }

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
