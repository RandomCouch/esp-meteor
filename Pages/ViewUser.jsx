


var extraButtons = [];
extraButtons.push({label: "Back", handleClick: function(){
    history.back();
}})

var data = [];

ViewUser = React.createClass({
    getInitialState: function(){
      return{
          form:null,
          data: this.props.user
      }  
    },
    getForm: function(component){
      console.log("Got form ");
      this.setState({form:component});
    },
    componentDidMount:function(){
      //Reshape array
      var md = this.filterArray(this.props.user);
      this.setState({data:md});
    },
    filterArray:function(array){
      var d = array;
      var newD = [];
      console.log("All data: " + JSON.stringify(d));
      for(var i in d[0]){
          var row = d[0][i];
          if(i == "profile"){
              for(var j in d[0][i]){
                  d[0][j] = d[0][i][j];
              }
          }
          if(i == "emails"){
              d[0]["email"] = d[0][i][0].address;
          }
          
      }
      newD[0] = {};
      for(var x in d[0]){
          if(x == "_id"){
              newD[0]._id = d[0][x];
          }
      }
      for(var y in d[0]){
          if(y == "username"){
              newD[0].username  = d[0][y];
          }
      }
      for(var z in d[0]){
          if(z == "email"){
              newD[0].email = d[0][z];
          }
      }
      return newD;
    },
    saveRow:function(data){
      var id = data.id;
      var field = data.field;
      var value = data.value;
      var rData = {};
      rData[field] = value;
      if(field == "email"){
          rData = {"emails": [{address:value}]};
      }
      Meteor.users.update(id, {$set:rData});
      var newInfo = Meteor.users.find({_id: id}, {fields: {"username":1, "emails":1}}).fetch();
      newInfo = this.filterArray(newInfo);
      this.setState({data: newInfo});
    },
    render:function(){
        return(
                <div className='col-md-10'>
                    <BasicResultsEditable title='View User' getForm={this.getForm} saveRow={this.saveRow} questions={SignupFields} data={this.state.data} extraButtons={extraButtons}/>
                </div>
            )
    }
});