import assert from 'assert'
import htmlparser from 'htmlparser2'
import DomicNode from '../src/index'

function parse (html) {
  return new DomicNode(htmlparser.parseDOM(html))
}

describe('Domic', () => {
  describe('textContent', () => {
    it('should handle new lines', () => {
      const doc = parse(`<p>a
b
</p>`)
      assert.strictEqual(doc.textContent, `a
b
`)
    })

    it('should handle nested nodes', () => {
      const doc = parse('<p class="foo"> a <span>b<span> c </span>d </span>e </p>')
      assert.strictEqual(doc.textContent, ' a b c d e ')
    })

    it('should ignore comments', () => {
      const doc = parse('<p>a <!-- b -->c </p>')
      assert.strictEqual(doc.textContent, 'a c ')
    })
  })

  describe('getAttribute', () => {
    context('when it has the attribute', () => {
      it("should return attribute's value", () => {
        const doc = parse('<p class="foo">')
        const p = doc.querySelector('p')
        assert.strictEqual(p.getAttribute('class'), 'foo')
      })
    })

    context("when it doesn't have the attribute", () => {
      it('should return null', () => {
        const doc = parse('<p class="foo">')
        const p = doc.querySelector('p')
        assert.strictEqual(p.getAttribute('id'), null)
      })
    })
  })

  describe('querySelector', () => {
    context('when there is a match', () => {
      it('should return a DomicNode instance', () => {
        assert(parse('<p/>').querySelector('p') instanceof DomicNode)
      })
    })

    context('when there is not a match', () => {
      it('should return null', () => {
        assert.strictEqual(parse('<p/>').querySelector('span'), null)
      })
    })
  })

  describe('querySelectorAll', () => {
    context('when there is a match', () => {
      it('should return an array of DomicNode instance', () => {
        const results = parse('<p/><p/>').querySelectorAll('p')
        assert(Array.isArray(results))
        for (const result of results) {
          assert(result instanceof DomicNode)
        }
      })
    })

    context('when there is not a match', () => {
      it('should return an empty array', () => {
        const results = parse('<p/><p/>').querySelectorAll('span')
        assert(Array.isArray(results))
        assert.equal(results.length, 0)
      })
    })
  })
})
