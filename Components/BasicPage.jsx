BasicPage = React.createClass({
   render:function(){
       return(
            <div className='container-fluid'>
                {this.props.children}
            </div>
           )
   } 
    
});