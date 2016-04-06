import cssSelect from 'css-select'

function collectText (nodeArray) {
  return nodeArray.reduce((text, node) => {
    if (node.type === 'text') {
      return text + node.data
    }
    if (node.children) {
      return text + collectText(node.children)
    }
    return text
  }, '')
}

export default class DomicNode {
  constructor (tree) {
    this.tree = tree
    this.cssSelectOption = { strict: true }
  }

  get textContent () {
    return collectText(this.tree)
  }

  querySelector (selector) {
    const node = cssSelect.selectOne(
      selector,
      this.tree,
      this.cssSelectOption
    )
    if (node) {
      return new DomicNode(node)
    }
    return null
  }

  querySelectorAll (selector) {
    const node = cssSelect(selector, this.tree, this.cssSelectOption)
    if (node.length === 0) {
      return []
    }
    return node.map((c) => new DomicNode(c))
  }
}
