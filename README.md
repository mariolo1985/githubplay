# Github REST API exercise

An exercise with Github rest api.

- Uses an authenticated Github api endpoint
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

- A minified bundle
- Static sizing for cards so it does not push the pagination buttons out of its original position
  - limit the description length and add ellipsis to the end to note additional text
- Add data validations
  - Such as checking the repo name and owner is passed in as an objected to the commit modal before rendering
- Working linter and formatter
- Better mobile support
- Error handling such as logging
- Styled commit modal
- Format commit date
- Disable pagination buttons when there are no additional pages
