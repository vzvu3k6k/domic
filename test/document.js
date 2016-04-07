import assert from 'assert'
import htmlparser from 'htmlparser2'
import Document from '../src/document'

function parse (html) {
  return new Document(htmlparser.parseDOM(html))
}

describe('Document', () => {
  it('should have textContent', () => {
    const document = parse('<p>a</p><p>b</p>')
    assert.strictEqual(document.textContent, 'ab')
  })

  it('should have querySelector', () => {
    const document = parse('<p>a</p>')
    assert(document.querySelector('p'))
  })

  it('should not have getAttribute', () => {
    const document = parse('<p>a</p>')
    assert.strictEqual(document.getAttribute, undefined)
  })
})
