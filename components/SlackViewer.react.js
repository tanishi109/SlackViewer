var SlackViewer = React.createClass({
  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          This is very first app made by react!!
        </Text>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
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