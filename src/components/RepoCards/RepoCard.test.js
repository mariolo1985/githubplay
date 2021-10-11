import React from 'react'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RepoCard from './RepoCard'

const mockSetCommitModalData = jest.fn()

describe('RepoCard', () => {
  it('renders', () => {
    const cardProps = {
      description: 'card description',
      forksCount: 1,
      repoName: 'test repo',
      setCommitModalData: mockSetCommitModalData,
      starsCount: 2,
      owner: 'mario lo',
      url: 'www.fakegithuburl.com',
      watchersCount: 3
    }
    const { getByTestId } = render(<RepoCard {...cardProps} />)
    const card = getByTestId('card')
    const title = getByTestId('card-title')
    const owner = getByTestId('owner-value')
    const description = getByTestId('description-value')
    const star = getByTestId('star-value')
    const fork = getByTestId('fork-value')
    const watcher = getByTestId('watcher-value')

    expect(card).toBeVisible()
    expect(title).toHaveTextContent(cardProps.repoName)
    expect(owner).toHaveTextContent(cardProps.owner)
    expect(description).toHaveTextContent(cardProps.description)
    expect(star).toHaveTextContent(cardProps.starsCount)
    expect(fork).toHaveTextContent(cardProps.forksCount)
    expect(watcher).toHaveTextContent(cardProps.watchersCount)

    expect(card).toHaveStyle('border: 1px dashed #555555')
  })

  it('handles card clicks correctly', async () => {
    const cardProps = {
      description: 'card description',
      forksCount: 1,
      repoName: 'test repo',
      setCommitModalData: mockSetCommitModalData,
      starsCount: 2,
      owner: 'mario lo',
      url: 'www.fakegithuburl.com',
      watchersCount: 3
    }
    const { getByTestId } = render(<RepoCard {...cardProps} />)
    const card = getByTestId('card')

    await act(async () => {
      await userEvent.click(card)
    })

    expect(mockSetCommitModalData).toHaveBeenCalledTimes(1)
  })
})