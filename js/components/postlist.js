var React = require('react');
var Post = require('./post.js');

var PostList = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  loadTopPostsFromServer: function() {
    $.ajax({
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data.slice(0,20)});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadTopPostsFromServer(); 
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  
  render: function() {
    var postNodes = this.state.data.map(function (id) {
      return (
        <Post id={id} key={id} type='short'>
        </Post>
      );
    });
    return (
      <div className="postList">
        {postNodes}
      </div>
    );
  }
});

module.exports = PostList;