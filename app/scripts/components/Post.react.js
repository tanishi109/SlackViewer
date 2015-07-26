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
          {this.props.message}
        </Text>
      </View>
    );
  }
});

module.exports = Post;
