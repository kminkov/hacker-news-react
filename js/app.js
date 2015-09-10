var React = require('react');
var PostList = require("./components/postlist.js");
var Post = require("./components/post.js");
var User = require("./components/user.js");
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;

var App = React.createClass({
  render () {
    return (
      <div>
        <div id="header">
          <div id="logo"></div>
          <div className="title">
            <Link to="posts" >Hacker news</Link>
          </div>
        </div>
        <div id="content">
          <RouteHandler/>
        </div>
      </div>
    )
  }
});

var routes = (
  <Route handler={App}>
    <Route path="/" handler={PostList} name="posts"/>
    <Route path="/post/:id" handler={Post} name="post"/>
    <Route path="/user/:id" handler={User} name="user"/>
  </Route> 
);

Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.body);
});

/*React.render(( 
  <Router history={HashHistory}>
    <Route path="/" component={PostList}>
    </Route>
  </Router>
), document.body);*/