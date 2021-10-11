import React from 'react'
import { array, func } from 'prop-types'
import { css } from '@emotion/react'
import RepoCard from './RepoCard'

const repoCardsStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media (max-width: 904px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media(max-width: 675px){
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 450px){
    grid-template-columns: 1fr;
  }
`

const RepoCards = ({
  handleSetModalData,
  repos
}) => {
  return (
    <div css={repoCardsStyles}>
      {
        repos.map(repo => {
          const {
            description,
            forks_count,
            html_url,
            name,
            stargazers_count,
            owner: {
              login
            },
            watchers_count
          } = repo

          return (
            <RepoCard
              description={description}
              forksCount={forks_count}
              key={name}
              repoName={name}
              setCommitModalData={handleSetModalData}
              starsCount={stargazers_count}
              owner={login}
              url={html_url}
              watchersCount={watchers_count}
            />
          )
        })
      }
    </div>
  )
}

RepoCards.defaultProps = {
  handleSetModalData: () => { },
  repos: []
}

RepoCards.propTypes = {
  handleSetModalData: func,
  repos: array.isRequired
}

export default RepoCards