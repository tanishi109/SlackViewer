getInitialState: function() {
  return {
    items: [
      {id: 1, todo: 'Learn react native', complete: false},
      {id: 2, todo: 'Make a to-do app', complete: true}
    ],
    value: '',
    selectedTab: 'todo'
  };
},

fetch("https://slack.com/api/channels.list?token=xoxp-2435567268-2435567274-6653820643-5ee449")
  .then((response) => response.text())
  .then((responseText) => {
    console.log(responseText);
  })
  .catch((error) => {
    console.warn(error);
});

render: function() {
  return (
    <ListView
      dataSource={this.state.dataSource}
      renderRow={(rowData) => <Text>{rowData}</Text>}
    />
  );
}

