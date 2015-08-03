class LetterBlock extends React.Component{
  render(){
    var classes = (this.props.highlighted) ? "letter-block highlighted" : "letter-block" ;
    return(
      <div className={classes}>
        <h1>{this.props.ltr}</h1>
      </div>
    );
  }
}
LetterBlock.propTypes = {
  ltr: React.PropTypes.string.isRequired
};
