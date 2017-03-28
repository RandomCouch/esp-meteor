TopNavMenu = React.createClass({
   render: function(){
       console.log("USER: " + JSON.stringify(this.props.user));
       var userWelcome = "";
       if(this.props.user){
           userWelcome = <div className='user'>Welcome {this.props.user.username} </div>;
       }
       return(
            <div className='nav top'>
                {userWelcome}
                <BasicMenu event={this.props.event || ""} items={this.props.items}>
                    <li><a href='/'><span className='glyphicon glyphicon-home'></span></a></li>
                </BasicMenu>
            </div>
           )
   } 
});