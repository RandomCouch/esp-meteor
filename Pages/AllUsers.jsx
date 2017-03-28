

AllUsers = React.createClass({
    getInitialState: function(){
      return{
          users:[],
          table:null
      }  
    },
    componentDidMount: function(){
      var allUsers = this.props.users;
      console.log("Got all users : " + JSON.stringify(allUsers));
      this.setState({users: allUsers});
    },
    handleDelete: function(eid){
      if(eid != null){
        Meteor.users.remove(eid);
        var newUsers = Meteor.users.find({}).fetch();
        this.setState({users:newUsers});
        this.state.table.render();
      }
    },
    handleView: function(eid){
      if(eid != null){
        Router.go('/cms/users/view/' + eid);
      }
    },
    getTable: function(table){
      this.setState({table: table});
    },
    render:function(){
        return(
        <div className='col-md-10'>
          <h2>{this.props.title}</h2>
          <DataTable data={this.state.users} handleView={this.handleView} handleDelete={this.handleDelete} getTable={this.getTable}/>
          <button onClick={()=>{Router.go('/cms/users/create')}} className='btn btn-primary'>Add User</button>
        </div>
        )
    }
});