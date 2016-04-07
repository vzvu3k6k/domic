import Node from './node'
import ParentNodeMixin from './parent_node_mixin'

export default class Element extends ParentNodeMixin(Node) {
  getAttribute (name) {
    if (!this.node.attribs || !(name in this.node.attribs)) {
      return null
    }
    return this.node.attribs[name]
  }
}
