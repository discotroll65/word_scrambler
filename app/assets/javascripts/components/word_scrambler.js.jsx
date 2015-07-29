class WordScrambler extends React.Component{
  shuffle(arr){
    var currentIndex = arr.length, tempVal, randIndex;

    while(currentIndex > 0){
      randIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      tempVal = arr[currentIndex];
      arr[currentIndex] = arr[randIndex];
      arr[randIndex] = tempVal;
    }
    return arr;
  }

  render(){
    console.log(this.props.ltrs);
    let letters = this.shuffle(this.props.ltrs);

    return(
      <div className="group word-scrambler">
        {letters.map(function(letter, idx){
          return <LetterBlock key={idx} ltr={letter}/>;
        })}
      </div>
    )
  }
}

var api = "http://api.wordnik.com/v4/words.json/randomWord?"
api += "hasDictionaryDef=true"
api += "&minCorpusCount=0"
api += "&maxCorpusCount=-1"
api += "&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5"
api += "&maxLength=7"
api += "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

var response = $.ajax(api, {
  dataType: "json",
  success: function(){
    var letters = response.responseJSON.word.split('');
    React.render(<WordScrambler ltrs={letters}/>, $('#app')[0]);
  }
});
