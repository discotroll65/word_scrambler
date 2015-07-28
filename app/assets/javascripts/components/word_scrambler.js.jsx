class WordScrambler extends React.Component{
  render(){
    return(
      <div className="group word-scrambler">
        <LetterBlock ltr="G"/>
        <LetterBlock ltr="A"/>
        <LetterBlock ltr="R"/>
        <LetterBlock ltr="R"/>
        <LetterBlock ltr="R"/>
        <LetterBlock ltr="E"/>
        <LetterBlock ltr="T"/>
        <LetterBlock ltr="T"/>
      </div>
    );
  }
}

$(function () {
  React.render(<WordScrambler/>, $('#app')[0]);
});
