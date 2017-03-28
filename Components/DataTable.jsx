DataTable = React.createClass({
    componentDidMount:function(){
        this.props.getTable(this);  
    },

   render:function(){
       var items = [];
       var keys = [];
       var headers = [];
       for(var i in this.props.data){
           keys = keys.concat(Object.keys(this.props.data[i]));
       }
       keys = $.unique(keys);
       for(var x in keys){
           if(keys[x] != "_id"){
            headers.push(<th key={x}>{keys[x]}</th>);
           }
       }
       if(this.props.handleView != null){
           headers.push(<th>View</th>);
       }
       if(this.props.handleEdit != null){
           headers.push(<th>Edit</th>);
       }
       if(this.props.handleDelete != null){
           headers.push(<th>Delete</th>);
       }
       for(var z in this.props.data){
           var thisData = this.props.data[z];
           var rowData = [];
           for(var y in keys){
               var kk = keys[y];
               if(kk != "_id"){
                   var newVal = "";
                   if(thisData.hasOwnProperty(kk)){
                        if(thisData[kk] instanceof Array){
                            newVal = <ul>
                                    {thisData[kk].map(function(val, l){
                                        
                                           return(<li key={l}>{JSON.stringify(val)}</li>);
                                        
                                    })}
                                     </ul>;
                        }else{
                            newVal = thisData[kk];
                        }
                   }
                   rowData.push(newVal);
                   
                }
           }
           items.push(<DataRow key={z} data={rowData} eid={thisData._id} handleView={this.props.handleView} handleDelete={this.props.handleDelete} handleEdit={this.props.handleEdit}/>)
       }
       return(
            <table className='table table-responsive'>
                <thead>
                    <tr>
                        {headers}
                    </tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
           )
   } 
});

var DataRow = React.createClass({
   render:function(){
       var editLink = "";
       var deleteLink = "";
       var viewLink = "";
       if(this.props.handleEdit){
           editLink = <td><span className='glyphicon glyphicon-pencil' onClick={()=> {this.props.handleEdit(this.props.eid)}}></span></td>;
       }
       if(this.props.handleDelete){
           deleteLink = <td><span className='glyphicon glyphicon-remove' onClick={()=> {this.props.handleDelete(this.props.eid)}}></span></td>;
       }
       if(this.props.handleView){
           viewLink = <td><span className='glyphicon glyphicon-search' onClick={()=> {this.props.handleView(this.props.eid)}}></span></td>;
       }
       var extras = [viewLink, editLink, deleteLink];
       return(
           <tr>
                {this.props.data.map(function(d,i){
                    return(<td key={i} dangerouslySetInnerHTML={{__html: d }}></td>)
                })
                }
                {extras}
           </tr>
           
           
           )
   } 
});