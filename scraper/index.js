import Rx from 'rxjs/Rx'

// Private static reference to the Scraper singleton for this page.
// Do not reference it directly.
// Always get it through `getScraper()`.
let _SCRAPER = null

const $ = ::document.querySelector

chrome.runtime.onMessage.addListener(() => {
  // Called whenever the extension icon is clicked.
  getScraper().captureMouseOver()
})

function getScraper () {
  if (_SCRAPER === null) {
    _SCRAPER = new Scraper()
  }
  return _SCRAPER
}

class Scraper {
  captureMouseOver () {
    Rx.Observable.fromEvent($('body'), 'mouseover')
      .throttleTime(500)
      .distinctUntilChanged()
      .subscribe((event) => {
        console.log(event.target)
      })
  }
}
