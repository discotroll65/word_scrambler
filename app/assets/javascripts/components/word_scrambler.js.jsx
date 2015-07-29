class WordScrambler extends React.Component{
  render(){
    let letters = this.props.ltrs;
    return(
      <div className="group word-scrambler">
        {letters.map(function(letter, idx){
          return <LetterBlock key={idx} ltr={letter}/>;
        })}
      </div>
    );
  }
}

var api = "http://api.wordnik.com/v4/words.json/randomWord?"
api = api + "hasDictionaryDef=true&minCorpusCount=0&maxCorpusCount=-1"
api = api + "&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5"
api = api + "&maxLength=7"
api = api + "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

var response = $.ajax(apiUrl, {
  dataType: "json",
  success: function(){
    var letters = response.responseJSON.word.split('');
    React.render(<WordScrambler ltrs={letters}/>, $('#app')[0]);
  }
});
