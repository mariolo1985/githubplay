import React from 'react'
import { func, string, number } from 'prop-types'
import { css } from '@emotion/react'

const repoCardStyles = css`
  border: 1px dashed #555555;
  border-radius: 1rem;
  padding: 1rem;
  margin: 1rem;

  &:hover {
    background: #e2e2e2;
    cursor: pointer;
  }

  .repo-card {    
    &-section {      
      margin: 1rem 0;
    }

    &-title {
      font-size: 20px;
      text-decoration: underline;
    }

    &-label {
      font-size: 18px;
      font-weight: 600;
    }
  }

  .metrics {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

    &-label {
      font-weight: 600;
    }
  }
`

const RepoCard = ({
  description,
  forksCount,
  repoName,
  setCommitModalData,
  starsCount,
  owner,
  url,
  watchersCount
}) => {
  const onCardClick = () => {
    setCommitModalData({
      repoName,
      owner
    })
  }

  return (
    <div className='repo-card' css={repoCardStyles} data-testid='card' onClick={onCardClick}>
      <div className='repo-card-section'>
        <div className='repo-card-title' data-testid='card-title'>{repoName}</div>
      </div>
      <div className='repo-card-section'>
        <div className='repo-card-label'>Owner:</div>
        <div className='repo-card-text' data-testid='owner-value'>{owner}</div>
      </div>
      <div className='repo-card-section'>
        <div className='repo-card-label'>Description:</div>
        <div className='repo-card-text' data-testid='description-value'>{description}</div>
      </div>
      <div className='repo-card-section metrics'>
        <div className='metrics-section'>
          <div className='metrics-label'>Stars:</div>
          <div className='metrics-value' data-testid='star-value'>{starsCount}</div>
        </div>
        <div className='metrics-section'>
          <div className='metrics-label'>Forks:</div>
          <div className='metrics-value' data-testid='fork-value'>{forksCount}</div>
        </div>
        <div className='metrics-section'>
          <div className='metrics-label'>Watchers:</div>
          <div className='metrics-value' data-testid='watcher-value'>{watchersCount}</div>
        </div>
      </div>
      <a href={url} target='_blank' rel='noreferrer' rel='noopener'>Repo link</a>
    </div>
  )
}

RepoCard.propTypes = {
  description: string,
  forksCount: number,
  repoName: string,
  setCommitModalData: func,
  starsCount: number,
  owner: string,
  url: string,
  watchersCount: number
}

export default RepoCard