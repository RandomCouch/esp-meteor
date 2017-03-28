BasicResultsEditable = React.createClass({
    getInitialState: function(){
      return{
          errors:[] || this.props.errors,
          messages:[] || this.props.messages
      }  
    },
    componentDidMount: function(){
        this.props.getForm(this);  
    },
    saveEdit:function(data){
      this.props.saveRow(data);
    },
    render:function(){
        var classN = "results " + this.props.customStyle;
        var questions = [];
        var results = [];
        for(var i in this.props.data[0]){
            var type = "";
            var options = [];
            for(var x in this.props.questions){
                if(this.props.questions[x].label == i){
                    type = this.props.questions[x].type;
                    options = this.props.questions[x].options || [];
                }
            }
            if(!(this.props.data[0][i] instanceof Object)){
                if(i != "_id"){
                    results.push(<tr><td>{i}</td><td><EditableLabel value={this.props.data[0][i]} field={i} type={type} options={options} id={this.props.data[0]._id} saveEdit={this.saveEdit} /></td></tr>)
                }else{
                    results.push(<tr><td>{i}</td><td>{this.props.data[0][i]}</td></tr>)
                }
            }
        }
        return(
                <div className={classN}>
                    <h3>{this.props.title}</h3>
                    {this.state.errors.map(function(error, i){
                        return(<MessageBox key={i} type='error' message={error}/>);
                    })}
                    {this.state.messages.map(function(m, i){
                        return(<MessageBox key={i} type='success' message={m}/>);
                    })}
                    <table className='table table-responsive'>
                        <tbody>
                        {results}
                        </tbody>
                    </table>
                    <div>
                    </div>
                        {this.props.extraButtons.map(function (button, i){
                            return(
                                <div key={i}>
                                    <button type='button' onClick={button.handleClick} className='btn btn-secondary'>{button.label}</button>
                                </div>
                            )
                        })}
                </div>
            );
    }
    
});

