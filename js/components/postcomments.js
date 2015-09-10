var React = require('react');
var Comment = require('./comment.js');

var PostComments = React.createClass({
  getInitialState: function() {
    return {data: []};
  },
  render: function() {
    var commentNodes;
    if(typeof this.props.kids != 'undefined') {
      commentNodes = this.props.kids.map(function (id) {
        return (
          <Comment id={id} key={id} />
        );
      });
    }
    return (
      <div className="commentsList" key={this.props.id}>
        {commentNodes}
      </div>
    );
  }
});

module.exports = PostComments;