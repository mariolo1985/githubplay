import React, { useState, useEffect } from 'react'
import RepoCards from '../RepoCards'
import { css } from '@emotion/react'
import CommitModal from '../CommitModal'

const appStyles = css`
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  
  font-size: 16px;

  .app-title {
    text-align: center;
    font-size: 24px;
    text-decoration: underline;
  }

  .app-subtitle {
    text-align: center;
  }

  .app-button-section {
    text-align: center;

    button {
      color: #ffffff;
      font-weight: 600;
      margin: 1rem;
      width: 150px;
      padding: 1rem 2rem;
      border: none;
      background: rgba(0,0,0,0.5);
      border-radius: 2rem;

      &:hover {
        cursor: pointer;
        background: rgba(0,0,0,0.7);
      }
    }
  }
`

const getTopStarredRepos = ({
  page = 1,
  onSuccess = () => { },
  onFailure = () => { }
}) => {
  fetch(`https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&per_page=8&page=${page}`, {
    method: 'GET',
    headers: {
      accept: 'application/vnd.github.v3+json',
      "Authorization": 'token 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'
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

  const [showCommitModal, setShowCommitModal] = useState(false)
  const [commitModalData, setCommitModalData] = useState({})

  const handleSetModalData = (data) => {
    setCommitModalData(data)
    setShowCommitModal(true)
  }

  const handleHideModal = () => {
    setShowCommitModal(false)
  }

  const clearDisplayRepos = () => {
    setDisplayedRepos([])
  }

  const prevPage = () => {
    if (displayPage === 1) {
      return
    }

    clearDisplayRepos()
    setDisplayPage(page => page - 1)
  }

  const nextPage = () => {
    clearDisplayRepos()
    setDisplayPage(page => page + 1)
  }

  useEffect(() => {
    getTopStarredRepos({
      page: displayPage,
      onSuccess: setDisplayedRepos
    })
  }, [displayPage])

  if (displayedRepos.length === 0) {
    return (
      <div>Loading repos...</div>
    )
  }

  return (
    <div css={appStyles}>
      <div className='app-title'>Top starred repos on Github</div>
      <div className='app-subtitle'>Page: {displayPage}</div>
      <div className='app-button-section'>
        <button onClick={prevPage}>Previous</button>
        <button onClick={nextPage}>Next</button>
      </div>
      <RepoCards handleSetModalData={handleSetModalData} repos={displayedRepos} />
      {
        showCommitModal && (
          <CommitModal
            handleHideModal={handleHideModal}
            repoName={commitModalData?.repoName}
            owner={commitModalData?.owner}
          />
        )
      }
    </div>
  )
}

export default App
