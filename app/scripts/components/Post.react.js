var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

var Post = React.createClass({
  render: function() {
    return (
      <View>
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

module.exports = Post;
