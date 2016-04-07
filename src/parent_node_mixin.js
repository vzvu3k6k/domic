import cssSelect from 'css-select'
import Element from './element'

export default function ParentNodeMixin (base) {
  return class extends base {
    querySelector (selector) {
      const node = cssSelect.selectOne(
        selector,
        this.node,
        this.cssSelectOption
      )
      if (node) {
        return new Element(node)
      }
      return null
    }

    querySelectorAll (selector) {
      const node = cssSelect(selector, this.node, this.cssSelectOption)
      return node.map((c) => new Element(c))
    }
  }
}
