

var extraButtons = [];
extraButtons.push({label: "Back", handleClick: function(){
    history.back();
}})

CreateEvent = React.createClass({
    getInitialState: function(){
      return{
          form:null
      }  
    },
    submitForm: function(data){ 
        var eventData = {};
        for(var i in data){
            var answer = data[i].value;
            var question = EventFields[i].label;
            eventData[question] = answer;
        }
        eventData.archived = 0;
        Events.insert(eventData);
        var self = this;
        var eventDir = eventData["Event Directory"];
        var eventTitle = eventData["Event Title"];
        Router.go('/cms/events');
    },
    getForm: function(component){
      console.log("Got form ");
      this.setState({form:component});
    },
    render:function(){
        return(
                <div className='col-md-10'>
                    <BasicForm title='Add Event' getForm={this.getForm} questions={EventFields} extraButtons={extraButtons} submitForm={this.submitForm} submitButtonLabel="Add Event"/>
                </div>
            )
    }
});