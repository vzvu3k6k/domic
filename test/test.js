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
})
