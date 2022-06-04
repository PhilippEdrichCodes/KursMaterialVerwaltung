//import logo from './logo.svg'
//import './App.css'
import React from 'react'
import Modell from './model/Stuff'
import GroupTag from "./components/GroupTag"
import GroupDialog from "./components/GroupDialog"
import SortDialog from "./components/SortDialog"


/**
 * @version 1.0
 * @author Alfred Walther <alfred.walther@syntax-institut.de>
 * @description Diese App ist eine Einkaufsliste mit React.js und separatem Model, welche Offline verwendet werden kann
 * @license Gnu Public Lesser License 3.0
 *
 */
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      aktiveGruppe: null,
      showGruppenDialog: false,
      showSortierDialog: false,
      einkaufenAufgeklappt: true,
      erledigtAufgeklappt: false
    }
  }

  componentDidMount() {
    Modell.laden()
    // Auf-/Zu-Klapp-Zustand aus dem LocalStorage laden
    let einkaufenAufgeklappt = localStorage.getItem("einkaufenAufgeklappt")
    einkaufenAufgeklappt = (einkaufenAufgeklappt == null) ? true : JSON.parse(einkaufenAufgeklappt)

    let erledigtAufgeklappt = localStorage.getItem("erledigtAufgeklappt")
    erledigtAufgeklappt = (erledigtAufgeklappt == null) ? false : JSON.parse(erledigtAufgeklappt)

    this.setState({
      aktiveGruppe: Modell.activeGroup,
      einkaufenAufgeklappt: einkaufenAufgeklappt,
      erledigtAufgeklappt: erledigtAufgeklappt
    })
  }

  initialisieren() {
    let pop = Modell.gruppeHinzufuegen("Pop")
    let onlyU = pop.addItem("Only You (Vincent Clarke)")
    onlyU.prepared = false
    let rock4Fun = pop.addItem("Rock for Fun")
    rock4Fun.prepared = true
    let schlager = Modell.gruppeHinzufuegen("Schlager")
    let griechischerWein = schlager.addItem("Griechischer Wein")
    griechischerWein.prepared = false
    let zug = schlager.addItem("Es fährt ein Zug")
    zug.prepared = true
    let latAmVolk = Modell.gruppeHinzufuegen("Lateinam. Volkslieder")
    let elCondorPasa = latAmVolk.addItem("El Condor Pasa")
    elCondorPasa.prepared = false
    let chico = latAmVolk.addItem("Sambalelé, kleiner Chico")
    chico.prepared = true
  }

  einkaufenAufZuKlappen() {
    const neuerZustand = !this.state.einkaufenAufgeklappt
    localStorage.setItem("einkaufenAufgeklappt", neuerZustand)
    this.setState({einkaufenAufgeklappt: neuerZustand})
  }

  erledigtAufZuKlappen() {
    const neuerZustand = !this.state.erledigtAufgeklappt
    localStorage.setItem("erledigtAufgeklappt", neuerZustand)
    this.setState({erledigtAufgeklappt: neuerZustand})
  }

  lsLoeschen() {
    if (confirm("Wollen Sie wirklich alles löschen?!")) {
      localStorage.clear()
    }
  }

  /**
   * Hakt einen Item ab oder reaktiviert ihn
   * @param {Artikel} artikel - der aktuelle Item, der gerade abgehakt oder reaktiviert wird
   */
  artikelChecken = (artikel) => {
    artikel.gekauft = !artikel.gekauft
    const aktion = (artikel.gekauft) ? "erledigt" : "reaktiviert"
    Modell.printAndSave("[App] Item \"" + artikel.name + "\" wurde " + aktion)
    this.setState(this.state)
  }

  artikelHinzufuegen() {
    const eingabe = document.getElementById("artikelEingabe")
    const artikelName = eingabe.value.trim()
    if (artikelName.length > 0) {
      Modell.activeGroup.addItem(artikelName)
      this.setState(this.state)
    }
    eingabe.value = ""
    eingabe.focus()
  }

  setAktiveGruppe(gruppe) {
    Modell.activeGroup = gruppe
    Modell.printAndSave("[App] Gruppe \"" + gruppe.name + "\" ist nun aktiv")
    this.setState({aktiveGruppe: Modell.activeGroup})
  }

  closeSortierDialog = (reihenfolge, sortieren) => {
    if (sortieren) {
      Modell.sortieren(reihenfolge)
    }
    this.setState({showSortierDialog: false})
  }

  render() {
    let nochZuKaufen = []
    if (this.state.einkaufenAufgeklappt == true) {
      for (const gruppe of Modell.groupList) {
        nochZuKaufen.push(
          <GruppenTag
            key={gruppe.id}
            aktiv={gruppe == this.state.activeGroup}
            aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe)}
            checkHandler={this.artikelChecken}
            gekauft={false}
            gruppe={gruppe}
          />)
      }
    }

    let schonGekauft = []
    if (this.state.erledigtAufgeklappt) {
      for (const gruppe of Modell.groupList) {
        schonGekauft.push(
          <GruppenTag
            key={gruppe.id}
            aktiveGruppeHandler={() => this.setAktiveGruppe(gruppe)}
            checkHandler={this.artikelChecken}
            gekauft={true}
            gruppe={gruppe}
          />)
      }
    }

    let gruppenDialog = ""
    if (this.state.showGruppenDialog) {
      gruppenDialog = <GruppenDialog
        gruppenListe={Modell.groupList}
        onDialogClose={() => this.setState({showGruppenDialog: false})}/>
    }

    let sortierDialog = ""
    if (this.state.showSortierDialog) {
      sortierDialog = <SortierDialog onDialogClose={this.closeSortierDialog}/>
    }

    return (
      <div id="container">
        <header>
          <h1>Repertoire</h1>
          <label
            className="mdc-text-field mdc-text-field--filled mdc-text-field--with-trailing-icon mdc-text-field--no-label">
            <span className="mdc-text-field__ripple"></span>
            <input className="mdc-text-field__input" type="search"
                   id="artikelEingabe" placeholder="Item hinzufügen"
                   onKeyDown={e => (e.key == 'Enter') ? this.artikelHinzufuegen() : ''}/>
            <span className="mdc-line-ripple"></span>
            <i className="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
               tabIndex="0" role="button"
               onClick={() => this.artikelHinzufuegen()}>add_circle</i>
          </label>

        </header>
        <hr/>

        <main>
          <section>
            <h2 onClick={() => this.einkaufenAufZuKlappen()}>Aktiv
              <i className="material-icons">
                {this.state.einkaufenAufgeklappt ? 'expand_more' : 'expand_less'}
              </i>
            </h2>
            <dl>
              {nochZuKaufen}
            </dl>
          </section>
          <hr/>
          <section>
            <h2 onClick={() => this.erledigtAufZuKlappen()}>Vorhanden
              <i className="material-icons">
                {this.state.erledigtAufgeklappt ? 'expand_more' : 'expand_less'}
              </i>
            </h2>
            <dl>
              {schonGekauft}
            </dl>
          </section>
        </main>
        <hr/>

        <footer>
          <button className="mdc-button mdc-button--raised"
                  onClick={() => this.setState({showGruppenDialog: true})}>
            <span className="material-icons">bookmark_add</span>
            <span className="mdc-button__ripple"></span> Gruppen
          </button>
          <button className="mdc-button mdc-button--raised"
                  onClick={() => this.setState({showSortierDialog: true})}>
            <span className="material-icons">sort</span>
            <span className="mdc-button__ripple"></span> Sort
          </button>
          <button className="mdc-button mdc-button--raised"
                  onClick={this.lsLoeschen}>
            <span className="material-icons">clear_all</span>
            <span className="mdc-button__ripple"></span> Clear
          </button>
        </footer>

        {gruppenDialog}
        {sortierDialog}
      </div>
    )
  }
}

export default App
