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

var Post = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text>
          #{this.props.message.channel.name+" "}
          - {userList[this.props.message.user]}
        </Text>
        <Text>
          {this.props.message.text}
        </Text>
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

module.exports = Post;
