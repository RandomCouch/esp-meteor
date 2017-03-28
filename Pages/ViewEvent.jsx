


var extraButtons = [];
extraButtons.push({label: "Back", handleClick: function(){
    history.back();
}})

var data = [];

ViewEvent = React.createClass({
    getInitialState: function(){
      return{
          form:null,
          data: this.props.event
      }  
    },
    getForm: function(component){
      console.log("Got form ");
      this.setState({form:component});
    },
    saveRow:function(data){
      var id = data.id;
      var field = data.field;
      var value = data.value;
      var rData = {};
      rData[field] = value;
      Events.update(id, {$set:rData});
      var newInfo = Events.find({_id: id}).fetch();
      console.log("saving for : " + JSON.stringify(data));
      this.setState({data: newInfo});
    },
    render:function(){
        return(
                <div className='col-md-10'>
                    <BasicResultsEditable title='View Event' getForm={this.getForm} saveRow={this.saveRow} questions={EventFields} data={this.state.data} extraButtons={extraButtons}/>
                </div>
            )
    }
});