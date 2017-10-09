import assert from 'assert'
import htmlparser from 'htmlparser2'
import Element from '../src/element'

function parse (html) {
  return new Element(htmlparser.parseDOM(html)[0])
}

describe('Element', () => {
  describe('getAttribute', () => {
    context('when it has the attribute', () => {
      it("should return attribute's value", () => {
        const p = parse('<p class="foo">')
        assert.strictEqual(p.getAttribute('class'), 'foo')
      })
    })

    context('when it has the attribute whose value includes HTML entities', () => {
      it("should return decoded attribute's value", () => {
        const p = parse('<a href="/a?foo=bar&amp;baz=bar">link</a>')
        assert.strictEqual(p.getAttribute('href'), '/a?foo=bar&baz=bar')
      })
    })

    context("when it doesn't have the attribute", () => {
      it('should return null', () => {
        const p = parse('<p class="foo">')
        assert.strictEqual(p.getAttribute('id'), null)
      })
    })
  })
})
