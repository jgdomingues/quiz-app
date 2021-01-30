import React from 'react'

import quizData from './data/data.json'
import Star from './assets/svg/star.svg'
import StarFill from './assets/svg/star-fill.svg'

function RenderStars({ percent, size }) {
  let n

  if (percent === 0) {
    n = 0
  } else if (percent < 50) {
    n = 1
  } else if (percent >= 50 && percent < 60) {
    n = 2
  } else if (percent >= 60 && percent <= 75) {
    n = 3
  } else if (percent > 75 && percent < 100) {
    n = 4
  } else {
    n = 5
  }

  return (
    <React.Fragment>
      {n !== 0 && [...Array(n)].map((s, index) => <StarFill key={index} />)}
      {size - n !== 0 &&
        [...Array(size - n)].map((s, index) => <Star key={index} />)}
    </React.Fragment>
  )
}

function Message({ percent }) {
  let message

  if (percent === 0) {
    message = 'Como e possivel voce nao saber nada?!?!?!.'
  } else if (percent <= 25) {
    message = 'Humm! Nada bom. Voce precisa estudar mais.'
  } else if (percent < 50) {
    message = 'Melhor que nada! Mas e bom vc ficar esperto.'
  } else if (percent >= 50 && percent < 60) {
    message =
      'Na Media! Mas e sempre bom lembrar que quem sempre ficar na media uma hora cai!.'
  } else if (percent >= 60 && percent <= 75) {
    message =
      'Um pouco acima de media! Pare de ser preguicoso e pense um pouco mais.'
  } else if (percent > 75 && percent < 100) {
    message =
      'Uau! Voce quase destruiu o quiz. Se voce tivesse focado um pouco mais era 100%'
  } else {
    message = 'Einstein, e voce?'
  }

  return <p className="text-500">{message}</p>
}

class Result extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hits: 0,
      percent: 0,
    }
  }

  componentDidMount() {
    const { quiz } = this.props

    const hits = quiz.filter((q) => q.selected === q.correctAns).length

    this.setState({
      hits,
      percent: (hits * 100) / quiz.length,
    })
  }

  render() {
    const { initialState, quiz } = this.props
    const { hits, percent } = this.state

    return (
      <div className="center">
        <div className="[ panel ] [ radius ] [ bg-light ]">
          <div className="wrapper">
            <div className="result">
              <div className="result__head">
                <h1 className="weight-bold color-primary">Resultado</h1>
                <div className="result__stars">
                  <RenderStars percent={percent} size={5} quiz={quiz} />
                </div>
              </div>
              <div className="result__message">
                <h3 className="text-600">{`Voce acertou ${hits} de ${quiz.length}`}</h3>
                <Message percent={percent} questions={quiz.length} />
              </div>
              <div className="result__action">
                <button
                  className="button"
                  data-variant="true"
                  type="button"
                  onClick={initialState}
                >
                  Refazer o Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function Quiz({ stage, nextStage, prevStage, quiz, selectAns }) {
  return (
    <div className="center">
      <div className="[ panel ] [ radius ] [ bg-light color-primary ]">
        <div className="wrapper">
          <div className="panel__head">
            <div className="wrapper">
              <div className="[ badge ] [ bg-senary ]">
                <h3 className="text-300 color-primary">{`Quiz ${stage + 1} de ${
                  quiz.length
                }`}</h3>
              </div>
              <h1 className="text-700 color-primary-shade weight-bold">
                {quiz[stage].question}
              </h1>
            </div>
          </div>
          <main id="main-content">
            <div className="[ wrapper ] [ gap-top-600 ]">
              <div className="ans">
                <ul className="ans__list">
                  {Object.entries(quiz[stage].answer).map((a) => (
                    <li
                      key={a[0]}
                      tabIndex={0}
                      className={`[ ans__item ] [ color-primary ${
                        quiz[stage].selected === a[0] ? 'selected' : ''
                      } ]`}
                      onClick={() => selectAns(a[0], quiz[stage])}
                      onKeyDown={(event) =>
                        event.key === 'Enter'
                          ? selectAns(a[0], quiz[stage], event)
                          : null
                      }
                    >
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
                  Quiz Anterior
                </button>
                <button
                  disabled={!quiz[stage].selected}
                  className="button"
                  type="button"
                  onClick={nextStage}
                >
                  {stage + 1 === quiz.length ? 'Ver Resultado' : 'Proximo Quiz'}
                </button>
              </div>
            </div>
          </main>
        </div>
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
    this.setState({ stage: 0, quiz: quizData })
  }

  selectAns(letter, ans, event) {
    const newQuiz = this.state.quiz.filter((i) => i.id !== ans.id)
    this.setState({
      quiz: [
        ...newQuiz,
        {
          ...ans,
          selected: letter,
        },
      ].sort((a, b) => a.id - b.id),
    })
  }

  componentDidMount() {
    this.setState({
      quiz: quizData,
    })
  }

  render() {
    const { quiz, stage } = this.state

    return (
      <React.Fragment>
        {stage + 1 <= quiz.length ? (
          <Quiz
            stage={stage}
            nextStage={this.goNextStage}
            prevStage={this.goPrevStage}
            quiz={quiz}
            selectAns={this.selectAns}
          />
        ) : (
          <Result quiz={quiz} initialState={this.goInitialState} />
        )}
      </React.Fragment>
    )
  }
}

export default App
