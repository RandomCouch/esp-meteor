BasicFooter = React.createClass({
   render: function(){
       return(
            <footer className='footer'>
                <div className='container'>
                <div className='nav'>
                    <BasicMenu event={this.props.event || ""} items={this.props.items}>
                        
                    </BasicMenu>
                </div>
                </div>
            </footer>
           )
   } 
});