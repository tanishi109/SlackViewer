var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Post = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          {this.props.message.channel.name}
        </Text>
        <Text>
          {this.props.message.text}
        </Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    marginTop: 20,
    height: 300,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = Post;
