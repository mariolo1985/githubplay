import React, { useState, useEffect } from 'react'
import { func, string } from 'prop-types'
import { css } from '@emotion/react'

const modalStyles = css`
  display: grid;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw; 

  .modal {
    &-bg {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100vw;
      background: rgba(0, 0, 0, 0.7);
      z-index: 1;
    }

    &-title {
      font-size: 24px;
      text-align: center;
    }
    &-container {
      position: relative;
      background: #ffffff;
      height: 50vh;
      width: 75vw;
      margin: auto;
      padding: 1rem;
      border-radius: 2rem;
      z-index: 2;
    }
    &-close {
      position: absolute;
      right: -16px;
      top: -16px;
      width: 48px;
      
      &:hover {
        cursor: pointer;
      }
    }
  }

  .commits {
    max-height: 43vh;
    overflow-y: auto;
  }
  .commit {
    margin: 2rem 0;  
    background: rgba(0,0,0,0.1);

    &-section {
      margin-bottom: .5rem;
    }

    &-label {
      font-weight: 600;
    }
  }
`

const CommitModal = ({
  handleHideModal,
  repoName,
  owner
}) => {
  const [commitData, setCommitData] = useState([])

  useEffect(() => {
    fetch(`https://api.github.com/repos/${owner}/${repoName}/commits`, {
      method: 'GET',
      headers: {
        accept: 'application/vnd.github.v3+json',
      }
    })
      .then(response => {
        return response.json()
      })
      .then(commits => {
        setCommitData(commits)
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <div css={modalStyles} data-testid='commit-modal'>
      <div className='modal-container'>
        <div className='modal-close' data-testid='close-button' onClick={handleHideModal}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" data-testid="CancelOutlinedIcon" aria-label="fontSize large"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"></path></svg>
        </div>
        <div className='modal-title'>{repoName} commits</div>
        <div className='commits'>
          {
            commitData.map(commitItem => {              
              const commitId = commitItem?.sha
              const authorName = commitItem?.commit?.author?.name
              const commitMsg = commitItem?.commit?.message
              const commitDate = commitItem?.commit?.committer?.date
              
              return (
                <div className='commit' key={commitId}>
                  <div className='commit-section'>
                    <div className='commit-label'>Author:</div>
                    <div className='commit-value' data-testid='author-value'>{authorName}</div>
                  </div>
                  <div className='commit-section'>
                    <div className='commit-label'>Commit Message:</div>
                    <div className='commit-value' data-testid='message-value'>{commitMsg}</div>
                  </div>
                  <div className='commit-section'>
                    <div className='commit-label'>Commit date:</div>
                    <div className='commit-value' data-testid='date-value'>{commitDate && new Date(`${commitDate}`).toDateString()}</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <div className='modal-bg'></div>
    </div>
  )
}

CommitModal.defaultProps = {
  handleHideModal: () => { }
}

CommitModal.propTypes = {
  handleHideModal: func,
  repoName: string,
  owner: string
}

export default CommitModal
