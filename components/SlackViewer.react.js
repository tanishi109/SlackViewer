
// https://github.com/inkenkun/react-native-todo/blob/master/App/components/TodoReact.react.js
// module exports したらいけるやん！！！！


var React = require('react-native');
var token = "xoxp-2435567268-2435567274-6653820643-5ee449";

var SlackViewer = React.createClass({
  getInitialState: function() {
    fetch('https://slack.com/api/channels.list?token='+token)
      .then((response) => response.text())
      .then((responseText) => {
        console.log(responseText);
      })
      .catch((error) => {
        console.warn(error);
      });

    return (
      "hoge"
    );
  },

  render: function() {
    return (
      <View>
        <Text>
          This is very first app made by react!!
        </Text>
      </View>
    );
  }
});


// var FilterableProductTable = React.createClass({
//     getInitialState: function() {
//         return {
//             filterText: '',
//             inStockOnly: false
//         };
//     },
//
//     handleUserInput: function(filterText, inStockOnly) {
//         this.setState({
//             filterText: filterText,
//             inStockOnly: inStockOnly
//         });
//     },
//
//     render: function() {
//         return (
//             <div>
//                 <SearchBar
//                     filterText={this.state.filterText}
//                     inStockOnly={this.state.inStockOnly}
//                     onUserInput={this.handleUserInput}
//                 />
//                 <ProductTable
//                     products={this.props.products}
//                     filterText={this.state.filterText}
//                     inStockOnly={this.state.inStockOnly}
//                 />
//             </div>
//         );
//     }
// });

