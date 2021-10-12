# Github REST API exercise

An exercise with Github rest api.

- Uses an authenticated Github api endpoint
  - *note*: Add token to *Authorization* header in `src/components/CommitModal/CommitModal.js` and `src/components/App/App.js`
  - *note*: Github revoked the OAuth access token used to make the API calls due to it being committed in a repo (security no-no)
  - *Additional notes in the section* **Things I would do differently**
- Return top 100 starred Github repos sorted with pagination
- Show commit details upon selecting a repo
- Partial responsiveness

## Pre-req

Node v12+
*note:* Run `nvm use` if nvm is installed

## Installation

`yarn` or `npm`

## Starting the app

`yarn start` or `npm start`

## Running tests

`yarn test` or `npm test`

## Things I would do differently/add with more time

- API auth call
  - Set token to an environment variable such as a window object with a builder to avoid committing token to repo
- A minified bundle
- Add data validations
  - Such as checking the repo name and owner is passed in as an objected to the commit modal before rendering
- Working linter and formatter
- Better mobile support
- Error handling such as logging
- Styled commit modal
- Format commit date
- Disable pagination buttons when there are no additional pages
