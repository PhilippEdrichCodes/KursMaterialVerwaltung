import Item from "./Item"

/**
 * Interface class providing a datatype to store items with their count in a Set
 * @property {Item} item - the item to store
 * @property {Number} count - how many of these items are needed
 */
class SetItem {
  item
  count

  /**
   * constructor
   * @param {Item} item
   * @param {Number} count
   */
  constructor (item, count) {
    this.item = item
    this.count = count
  }

}

export default SetItem