var EditableLabel = React.createClass({
    getInitialState: function(){
        return{
            inEdit:false,
            value:this.props.value
        }  
    },
    componentDidMount: function(){
        $(ReactDOM.findDOMNode(this.refs.input)).hide();
        $(ReactDOM.findDOMNode(this.refs.inputDiv)).hide();
        $(ReactDOM.findDOMNode(this.refs.editBtn)).hide();
        
    },
    handleHover:function(e){
        e.stopPropagation();
        $(ReactDOM.findDOMNode(this.refs.editBtn)).fadeIn('fast');
    },
    handleHoverOut:function(e){
        e.stopPropagation();
        if(!this.state.inEdit){
           $(ReactDOM.findDOMNode(this.refs.editBtn)).fadeOut('fast'); 
        }
    },
    enterEdit:function(){
        if(this.state.inEdit){
            this.setState({inEdit:false});
            $(ReactDOM.findDOMNode(this.refs.editBtn)).attr('class','glyphicon glyphicon-pencil');
            $(ReactDOM.findDOMNode(this.refs.label)).show();
            $(ReactDOM.findDOMNode(this.refs.input)).hide();
            $(ReactDOM.findDOMNode(this.refs.inputDiv)).hide();
            var newVal = this.state.value;
            if(this.props.type == "textarea"){
                newVal = $(ReactDOM.findDOMNode(this.refs.input)).froalaEditor('html.get');
            }
            this.props.saveEdit({id: this.props.id, field: this.props.field, value: newVal});
        }else{
            this.setState({inEdit:true});
            $(ReactDOM.findDOMNode(this.refs.editBtn)).attr('class','glyphicon glyphicon-ok');
            $(ReactDOM.findDOMNode(this.refs.label)).hide();
            if(this.props.type == "textarea"){
                $(ReactDOM.findDOMNode(this.refs.inputDiv)).show();
            }else{
               $(ReactDOM.findDOMNode(this.refs.input)).show(); 
            }
            
            
            
        }
    },
    handleChange: function(e){
        var val = e.target.value;
        this.setState({value:val});
    },
    createMarkup:function(){
        return {
            __html: this.props.value
        }
    },
    handleSubmit: function(data){
        data.preventDefault();
      var val = data[0].value;
      this.setState({value:val});
    },
   render:function(){
       var val = this.props.value;
       var input = <input type={this.props.type} onChange={this.handleChange} className='form-control' value={this.state.value} ref='input'/>;
       if(this.props.type == "text"){
           input = <input type='text' onChange={this.handleChange} value={this.state.value} ref='input' className='form-control'/>;
       }else if(this.props.type == "radio"){
           input = <input type='radio' onChange={this.handleChange} value={this.state.value} ref='input' className='form-control'/>;
       }else if(this.props.type == "checkbox"){
           input = <input type='checkbox' onChange={this.handleChange} value={this.state.value} ref='input' className='form-control'/>;
       }else if(this.props.type == "password"){
           input = <input type='password' onChange={this.handleChange} value={this.state.value} ref='input' className='form-control'/>;
       }else if(this.props.type == "select"){
           input = <select className='form-control' onChange={this.handleChange} value={this.state.value} ref='input'>
                {this.props.options.map(function(o, i){
                    return(<option key={i}>{o}</option>);
                })}
           </select>;
       }else if(this.props.type == "number"){
           input = <input type='number' step='any' onChange={this.handleChange} value={this.state.value} ref='input'  className='form-control' />;
       }else if(this.props.type == "date"){
           input = <input type='date' onChange={this.handleChange} value={this.state.value} ref='input'  className='form-control' />;
       }else if(this.props.type == "textarea"){
           input = <form onSubmit={this.handleSubmit} ref='inputDiv'><textarea ref='input' className='form-control ckeditor' onChange={this.handleChange} value={this.state.value}></textarea></form>;
       }
       return(
            <div className='editableLabel' onMouseEnter={this.handleHover} onMouseLeave={this.handleHoverOut}>
                <label ref='label' dangerouslySetInnerHTML={{__html: this.props.value }}></label>
                {input}
                <span ref='editBtn' onClick={this.enterEdit} className='glyphicon glyphicon-pencil'></span>
            </div>
            )
   } 
    
});

var MessageBox = React.createClass({
   handleClick: function(){
       $(ReactDOM.findDOMNode(this.refs.messageBox)).fadeOut('fast');
   },
   componentDidMount: function() {
        $(ReactDOM.findDOMNode(this.refs.messageBox)).fadeIn('fast');
    },
   render: function(){
       return(
           <div ref='messageBox' onClick={this.handleClick} className={this.props.type}>{this.props.message}</div>
           );
   } 
});
var BasicQuestion = React.createClass({
   render:function(){
       var questionInput;
       var questionLabel = <label>{this.props.label}</label>;
       if(this.props.type == "textbox"){
           questionInput = <input type='text' name={this.props.id} className='form-control'/>;
       }else if(this.props.type == "radio"){
           questionInput = <input type='radio' name={this.props.id} className='form-control'/>;
       }else if(this.props.type == "checkbox"){
           questionInput = <input type='checkbox' name={this.props.id} className='form-control'/>;
       }else if(this.props.type == "password"){
           questionInput = <input type='password' name={this.props.id} className='form-control'/>;
       }else if(this.props.type == "select"){
           questionInput = <select className='form-control' name={this.props.id}>
                {this.props.options.map(function(o, i){
                    return(<option key={i}>{o}</option>);
                })}
           </select>;
       }else if(this.props.type == "number"){
           questionInput = <input type='number' step='any' name={this.props.id} className='form-control' />;
       }else if(this.props.type == "date"){
           questionInput = <input type='date' name={this.props.id} className='form-control' />;
       }else if(this.props.type == "textarea"){
           questionInput = <textarea className='form-control ckeditor' name={this.props.id}></textarea>;
       }
       return(
            <tr>
                <td>{questionLabel}</td>
                <td>{questionInput}</td>
            </tr>
           )
   } 
    
});