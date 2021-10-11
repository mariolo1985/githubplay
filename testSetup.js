const { TextEncoder, TextDecoder } = require('util')
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder

const jsdom = require('jsdom')

const documentHTML = '<!doctype html><html><body><div id="app"></div></body></html>'
const dom = new jsdom.JSDOM(documentHTML, { pretendToBeVisual: true })

global.document = dom.window.document
global.window = dom.window
