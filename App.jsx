
App = React.createClass({
    componentDidMount(){
      document.title = this.props.title;
      
      
    },
   render(){
       $('textarea').froalaEditor({height:300});
       return(
            <div>
            <div className='resources'>
                {this.props.scripts.map(function(script, i){
                    return(<script src={script} key={i} />)
                })}
                {this.props.css.map(function(css, j){
                    return(<link rel='stylesheet' href={css} key={j}/>)
                })}
            </div>
            <div className='container_esp'>
                {this.props.children}
            </div>
            </div>
           )
   } 
    
});