import React from 'react'

import quizData from './data/data.json'

function Result({ initialState }) {
  return (
    <div>
      <button
        className="button"
        data-variant="true"
        type="button"
        onClick={initialState}
      >
        Try again
      </button>
    </div>
  )
}

function Quiz({ stage, nextStage, prevStage, quiz, selected, selectAns }) {
  return (
    <div className="[ panel ] [ radius ] [ bg-light color-primary ]">
      <div className="wrapper">
        <div className="panel__head">
          <div className="wrapper">
            <div className="[ badge ] [ bg-senary ]">
              <h3 className="text-400">{`Question ${stage + 1} of ${
                quiz.length
              }`}</h3>
            </div>
            <h1 className="text-700 weight-normal measure-short">
              {quiz[stage].question}
            </h1>
          </div>
        </div>
        <main id="main-content">
          <div className="[ wrapper ] [ gap-top-700 ]">
            <div className="ans">
              <ul className="ans__list">
                {Object.entries(quiz[stage].answer).map((a) => (
                  <li
                    key={a[0]}
                    className={`[ ans__item ] [ color-primary ${
                      quiz[stage].selected === a[1] ? 'selected' : ''
                    } ]`}
                    onClick={() => selectAns(a[0], quiz[stage])}
                  >
                    {/* <span className="ans__letter">{a[0]}</span> */}
                    <span className="ans__value">{a[1]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="[ actions ] [ gap-top-900 ]">
              <button
                className="button"
                type="button"
                disabled={stage === 0 ? true : false}
                onClick={prevStage}
              >
                Previous Question
              </button>
              <button className="button" type="button" onClick={nextStage}>
                {stage + 1 === quiz.length ? 'See Results' : 'Next Question'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      stage: 0,
      quiz: [],
    }

    this.goNextStage = this.goNextStage.bind(this)
    this.goPrevStage = this.goPrevStage.bind(this)
    this.goInitialState = this.goInitialState.bind(this)
    this.selectAns = this.selectAns.bind(this)
  }

  goNextStage() {
    this.setState({ stage: this.state.stage + 1 })
  }

  goPrevStage() {
    if (this.state.stage === 0) {
      return
    }

    this.setState({ stage: this.state.stage - 1 })
  }

  goInitialState() {
    this.setState({ stage: 0 })
  }

  selectAns(letter, ans) {
    console.log('log', letter, ans.id)
    const newArr = this.state.quiz.slice(ans.id)
    console.log(newArr)
    // this.setState({
    //   quiz: [],
    // })
  }

  componentDidMount() {
    this.setState({
      quiz: quizData,
    })
  }

  componentDidUpdate() {
    console.log(this.state.quiz)
  }

  render() {
    const { quiz, stage } = this.state

    return (
      <React.Fragment>
        {stage !== quiz.length ? (
          <Quiz
            stage={stage}
            nextStage={this.goNextStage}
            prevStage={this.goPrevStage}
            quiz={quiz}
            selectAns={this.selectAns}
          />
        ) : (
          <Result initialState={this.goInitialState} />
        )}
      </React.Fragment>
    )
  }
}

export default App
