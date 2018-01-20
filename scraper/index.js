import Rx from 'rxjs/Rx'

// Private static reference to the Scraper singleton for this page.
// Do not reference it directly.
// Always get it through `getScraper()`.
let _SCRAPER = null

const $ = ::document.querySelector

chrome.runtime.onMessage.addListener(() => {
  // Called whenever the extension icon is clicked.
  getScraper().modeMouseOver()
})

function getScraper () {
  if (_SCRAPER === null) {
    _SCRAPER = new Scraper()
  }
  return _SCRAPER
}

class Scraper {
  subMouseOver = null

  modeMouseOver () {
    if (this.subMouseOver) {
      return
    }

    const body = $('body')

    this.subMouseOver = Rx.Observable
      .fromEvent(body, 'mouseover')
      .throttleTime(500)
      .distinctUntilChanged()
      .subscribe((event) => {
        // TODO: Update UI with path to target.
        console.log(event.target)
      })

    Rx.Observable
      .fromEvent(body, 'click', {capture: true})
      .first()
      .subscribe((event) => {
        event.stopPropagation()
        event.preventDefault()
        this.modeBranch(event.target)
      })
  }

  modeBranch (element) {
    this.subMouseOver.unsubscribe()
    this.subMouseOver = null
    console.log(element)
  }
}
