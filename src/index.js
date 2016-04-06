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
  }

  get textContent () {
    return collectText(this.tree)
  }
}
