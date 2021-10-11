import React from 'react'
import { act, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CommitModal from './CommitModal'

const mockHandleHideModal = jest.fn()

global.fetch = jest.fn()
  .mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve([
        {
          sha: 'sha',
          commit: {
            author: {
              name: 'test name'
            },
            message: 'commit message',
            committer: {
              date: '10/11/2021'
            }
          }
        }
      ])
    }))

describe('CommitModal', () => {
  it('renders', async () => {
    const modalProps = {
      handleHideModal: mockHandleHideModal,
      repoName: 'test repo',
      owner: 'test owner'
    }

    const { getByTestId } = await waitFor(() => render(<CommitModal {...modalProps} />))

    const modal = getByTestId('commit-modal')
    const author = getByTestId('author-value')
    const commitMessage = getByTestId('message-value')
    const commitDate = getByTestId('date-value')

    expect(modal).toBeVisible()
    expect(author).toHaveTextContent('test name')
    expect(commitMessage).toHaveTextContent('commit message')
    expect(commitDate).toHaveTextContent('Mon Oct 11 2021')
  })

  it('fetches commit correctly', async () => {
    const modalProps = {
      handleHideModal: mockHandleHideModal,
      repoName: 'test repo',
      owner: 'test owner'
    }

    const { getByTestId } = await waitFor(() => render(<CommitModal {...modalProps} />))

    const closeButton = getByTestId('close-button')

    await act(async () => {
      await userEvent.click(closeButton)
    })

    expect(mockHandleHideModal).toHaveBeenCalledTimes(1)
  })
})