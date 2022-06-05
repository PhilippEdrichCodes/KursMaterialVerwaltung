import Item from "./Item"
import Set from "./Set.js"
import Modell from "./Stuff.js"

/**
 * Class representing groups of Sets and their items
 *
 * @property {Number}    counter      - provides unique IDs for the groups
 * @property {Number}    id           - unique ID
 * @property {Number}    index        - position of this group in the list
 * @property {String}    name         - name of this group
 * @property {Set[]}   itemList       - list of the content
 */
class Group {
  static counter = 1
  id
  index
  name
  itemList

  /**
   * Constructor
   *
   * @param {String} name - the name the new class should have
   * @param {Number} index - the index the new group shall have
   * @param {Set[]} itemList - the content this group shall have. If none is given, [] is set as default
   */
  constructor(name, index, itemList =[]) {
    this.id = Group.counter++
    this.name = name
    this.index = index
    this.itemList = []
  }

  /**
   * searches for an item by its name
   * @param {String} toSearch - name of the item to Search
   * @param {Boolean} inform - triggers if a message is given
   * @returns {Item|null} artikel - der gefundene Item bzw. `null`, wenn nichts gefunden wurde
   */
  findItem(toSearch, inform = false) {
    for (let item of this.itemList) {
      if (item.getItem().getName() === toSearch) {
        return item
      }
    }
    if (inform) {
      Modell.printAndSave("[" + this.name + "] Item " + toSearch + " nicht gefunden", true)
    }
    return null
  }

  /**
   * Add an Item to itemList and returns it
   * @param {String} name - name of the new Item
   * @returns {Item} newItem - the newly created Item
   */
  addItem(name) {
    let existingItem = this.findItem(name, false)
    if (!existingItem) {
      let newItem = new Item(name, this.itemList.length)
      this.itemList.push(newItem)
      Modell.printAndSave("[" + this.name + "] Item " + name + " hinzugefügt")
      return newItem
    } else {
      Modell.printAndSave("[" + this.name + "] Item " + name + " existiert schon!", true)
    }
  }

  /**
   * Creates a new Item of a read JSON-Object.
   * Used by {@link Stuff.initialize()}.
   * @param {object} item - given JSON-Object
   */
  addItemByObject(item) {
    let newItem = this.addItem(item.name)
    // copies all properties from "item" to "newItem"
    Object.assign(newItem, item)
  }

  /**
   * Removes an Item from `this.itemList`
   * @param {String} name - name of Item to remove
   */
  removeItem(name) {
    let toRemove = this.findItem(name)
    if (toRemove) {
      const index = this.itemList.indexOf(toRemove)
      this.itemList.splice(index, 1)
      this.renewIndex()
      Modell.printAndSave("[" + this.name + "] Item \"" + name + "\" entfernt"
      )
    } else {
      Modell.printAndSave("[" + this.name + "] Item \"" + name + "\" konnte NICHT entfernt werden", true
      )
    }
  }

  /**
   * ReIndexes `this.itemList`
   */
  renewIndex() {
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].index = i
    }
  }

  /**
   * Looks for an item by its name and changes its name
   * @param {String} oldName - name of item to rename
   * @param {String} newName - new name of the item
   */
  renameItem(oldName, newName) {
    let itemInList = this.findItem(oldName)
    if (itemInList) {
      itemInList.name = newName
    }
    Modell.printAndSave("[" + this.name + "] Item \"" + oldName + "\" umbenannt in \"" + newName + "\"")
  }
}

export default Group
