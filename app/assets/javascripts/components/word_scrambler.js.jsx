class WordScrambler extends React.Component{
  // constructor() {
  //   super();
  //
  //   this.state = {
  //     ltrIdx: 0,
  //     ltrs: [],
  //     shuffLtrs: []
  //   };
  //
  //   this._handleKeyUp = this._handleKeyUp.bind(this);
  // }
  //
  // _handleKeyUp(event){
  //   debugger
  //   if (event.keyCode === 8){
  //     console.log('backspace');
  //   } else{
  //     console.log(String.fromCharCode(event.keyCode));
  //   }
  // }

  render(){
    console.log('word is: ' + this.props.ltrs);
    let letters = this.props.shuffLtrs;
    var that = this;
    return(
      <div className="group word-scrambler" onKeyUp={this._handleKeyUp} >
        {letters.map(function(letter, idx){
          if(that.props.currentIdx > idx){
            return <LetterBlock highlighted={true} key={idx} ltr={letter}/>;
          } else {
            return <LetterBlock key={idx} ltr={letter}/>;
          }

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

var currentIdx = 3, shuffledLtrs, letters;

var response = $.ajax(api, {
  dataType: "json",
  success: function(){
    letters = response.responseJSON.word.split('');
    shuffledLtrs = (function(arr){
      var currentIndex = arr.length, tempVal, randIndex;

      while(currentIndex > 0){
        randIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        tempVal = arr[currentIndex];
        arr[currentIndex] = arr[randIndex];
        arr[randIndex] = tempVal;
      }
      return arr;
    })(letters.slice());
    React.render(<WordScrambler currentIdx={currentIdx}
       shuffLtrs={shuffledLtrs} ltrs={letters}/>, $('#app')[0]);
  }
});

$(function(){
  $(document).keydown(function(event){
    event.preventDefault();
  });

  $(document).keyup(function(event){
    event.preventDefault();
    if(event.keyCode === 8){
      console.log("backspace")
    } else{
      console.log(String.fromCharCode(event.keyCode));
    }

    console.log(letters);
    console.log(shuffledLtrs);
  });
});
