var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

var userList = {
  U02CTGP82: "tanishi",
  U02DAV4GF: "tuuna"
}

var ChannelTimeline = React.createClass({
  render: function() {
    if (!(this.props.channel && this.props.messages)) {
      return null;
    }
    return (
      <View style={styles.container}>
        <Text>
          #{this.props.channel.name}
        </Text>
        {
          this.props.messages.map( (message, i) => {
            return (
              <Text>
                {message.text}
              </Text>
            );
          });
        }
      </View>
    );
  }
});

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

var styles = StyleSheet.create({
  container: {
    padding: 8,
    width: width,
    backgroundColor: '#F5FCFF',
  }
});

module.exports = ChannelTimeline;
