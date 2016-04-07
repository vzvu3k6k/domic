import assert from 'assert'
import htmlparser from 'htmlparser2'
import Element from '../src/element'
import Node from '../src/node'
import ParentNodeMixin from '../src/parent_node_mixin'

class ParentNode extends ParentNodeMixin(Node) {}

function parse (html) {
  return new ParentNode(htmlparser.parseDOM(html)[0])
}

describe('ParentNodeMixin', () => {
  describe('querySelector', () => {
    context('when there is a match', () => {
      it('should return an Element instance', () => {
        const result = parse('<p><img></p>').querySelector('img')
        assert(result instanceof Element)
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
      it('should return an array of Element instances', () => {
        const results = parse('<p/><p/>').querySelectorAll('p')
        assert(Array.isArray(results))
        for (const result of results) {
          assert(result instanceof Element)
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
