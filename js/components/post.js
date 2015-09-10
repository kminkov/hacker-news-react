var React = require('react');
var PostInfo = require("./postinfo.js");
var PostComments = require("./postcomments.js");
var Router = require('react-router');
var Link = Router.Link;
var Helpers = require("../libs/helpers.js");

var Post = React.createClass({
  getInitialState: function() {

    return {data: []};
  },

  getPostFromServer: function(post_id) {
    var post_info;
    $.ajax({
      url: "https://hacker-news.firebaseio.com/v0/item/" + post_id + ".json?print=pretty",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  
  }, 

  /*
    Helper method to get the Id based on whether it is comming from url param
    or as a prop.
   */
  getId: function() {
    var id;
    if (typeof this.props.params != "undefined" && typeof this.props.params.id != "undefined") {
      id = this.props.params.id;
    }else {
      id = this.props.id;
    } 
    return id;
  },

  componentDidMount: function() {
    this.getPostFromServer(this.getId()); 
  }, 

  render: function() {
    var comments, userLink;
    
    if (this.props.type != 'short') {
      comments = <PostComments id={this.state.data.id} kids={this.state.data.kids}/>;
    }

    if(typeof this.state.data.by != 'undefined') {
      userLink = <Link to="user" params={{id: this.state.data.by}} >{this.state.data.by}</Link>
    }
    
    var timeAgo = Helpers.timeAgo(this.state.data.time);

    span_id = "score_" + this.props.id;
    return (
      <div className="post">
        <div className='votearrow'></div>
        <h2 className="postTitle">
          <a href={this.state.data.url}>{this.state.data.title} </a>
        </h2>
         {/*<PostInfo id={this.state.data.id} points={this.state.data.score} user={this.state.data.by}></PostInfo> */}
         
        <div className="postInfo">
          <span id={span_id} className="score">{this.state.data.score} points by</span>
          {userLink}
          <Link to="post" params={{id: this.getId()}} >{timeAgo}</Link>
          |
          <Link to="post" params={{id: this.getId()}} >11 comments</Link>
        </div> 
        {comments}
      </div>
      
    );
  }
});

module.exports = Post;