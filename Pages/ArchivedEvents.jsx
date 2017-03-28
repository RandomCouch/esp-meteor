

ArchivedEvents = React.createClass({
    getInitialState: function(){
      return{
          events:[],
          table:null
      }  
    },
    componentDidMount: function(){
      var allEvents = this.props.events;
      console.log("Got all events : " + JSON.stringify(allEvents));
      this.setState({events: allEvents});
    },
    handleDelete: function(eid){
      if(eid != null){
        Events.remove(eid);
        var newEvents = Events.find({archived:1}, {fields: {"Event Description": 1, "Event Title":1}}).fetch();
        this.setState({events:newEvents});
        this.state.table.render();
      }
    },
    handleEdit: function(eid){
      if(eid != null){
        Router.go('/cms/events/edit/' + eid);
      }
    },
    handleView: function(eid){
      if(eid != null){
        Router.go('/cms/events/view/' + eid);
      }
    },
    getTable: function(table){
      this.setState({table: table});
    },
    render:function(){
        return(
        <div className='col-md-10'>
          <h2>{this.props.title}</h2>
          <DataTable data={this.state.events} handleView={this.handleView} handleDelete={this.handleDelete} getTable={this.getTable}/>
          <button onClick={()=>{Router.go('/cms/events/create')}} className='btn btn-primary'>Add Event</button>
        </div>
        )
    }
});