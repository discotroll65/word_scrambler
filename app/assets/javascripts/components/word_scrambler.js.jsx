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
      </div>
    );
  }
}

var api = "http://api.wordnik.com/v4/words.json/randomWord?"
api += "hasDictionaryDef=true"
api += "&minCorpusCount=0"
api += "&maxCorpusCount=-1"
api += "&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5"
api += "&maxLength=7"
api += "&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5"

var currentIdx = 0, shuffledLtrs, letters, currentShuffLtrs;

var shuffle = function(arr){
  var currentIndex = arr.length, tempVal, randIndex;

  while(currentIndex > 0){
    randIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempVal = arr[currentIndex];
    arr[currentIndex] = arr[randIndex];
    arr[randIndex] = tempVal;
  }
  return arr;
};

var getNewWord = $.ajax.bind(this, api, {
  dataType: "json",
  success: function(apiResponse){
    letters = apiResponse.word.split('').map(function(letter){
      return letter.toUpperCase();
    });

    shuffledLtrs = shuffle(letters.slice());

    currentShuffLtrs = shuffledLtrs.slice();

    React.render(<WordScrambler currentIdx={currentIdx}
      shuffLtrs={shuffledLtrs} ltrs={letters}/>, $('#app')[0]);
  }
});
getNewWord();

var handleLetterInput = function(letter, currentIndex, currentShuffLtrs){
  var remainingArr = currentShuffLtrs.slice(currentIndex, currentShuffLtrs.length);
  var switchIdx = remainingArr.indexOf(letter);
  if(switchIdx !== -1){
    var temp = currentShuffLtrs[currentIndex];
    currentShuffLtrs[currentIndex] = currentShuffLtrs[switchIdx + currentIndex];
    currentShuffLtrs[switchIdx + currentIndex] = temp;
    currentIndex += 1;
  }
  return {currentShuffLtrs: currentShuffLtrs, currentIdx: (currentIndex)}
};

// var handleWordEval = function(currentIdx, currentShuffLtrs, checked){

var handleWordEval = function(){
  var checked = (currentShuffLtrs.join('') === letters.join('')) ?
    "won" : "lost";

  if(checked === "won"){
    React.render(<WordScrambler currentIdx={currentIdx}
      shuffLtrs={currentShuffLtrs} checked={checked}
      ltrs={letters}/>, $('#app')[0]);
    currentIdx = 0;
    setTimeout(getNewWord, 1000);
  } else{
    React.render(<WordScrambler currentIdx={currentIdx}
      shuffLtrs={currentShuffLtrs} checked={checked}
      ltrs={letters}/>, $('#app')[0]);
    setTimeout(function(){
      currentIdx = 0;
      React.render(<WordScrambler currentIdx={currentIdx}
        shuffLtrs={shuffledLtrs} ltrs={letters}/>, $('#app')[0]);
    }, 1000);
  }

}

$(function(){
  $(document).keydown(function(event){
    event.preventDefault();
  });

  $(document).keyup(function(event){
    event.preventDefault();
    if(event.keyCode === 8){
      //decrement the highlighting if you push backspace
      currentIdx = (currentIdx === 0) ? 0 : (currentIdx - 1) ;
      React.render(<WordScrambler currentIdx={currentIdx}
        shuffLtrs={currentShuffLtrs} ltrs={letters}/>, $('#app')[0]);
    } else if(event.keyCode >= 65 && event.keyCode <= 90){
      //advance letter highlighting if there's a match
      var letter = String.fromCharCode(event.keyCode);
      var results = handleLetterInput(letter, currentIdx, currentShuffLtrs);
      currentShuffLtrs = results.currentShuffLtrs;
      currentIdx = results.currentIdx;

      //either handle a word eval or render normally
      if(currentIdx === letters.length){
        handleWordEval();
      } else{
        React.render(<WordScrambler currentIdx={currentIdx}
          shuffLtrs={currentShuffLtrs} ltrs={letters}/>, $('#app')[0]);
      }
    }

    console.log(letters);
    console.log(shuffledLtrs);
  });
});
