class LetterBlock extends React.Component{
  render(){
    return(
      <div className="letter-block">
        <h1>{this.props.ltr}</h1>
      </div>
    );
  }
}
LetterBlock.propTypes = {
  ltr: React.PropTypes.string.isRequired
};
