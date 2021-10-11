import React from 'react'
import { act, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RepoCards from './RepoCards'

const mockHandleSetModalData = jest.fn()

describe('RepoCards', () => {
  it('renders', () => {
    const reposProps = {
      handleSetModalData: mockHandleSetModalData,
      repos: [{
        description: 'card description',
        forks_count: 1,
        html_url: 'www.fakegithuburl.com',
        name: 'test repo',
        stargazers_count: 2,
        owner: { login: 'mario lo' },
        watchers_count: 3
      }]
    }

    const { getByTestId } = render(<RepoCards {...reposProps} />)

    const cards = getByTestId('cards')
    const card = getByTestId('card')

    expect(cards).toBeVisible()
    expect(cards).toHaveStyle('display: grid')

    expect(card).toBeVisible()
  })

  it('handles card click correctly', async () => {
    const reposProps = {
      handleSetModalData: mockHandleSetModalData,
      repos: [{
        description: 'card description',
        forks_count: 1,
        html_url: 'www.fakegithuburl.com',
        name: 'test repo',
        stargazers_count: 2,
        owner: { login: 'mario lo' },
        watchers_count: 3
      }]
    }

    const { getByTestId } = render(<RepoCards {...reposProps} />)

    const card = getByTestId('card')
    await act(async () => {
      await userEvent.click(card)
    })

    expect(mockHandleSetModalData).toBeCalledTimes(1)
  })
})