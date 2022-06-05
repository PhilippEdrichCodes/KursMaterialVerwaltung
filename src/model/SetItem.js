import Item from "./Item"

/**
 * Interface class providing a datatype to store items with their count in a Set
 * @property {Item} item - the item to store
 * @property {Number} count - target stock of the item for the set
 */
class SetItem {

  item
  count

  /**
   * constructor
   * @param {Item} item - reference item
   * @param {Number} count - count of the item
   */
  constructor (item, count) {
    this.item = item
    this._count = count
  }

  /**
   * equals - compares to SetItems by checking the referenced Items. Uses {@link Item.equals}
   * @param {SetItem} toCompare - the SetItem to compare
   * @returns {Boolean} - returns true if the referenced items are equal, false otherwise
   */
  equals (toCompare) {
    return this.item.equals(toCompare)
  }

  /**
   * Setter for `item`
   * @param {Item} item - the item to reference
   */
  setItem (item) {
    this.item = item
  }

  /**
   * Getter for `item`
   * @returns {Item} item - returns the Item referenced by `this.item`
   */
  getItem () {
    return this.item
  }

  /**
   * Setter for `count`
   *
   * @param {Number} count - the quantity wanted. Is only set, if `count` is a safe integer. Else this method does nothing
   */
  setCount (count) {
    if (Number.isSafeInteger(number)) {
      this.count = count
    }
  }

  /**
   * Getter for `count`
   * @returns {Number} - returns the value of `this.count`
   */
  getCount () {
    return this.count
  }

  /**
   * Changes `this.count` by the given value if {@link number} is a safe integer, else does nothing
   * @param {Number} number
   */
  changeCountBy (number) {
    if (Number.isSafeInteger(number)) {
      this.count += number
    }
  }

  /**
   * Increases the `count` member variable by the given amount
   * Uses {@link changeCountBy()}, so if {@link number} is **not** a safe integer, this method does nothing
   * @param {Number} number - the amount `count` shall be increased
   */
  increaseCountBy (number) {
    this.changeCountBy(number)
  }

  /**
   * Increases the `count` member variable by 1
   */
  increaseCount () {
    this.increaseCountBy(1)
  }

  /**
   * Decreases the `count` member variable by the given amount
   * Uses {@link changeCountBy()}, so if {@link number} is **not** a safe integer, this method does nothing
   * @param {Number} number - the amount `count` shall be decreased
   */
  decreaseCountBy (number) {
    let change = 0 - number
    this.increaseCountBy(change)
  }

  /**
   * Decreases the `count` member variable by 1
   */
  decreaseCount () {
    this.decreaseCountBy(1)
  }

}

export default SetItem
