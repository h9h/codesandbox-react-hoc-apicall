import React from 'react'
import ReactDOM from 'react-dom'
import hocApiCall from './hocApiCall'

import './styles.css'

const GithubApi = hocApiCall('https://api.github.com/users/h9h')(
  ({ hocFetchResult: result }) => (
    <div className="container">
      <h3>error: {JSON.stringify(result.error)}</h3>
      <h3>loading: {JSON.stringify(result.loading)}</h3>
      <h3>data:</h3>
      <div>
        {result.data
          ? Object.entries(result.data).map(([key, value]) => (
              <div key={key}>
                {key}:&nbsp;{value}
                <br />
              </div>
            ))
          : null}
      </div>
    </div>
  )
)

const App = () => (
  <div className="App">
    <h1>Github-Apicall using Higher Order Component</h1>
    <GithubApi />
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)
