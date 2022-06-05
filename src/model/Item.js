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

  /**
   * Item constructor
   * @param {String} name - name the new item will have
   * @param {Number} index - the position in the list this item will have
   * @param {Boolean} prepared - state of the item. `false` by default
   */
  constructor (name, index, prepared = false) {
    this.id = Item.counter++
    this.name = name
    this.index = index
    this.prepared = prepared
  }

  /**
   * equals - checks if the items are equal by name
   * @param {Item} toCompare - the item to be compared
   * @returns {boolean} -returns true if the name attributes are equal, false otherwise
   */
  equals(toCompare) {
    return (this.name === toCompare.name)
  }


  /**
   * Setter for `name`
   * @param {String} name - the new name of this item
   */
  setName (name) {
    this.name = name
  }

  /**
   * Getter for `name`
   * @returns {String} `Item.name` - returns the name of the item
   */
  getName () {
    return this.name
  }

  /**
   * Getter for `id`
   * @returns {Number} `Item.id` - returns the unique id of the item
   */
  getID () {
    return this.id
  }

  /**
   * Getter for `index`
   * @returns {Number} `Item.index` - returns the index of the item
   */
  getIndex () {
    return this.index
  }

  /**
   * Getter for `prepared`
   * @returns {Boolean} `Item.prepared` - returns the value of prepared
   */
  isPrepared () {
    return this.prepared
  }

  /**
   * Setter for `prepared`
   * @param {Boolean} status - the value to set `prepared` to
   */
  setPrepared (status) {
    this.prepared = status
  }

  /**
   * Switch for `Item.prepared`
   *
   * toggles `this.prepared` between `true` and `false`
   */
  togglePrepared () {
    this.prepared = !this.prepared
  }
}

export default Item
