class WordScrambler extends React.Component{
  render(){
    console.log('word is: ' + this.props.ltrs);
    let letters = this.props.shuffLtrs;
    var that = this;

    return(
      <div className="group word-scrambler" >
        {letters.map(function(letter, idx){
          if(that.props.currentIdx > idx){
            return <LetterBlock highlighted={true}
              key={idx} checked={that.props.checked} ltr={letter}/>;
          } else {
            return <LetterBlock key={idx}
              checked={that.props.checked} ltr={letter}/>;
          }

        })}
        <Timer seconds={this.props.seconds} score={this.props.score}/>
      </div>
    );
  }
}
