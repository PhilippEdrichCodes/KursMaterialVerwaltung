/**
 * Class representing an item
 *
 * @property {Number}  counter - provides unique IDs
 * @property {Number}  id      - unique ID of this item
 * @property {Number}  index   - position of this item in the item list
 * @property {String}  name    - name of this item
 * @property {Boolean} prepared - remembers if this item is ready or needs to be prepared
 */
class Item {
  static counter = 1
  id
  index
  name
  prepared

  constructor(name, index) {
    this.id = Item.counter++
    this.name = name
    this.index = index
    this.prepared = false
  }
}

export default Item
