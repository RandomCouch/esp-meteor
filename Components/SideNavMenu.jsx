SideNavMenu = React.createClass({
    goBack: function(){
      history.back();  
    },
   render: function(){
       return(
            <div className='nav left'>
                <BasicMenu event={this.props.event || ""} items={this.props.items}>
                    <li onClick={this.goBack}>Back</li>
                </BasicMenu>
            </div>
           )
   } 
});