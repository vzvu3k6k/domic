import Node from './node'
import ParentNodeMixin from './parent_node_mixin'

export default class Document extends ParentNodeMixin(Node) {
  constructor (children) {
    super({ children })
  }
}
