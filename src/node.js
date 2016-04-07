function collectText (node) {
  if (node.type === 'text') {
    return node.data
  }
  if (node.children) {
    return node.children.reduce((text, node) => {
      return text + collectText(node)
    }, '')
  }
  return ''
}

export default class Node {
  constructor (node) {
    this.node = node
    this.cssSelectOption = {}
  }

  get textContent () {
    return collectText(this.node)
  }
}
