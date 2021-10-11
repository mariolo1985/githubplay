import React from 'react'
import { string } from 'prop-types'
import { css } from '@emotion/react'

const repoCardStyles = css`
  padding: 2rem;
`

const RepoCard = ({
  repoName,
  owner
}) => {
  const onCardClick = () => {
    fetch(`https://api.github.com/repos/${owner}/${repoName}/commits`, {
      method: 'GET',
      headers: {
        accept: 'appliation/vnd.github.v3+json',
      }
    })
      .then(response => {
        return response.json()
      })
      .then(commits => {
        console.info({ commits })
      })
      .catch(err => console.error(err))
  }
  return (
    <div css={repoCardStyles} onClick={onCardClick}>
      <div>{`Name: ${repoName}`}</div>
      <div>{`Owner: ${owner}`}</div>
    </div>
  )
}

RepoCard.propTypes = {
  repoName: string,
  owner: string
}

export default RepoCard