EventPage = React.createClass({
   render:function(){
       return(
            <App css={Links} title={this.props.title} scripts={Scripts}>
                <EventTopMenu event={this.props.event} items={DefaultEventLinks} />
                <BasicPage>
                    <DataTable data={Events.find({}).fetch()} />
                </BasicPage>
                <BasicFooter event={this.props.event}  items={DefaultEventLinks} />
            </App>
           )
   } 
    
});