class Timer extends React.Component{
  render(){
    return(
      <div>
        <h2>
          Hurry! You have <b>{this.props.seconds}</b> seconds left!
        </h2>

        <h2>
          Your score is {this.props.score}
        </h2>

      </div>

    )
  }
}
