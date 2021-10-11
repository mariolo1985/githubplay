import React from 'react'
import { array } from 'prop-types'
import RepoCard from './RepoCard'

const RepoCards = ({
  repos
}) => {
  return (
    <>
      {
        repos.map(repo => {
          console.info({ repo })
          const {
            name,
            owner: {
              login
            }
          } = repo
          return (
            <RepoCard
              key={name}
              repoName={name}
              owner={login}
            />
          )
        })
      }
    </>
  )
}

RepoCards.propTypes = {
  repos: array
}

export default RepoCards