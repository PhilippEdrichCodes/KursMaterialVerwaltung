import Group from './Group'

/**
 * Diese Klasse steuert das Modell der App
 *
 * @property {Group[]} gruppenListe      - enthält die Artikelgruppen
 * @property {Group}   aktiveGruppe      - enthält die aktuell ausgewählte Group
 * @property {boolean}  meldungenAusgeben - steuert, ob eine Meldung ausgegeben werden soll oder nicht
 */
class Stuff {
  groupList = []
  activeGroup = null
  printMessage = true
  SORT_ORDERS = {
    "own": this.sortiereIndex,
    "up": this.sortiereAufsteigend,
    "down": this.sortiereAbsteigend
  }
  sortOrder = Object.keys(this.SORT_ORDERS)[0]
  STORAGE_KEY = "kursMaterialDaten"

  /**
   * Looks for a `group` by its name and returns it if found
   * @param {String} toSearch - `name` to look for
   * @param {Boolean} inform - switch to turn on/off debug message
   * @returns {Group | null} gefundeneGruppe - die gefundene Group; `null`, wenn nichts gefunden wurde
   */
  findGroup(toSearch, inform=false) {
    for (let group of this.groupList) {
      if (group.name === toSearch) {
        return group
      }
    }
    // nichts gefunden, meldung ausgeben
    if (inform) {
      this.printAndSave("[App] Group \"" + name + "\" nicht gefunden", true)
    }
    return null
  }

  /**
   * Fügt eine Group in der Gruppenliste hinzu
   * @param {String} name - Name der neuen Group
   * @returns {Group} neueGruppe - die neu hinzugefügte Group
   */
  gruppeHinzufuegen(name) {
    let vorhandeneGruppe = this.findGroup(name)
    if (!vorhandeneGruppe) {
      let neueGruppe = new Group(name, this.groupList.length)
      this.groupList.push(neueGruppe)
      this.printAndSave("[App] Group \"" + name + "\" hinzugefügt")
      return neueGruppe
    } else {
      this.printAndSave("[App] Group \"" + name + "\" existiert schon!", true)
    }
  }

  /**
   * Entfernt die Group mit dem `name`
   * @param {String} name - Name der zu löschenden Group
   */
  gruppeEntfernen(name) {
    let loeschGruppe = this.findGroup(name)
    if (loeschGruppe) {
      let index = this.groupList.indexOf(loeschGruppe)
      this.groupList.splice(index, 1)
      this.printAndSave("[App] Group \"" + name + "\" entfernt"
      )
    } else {
      this.printAndSave("[App] Group \"" + name + "\" konnte NICHT entfernt werden!", true)
    }
  }

  /**
   * Benennt die Group `alterName` um
   * @param {String} alterName - Name der umzubenennenden Group
   * @param {String} neuerName - der neue Name der Group
   */
  gruppeUmbenennen(alterName, neuerName) {
    let suchGruppe = this.findGroup(alterName, true)
    if (suchGruppe) {
      suchGruppe.name = neuerName
      this.printAndSave("[App] Group \"" + alterName + "\" umbenannt in \"" + neuerName + "\"")
    }
  }

  /**
   * Gibt die Gruppen mit Artikeln auf der Konsole aus
   */
  allesAuflisten() {
    console.debug("Einkaufsliste")
    console.debug("--------------------")
    for (const gruppe of this.groupList) {
      console.debug("[" + gruppe.name + "]")
      gruppe.artikelAuflisten(false)
    }
  }

  /**
   * - prints a message in console
   * - stores actual state
   *
   * @param {String} message - message to print
   * @param {boolean} isWarning - toggles output type of {@link message} between warning or debug
   */
  printAndSave(message, isWarning = false) {
    if (this.printMessage) {
      if (isWarning) {
        console.log(message)
      } else {
        console.debug(message)
        this.speichern()
      }
    }
  }

  /**
   * Sortiert Gruppen und Item nach der übergebenen `reihenfolge`
   * @param {String} reihenfolge - entspricht einem der Keys aus {@link SORT_ORDERS}
   */
  sortieren(reihenfolge) {
    this.sortOrder = reihenfolge
    const sortierFunktion = this.SORT_ORDERS[reihenfolge]
    // sortiere zuerst die Gruppen
    this.groupList.sort(sortierFunktion)

    // sortiere danach die Item jeder Group
    for (let gruppe of this.groupList) {
      gruppe.itemList.sort(sortierFunktion)
    }
    this.printAndSave("[App] nach \"" + reihenfolge + "\" sortiert")
  }

  /**
   * Sortiert Elemente alphabetisch aufsteigend nach dem Namen
   * @param {Group|Item} a - erstes Element
   * @param {Group|Item} b - zweites Element
   * @returns {Number} - wenn kleiner: -1, wenn gleich: 0, wenn größer: +1
   */
  sortiereAufsteigend(a, b) {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return nameA < nameB ? -1 : (nameA > nameB ? 1 : 0)
  }

  /**
   * Sortiert Elemente alphabetisch absteigend nach dem Namen
   * @param {Group|Item} a - erstes Element
   * @param {Group|Item} b - zweites Element
   * @returns {Number} - wenn kleiner: -1, wenn gleich: 0, wenn größer: +1
   */
  sortiereAbsteigend(a, b) {
    const nameA = a.name.toLowerCase()
    const nameB = b.name.toLowerCase()
    return nameA < nameB ? 1 : (nameA > nameB ? -1 : 0)
  }

  /**
   * Sortiert Elemente aufsteigend nach dem ursprünglichen Index
   * @param {Group|Item} a - erstes Element
   * @param {Group|Item} b - zweites Element
   * @returns {Number} - wenn kleiner: -1, wenn gleich: 0, wenn größer: +1
   */
  sortiereIndex(a, b) {
    return a.index < b.index ? -1 : (a.index > b.index ? 1 : 0)
  }

  /**
   * Speichert den Modell-Zustand im LocalStorage
   * @param {Object} daten - entspricht dem Auf-Zuklapp-Zustand der App
   */
  speichern(daten) {
    const json = {
      gruppenListe: this.groupList,
      aktiveGruppeName: this.activeGroup?.name,
    }
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(json))
  }

  /**
   * Lädt den Modell-Zustand aus dem LocalStorage
   * @return {Boolean} erfolg - meldet, ob die Daten erfolgreich gelesen wurden
   */
  laden() {
    const daten = localStorage.getItem(this.STORAGE_KEY)
    if (daten) {
      this.initialize(JSON.parse(daten))
      this.printAndSave("[App] Daten aus dem LocalStorage geladen")
      return true
    }
    return false
  }

  /**
   * Initialisiert das Modell aus dem LocalStorage
   * @param {Object} jsonDaten - die übergebenen JSON-Daten
   */
  initialize(jsonDaten) {
    this.groupList = []
    for (let gruppe of jsonDaten.groupList) {
      let neueGruppe = this.gruppeHinzufuegen(gruppe.name)
      for (let artikel of gruppe.itemList) {
        neueGruppe.addItemByObject(artikel)
      }
    }
    if (jsonDaten.aktiveGruppeName) {
      this.activeGroup = this.findGroup(jsonDaten.aktiveGruppeName)
    }
  }
}

const Modell = new Stuff()

export default Modell
