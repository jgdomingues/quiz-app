import React from 'react'

class App extends React.Component {
  render() {
    return (
      <div className="[ panel ] [ radius ] [ bg-light color-primary ]">
        <div className="wrapper">
          <div className="panel__head">
            <div className="wrapper">
              <div className="[ badge ] [ bg-senary ]">
                <h3 className="text-400">Question 1 of 5</h3>
              </div>
              <h1 className="headline measure-compact">
                If you could choose any age, to stay in for the rest of your
                life, which would it be ?
              </h1>
            </div>
          </div>
          <main id="main-content">
            <div className="[ wrapper ] [ gap-top-major ]">
              <div className="ans">
                <ul className="ans__list">
                  <li className="ans__item">
                    <a href="#">
                      <span>A.</span>
                      <span>5</span>
                    </a>
                  </li>
                  <li className="ans__item">
                    <a href="#">
                      <span>B.</span>
                      <span>15</span>
                    </a>
                  </li>
                  <li className="ans__item">
                    <a href="#">
                      <span>C.</span>
                      <span>35</span>
                    </a>
                  </li>
                  <li className="ans__item">
                    <a href="#">
                      <span>D.</span>
                      <span>55</span>
                    </a>
                  </li>
                  <li className="ans__item">
                    <a href="#">
                      <span>E.</span>
                      <span>85</span>
                    </a>
                  </li>
                </ul>
              </div>
              <div className="[ actions ] [ gap-top-800 ]">
                <button type="button">Previous Question</button>
                <button type="button">Next Question</button>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }
}

export default App
