import React, { useState, useEffect } from 'react'
import RepoCards from '../RepoCards'
import { css } from '@emotion/react'

const appStyles = css`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  
  font-size: 16px;
`

const getTopStarredRepos = ({
  page = 1,
  onSuccess = () => { },
  onFailure = () => { }
}) => {
  fetch(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=10&page=${page}`, {
    method: 'GET',
    headers: {
      accept: 'appliation/vnd.github.v3+json',
    }
  })
    .then(response => {
      return response.json()
    })
    .then(repos => {
      onSuccess(repos?.items ?? [])
    })
    .catch(err => onFailure(err))
}

const App = () => {
  const [displayedRepos, setDisplayedRepos] = useState([])
  const [displayPage, setDisplayPage] = useState(1)

  const prevPage = () => {
    if (displayPage === 1) {
      return
    }

    setDisplayPage(page => page--)
  }

  const nextPage = () => {
    if (displayPage === 10) {
      return
    }

    setDisplayPage(page => page++)
  }

  useEffect(() => {
    getTopStarredRepos({
      page: displayPage,
      onSuccess: setDisplayedRepos
    })
  }, [displayPage])

  return (
    <div css={appStyles}>
      <div>Top starred repos on Github</div>
      <RepoCards repos={displayedRepos} />
      <button onClick={prevPage}>Previous</button>
      <button onClick={nextPage}>Next</button>
    </div>
  )
}

export default App
