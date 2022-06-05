import Item from "./Item"
import SetItem from "./SetItem"

/**
 * Class representing a set of items
 * @property {SetItem[]} itemList - Array of items contained in this Set
 */
class Set {

  itemList

  /**
   * Constructor
   * @param {SetItem[]} itemList - The list to be stored. If none is given, [] is set as default
   */
  constructor (itemList = []) {
    this.itemList = itemList
  }

  /**
   * Adds an SetItem at the end of the list
   * @param {SetItem} entry - the item to be added to the list
   */
  add (entry) {
    this.itemList.push(entry)
  }

  /**
   * Looks for an item in the list.
   * Compares only Item.name at the moment
   * @param {SetItem} toSearch - the item wanted
   * @returns {SetItem | null} - returns either the wanted SetItem or null if nothing found
   */
  find (toSearch) {
    if (this.itemList.length > 0) {
      for (const element of this.itemList) {
        if (toSearch.equals(element)) {
          return element
        } else {
          return null
        }
      }
    } else {
      return null
    }
  }

  /**
   * Looks for an item in the list.
   * Compares only Item.name at the moment
   * @param {SetItem} toSearch - the item wanted
   * @returns {Number} - returns either the index of the wanted SetItem or -1 if nothing found
   */
  indexOf (toSearch) {
    if (this.itemList.length > 0) {
      for (const element of this.itemList) {
        if (toSearch.equals(element)) {
          return this.itemList.indexOf(element)
        } else {
          return -1
        }
      }
    } else {
      return -1
    }
  }

  /**
   * Removes the given entry from this.itemList
   * @param {SetItem} entry - the item to be removed
   */
  remove (entry) {
    let index = this.indexOf(entry)
    if (index !== -1) {
      this.itemList.splice(index, 1)
    }
  }

}

export default Set
