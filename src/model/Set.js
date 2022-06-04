import SetItem from "./SetItem"

/**
 * Class representing a set of items
 * @property {SetItem[]} itemList
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

}

export default Set
