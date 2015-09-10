var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Helpers = require("../libs/helpers.js");

var User = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  getUserFromServer: function(user_id) {
    var post_info;
    $.ajax({
      url: "https://hacker-news.firebaseio.com/v0/user/" + user_id + ".json?print=pretty",
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this)
    });
  
  }, 

  componentDidMount: function() {
    this.getUserFromServer(this.props.params.id); 
  }, 

  render: function() {
    var timeAgo = Helpers.timeAgo(this.state.data.created);
    return (
      <div className='userProfile'>
        <table border="0">
          <tr>
            <td valign="top">user:</td>
            <td>neurologic</td>
          </tr>
          <tr>
            <td valign="top">created:</td>
            <td>{timeAgo}</td>
          </tr>
          <tr>
            <td valign="top">karma:</td>
            <td>{this.state.data.karma}</td>
          </tr>
          <tr>
            <td valign="top">about:</td>
            <td dangerouslySetInnerHTML={{__html: this.state.data.about}}></td>
          </tr>
          <tr>
            <td></td>
            <td><a href="submitted?id=neurologic"><u>submissions</u></a></td>
          </tr>
          <tr>
            <td></td>
            <td><a href="threads?id=neurologic"><u>comments</u></a></td>
          </tr>
        </table>
      </div>
    );
  }
});

module.exports = User;