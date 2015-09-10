var React = require('react');
var Helpers = require("../libs/helpers.js");
var Comment = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  getCommentFromServer: function(post_id) {
    var post_info;
    $.ajax({
      url: "https://hacker-news.firebaseio.com/v0/item/" + post_id + ".json?print=pretty",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    })
  
  }, 

  componentDidMount: function() {
    this.getCommentFromServer(this.props.id); 
  },

  render: function() {
    var post_comments; 
    var commentNodes;
    var timeAgo = Helpers.timeAgo(this.state.data.time);

    if (typeof this.state.data.kids != 'undefined') {
      commentNodes = this.state.data.kids.map(function (id) {
        return (
          <Comment id={id} key={id} />
        );
      });
    } 
    
    return (
      <div className='postComment'>
        <div> 
          <div className='votearrow'></div>
          <span className="comhead">
            <a href="user?id=click170">{this.state.data.by}</a> 
            <a href="item?id=9732011">{timeAgo}</a> 
          </span>
        </div>
        <div className="comment" dangerouslySetInnerHTML={{__html: this.state.data.text}}>
        </div>
        <div className="reply">        
           <p>
             <font size="1">
               <u><a href="reply">reply</a></u>
             </font>
           </p>
         </div>
         <div className="commentsList" key={this.props.id}>
           {commentNodes}
         </div>
      </div>
    );
  }
}); 

module.exports = Comment;