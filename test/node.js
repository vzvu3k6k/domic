import assert from 'assert'
import htmlparser from 'htmlparser2'
import Node from '../src/node'

function parse (html) {
  return new Node(htmlparser.parseDOM(html)[0])
}

describe('Node', () => {
  describe('textContent', () => {
    it('should handle new lines', () => {
      const node = parse(`<p>a
b
</p>`)
      assert.strictEqual(node.textContent, `a
b
`)
    })

    it('should handle nested nodes', () => {
      const node = parse('<p class="foo"> a <span>b<span> c </span>d </span>e </p>')
      assert.strictEqual(node.textContent, ' a b c d e ')
    })

    it('should ignore comments', () => {
      const node = parse('<p>a <!-- b -->c </p>')
      assert.strictEqual(node.textContent, 'a c ')
    })
  })
})
