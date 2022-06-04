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
class Gruppe {
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
    this.id = Gruppe.counter++
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
  findItem(toSearch, inform) {
    for (let item of this.itemList) {
      if (item.name === toSearch) {
        return item
      }
    }
    if (inform) {
      Modell.printAndSave("[" + this.name + "] Item " + toSearch + " nicht gefunden", true)
    }
    return null
  }

  /**
   * Fügt einen Item zur ArtikelListe hinzu und gibt diesen als Wert zurück
   * @param {String} name - Name des neuen Artikels
   * @returns {Item} neuerArtikel - der neu erzeugte Item
   */
  addItem(name) {
    let vorhandenerArtikel = this.findItem(name, false)
    if (!vorhandenerArtikel) {
      let neuerArtikel = new Item(name, this.itemList.length)
      this.itemList.push(neuerArtikel)
      Modell.printAndSave("[" + this.name + "] Item " + name + " hinzugefügt")
      return neuerArtikel
    } else {
      Modell.printAndSave("[" + this.name + "] Item " + name + " existiert schon!", true)
    }
  }

  /**
   * Erzeugt einen neuen Item aus einem eingelesenen JSON-Objekt.
   * Wird von {@link Modell.initialize()} verwendet.
   * @param {object} artikel - das übergebene JSON-Objekt
   */
  artikelObjektHinzufuegen(artikel) {
    let neuerArtikel = this.addItem(artikel.name)
    // kopiert alle Properties aus "artikel" nach "neuerArtikel"
    Object.assign(neuerArtikel, artikel)
  }

  /**
   * Entfernt einen Item aus der ArtikelListe
   * @param {String} name - Index des zu entfernenden Artikels
   */
  artikelEntfernen(name) {
    let loeschArtikel = this.findItem(name)
    if (loeschArtikel) {
      const index = this.itemList.indexOf(loeschArtikel)
      this.itemList.splice(index, 1)
      this.artikelNeuNummerieren()
      Modell.printAndSave("[" + this.name + "] Item \"" + name + "\" entfernt"
      )
    } else {
      Modell.printAndSave("[" + this.name + "] Item \"" + name + "\" konnte NICHT entfernt werden", true
      )
    }
  }

  /**
   * Nummeriert alle Item in der Item-Liste neu durch
   */
  artikelNeuNummerieren() {
    for (let i = 0; i < this.itemList.length; i++) {
      this.itemList[i].index = i
    }
  }

  /**
   * Looks for an item by its name and changes its name
   * @param {String} alterName - Name des zu findenden Artikels
   * @param {String} neuerName - neuer Name des Artikels
   */
  renameItem(alterName, neuerName) {
    let vorhandenerArtikel = this.findItem(alterName)
    if (vorhandenerArtikel) {
      vorhandenerArtikel.name = neuerName
    }
    Modell.printAndSave("[" + this.name + "] Item \"" + alterName + "\" umbenannt in \"" + neuerName + "\"")
  }
}

export default Gruppe
