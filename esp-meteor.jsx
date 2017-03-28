//Users = new Mongo.Collection('users');
Events = new Mongo.Collection('events');

var events = [];

Meteor.users.allow({remove:function() { return true }, update: function(){ return true }});



if(Meteor.isClient){
    Meteor.startup(function(){
      Router.onBeforeAction(function(){
        var currentRoute = Router.current().route.getName() ? Router.current().route.getName() : "";
        var idParam = this.params.id ? this.params.id : "";
        var routeSplit = currentRoute.toString().split('.');
        console.log("Route: " + JSON.stringify(routeSplit));
        var event = this.params.event;
        var page = this.params.page ? this.params.page : "";
        if(event == "cms"){
          if(!Meteor.userId() && Router.current().route.path() != '/signup'){
            ReactDOM.render(<App session={Session} css={Links} title="Login" scripts={Scripts}>
                    <LoginForm />
                </App>, document.getElementById("render-target"));
            this.next();
          }else{
            this.next();
            
          }
        }else{
          console.log("User went to event " + event + " : " + page);
          var ev = Events.find({"Event Directory": event}).fetch();
          if(ev.length > 0){
            var eTitle = ev["Event Title"];
            ReactDOM.render(<EventPage event={event} title={eTitle} />, document.getElementById("render-target"));
          }
          /*
          var allEvents = Events.find({}).fetch();
          for(var i  in allEvents){
            var dirName = allEvents[i]["Event Directory"];
            var finalDir = "/" + dirName;
            var eventInfo = allEvents[i];
            var eventTitle = eventInfo["Event Title"];
            if(dirName == routeSplit[0]){
              ReactDOM.render(<EventPage event={dirName} title={eventTitle} />, document.getElementById("render-target"));
            }
          }
          */
          this.next();
        }
        
      });
      
      var currentUser = Meteor.userId();
      /* MAIN ROUTING */
      Router.route('/', function(){
            ReactDOM.render(<App session={Session} css={Links} title="Main" scripts={Scripts}>
              </App>, document.getElementById("render-target"));
      });
      
      /* CMS ROUTING */
      Router.route('/cms', function(){
              var allUsers = Meteor.users.find({}).fetch();
              console.log("USERS: " + JSON.stringify(allUsers));
              //exampleData = Meteor.users.find({}).fetch();
            ReactDOM.render(<App session={Session} css={Links} title="Main" scripts={Scripts}>
                <TopNavMenu user={Meteor.user()} items={TopLinks} />
                <SideNavMenu items={SubPagesMain} />
              </App>, document.getElementById("render-target"));
      });
      
      Router.route('/cms/users/signup', function(){
          ReactDOM.render(<App session={Session} css={Links} title="Signup" scripts={Scripts}>
                  <SignupForm />
              </App>, document.getElementById("render-target"));
      });
      
      Router.route('/cms/users/logout', function(){
        currentUser = Meteor.userId();
        if(currentUser){
          Meteor.logout();
          currentUser = null;
          delete Session.keys['user'];
        }
        Router.go('/cms');
      });
      /* EVENTS ROUTING */
      Router.route('/cms/events', function(){
        events = Events.find({archived:0}, {fields: {"Event Description": 1, "Event Title":1}}).fetch();
        ReactDOM.render(<App session={Session} css={Links} title="All Events" scripts={Scripts}>
                    <TopNavMenu user={Meteor.user()} items={TopLinks} />
                    <SideNavMenu items={SubPagesEvents} />
                    <AllEvents title="All Events" events={events}/>
                </App>, document.getElementById("render-target"));
      });
      Router.route('/cms/events/archived', function(){
        events = Events.find({"archived":1}, {fields: {"Event Description": 1, "Event Title":1}}).fetch();
        ReactDOM.render(<App session={Session} css={Links} title="Archived Events" scripts={Scripts}>
                    <TopNavMenu user={Meteor.user()} items={TopLinks} />
                    <SideNavMenu items={SubPagesEvents} />
                    <ArchivedEvents title="Archived Events" events={events}/>
                </App>, document.getElementById("render-target"));
      });
      Router.route('/cms/events/create', function(){
        console.log("Create event page");
        ReactDOM.render(<App session={Session} css={Links} title="Create Event" scripts={Scripts}>
                  <TopNavMenu user={Meteor.user()} items={TopLinks} />
                  <SideNavMenu items={SubPagesEvents} />
                  <CreateEvent />
              </App>, document.getElementById("render-target"));
      });
      Router.route('/cms/events/view/:id', function(){
        var eid = this.params.id;
        console.log("View event : " + eid);
        var event = Events.find({_id: eid}).fetch();
        
        ReactDOM.render(<App session={Session} css={Links} title="View Event" scripts={Scripts}>
                  <TopNavMenu user={Meteor.user()} items={TopLinks} />
                  <SideNavMenu items={SubPagesEvents} />
                  <ViewEvent event={event} />
              </App>, document.getElementById("render-target"));
      });
      /* USERS ROUTING */
      Router.route('/cms/users', function(){
        var users = Meteor.users.find({}, {fields: {"username": 1, "email":1}}).fetch();
        ReactDOM.render(<App session={Session} css={Links} title="All Events" scripts={Scripts}>
                    <TopNavMenu user={Meteor.user()} items={TopLinks} />
                    <SideNavMenu items={SubPagesUsers} />
                    <AllUsers title="All Users" users={users}/>
                </App>, document.getElementById("render-target"));
      });
      Router.route('/cms/users/view/:id', function(){
        var eid = this.params.id;
        console.log("View user : " + eid);
        var user = Meteor.users.find({_id: eid}, {fields: {"username":1, "emails":1}}).fetch();
        
        ReactDOM.render(<App session={Session} css={Links} title="View User" scripts={Scripts}>
                  <TopNavMenu user={Meteor.user()} items={TopLinks} />
                  <SideNavMenu items={SubPagesUsers} />
                  <ViewUser user={user} />
              </App>, document.getElementById("render-target"));
      });
    });
    /* FRONT END EVENT ROUTING */
    /*
    Router.route('/:event/:page', function(){
      var event = this.params.event ? this.params.event  : "";
      var page = this.params.page ? this.params.page : "";
      var allEvents = Events.find({}).fetch();
      console.log("Route for events");
      for(var i  in allEvents){
        var dirName = allEvents[i]["Event Directory"];
        var finalDir = "/" + dirName;
        var eventInfo = allEvents[i];
        var eventTitle = eventInfo["Event Title"];
        if(dirName == event){
          ReactDOM.render(<EventPage event={dirName} title={eventTitle} />, document.getElementById("render-target"));
        }
      }
      this.next();
    });
    */
    /*
    Router.route('/:event', function(){
      var event = this.params.event ? this.params.event  : "";
      var allEvents = Events.find({}).fetch();
      for(var i  in allEvents){
        var dirName = allEvents[i]["Event Directory"];
        var finalDir = "/" + dirName;
        var eventInfo = allEvents[i];
        var eventTitle = eventInfo["Event Title"];
        if(dirName == event){
          ReactDOM.render(<EventPage event={dirName} title={eventTitle} />, document.getElementById("render-target"));
        }
      }
      this.next();
    });
    */
    Router.route('/:event/:page?',function(){
        var event = this.params.event ? this.params.event : "";
        var page = this.params.page ? this.params.page : "";
        console.log("ROUTE: " + event + " : " + page );
        this.next();
    });
}


