class Consent {
  constructor() {

    // model

    this.cookies = {
      ad: 'adConsentGranted',
      analytics: 'analyticsConsentGranted',
      functionality: 'functionalityConsentGranted',
      personalization: 'personalizationConsentGranted',
      security: 'securityConsentGranted'
    };

    this.selectedCookies = [
      this.cookies.functionality,
      this.cookies.personalization,
      this.cookies.security,
      this.cookies.ad,
      this.cookies.analytics
    ];

    // view 
    this.$container;
  }

  createHtmlString() {
    return `<!-- Modal -->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">We need your consent!</h1>
        </div>
        <div class="modal-body">
          <p class="mb-3">Please, select what types of cookies you allow:</p>
          <div class="form-check form-switch mb-2" id="functionalCookies">
            <input class="form-check-input" value="on" type="checkbox" role="switch" id="functionalCookiesCheck" checked disabled>
            <label class="form-check-label" for="functionalCookiesCheck">Functional cookies</label>
          </div>
          <div class="form-check form-switch mb-2" id="analyticsCookies">
            <input class="form-check-input" value="on" type="checkbox" role="switch" id="analyticsCookiesCheck" checked>
            <label class="form-check-label" for="analyticslCookiesCheck">Analytics cookies</label>
          </div>
          <div class="form-check form-switch mb-2" id="adCookies">
            <input class="form-check-input" value="on" type="checkbox" role="switch" id="adCookiesCheck" checked>
            <label class="form-check-label" for="adCookiesCheck">Advertising cookies</label>
          </div>
        </div>
        <div class="modal-footer">
          <div>
            <button type="button" class="btn btn-light" data-bs-toggle="collapse" data-bs-target="#detailAboutCookies" aria-expanded="false" aria-controls="detailAboutCookies">Details</button>
            <button type="button" class="btn btn-primary" id="acceptCookiesButton" data-bs-dismiss="modal">Accept cookies</button>
          </div>
          <div class="collapse mb-3" id="detailAboutCookies">
            <div class="card card-body">
              Et pariatur cillum fugiat labore sit ex ut ut elit. Incididunt commodo velit minim fugiat in anim laborum. Laborum est laboris adipisicing qui ut. Pariatur qui officia do officia. Deserunt commodo sint ea eu velit aliqua laboris adipisicing est cupidatat exercitation. Excepteur nostrud do officia magna fugiat dolore enim.
            </div>
          </div>
        </div>
      </div>
    </div>`;
  }

  render() {
    this.$container = document.createElement('div');
    this.$container.classList.add('modal', 'fade');
    this.$container.setAttribute('id', 'consentModal');
    this.$container.innerHTML = this.createHtmlString();

    const analyticsCheckInputEl = this.$container.querySelector('#analyticsCookies input');
    analyticsCheckInputEl.addEventListener('click', () => {
      this.changeCookieData(analyticsCheckInputEl, 'analytics');
    })

    const adCheckInputEl = this.$container.querySelector('#adCookies input');
    adCheckInputEl.addEventListener('click', () => {
      this.changeCookieData(adCheckInputEl, 'ad');
    })


    const accpetCookiesButtonEl = this.$container.querySelector('#acceptCookiesButton');
    accpetCookiesButtonEl.addEventListener('click', () => {
      this.setCookies();
    })

  }

  changeCookieData (inputEl, cookie) {
    inputEl.value === 'on' ? (inputEl.value = 'off') : (inputEl.value = 'on');
    
    if (inputEl.value === 'off') {
      cookie === 'analytics' ? (cookie = 'analyticsConsentGranted') : (cookie = 'adConsentGranted')
      this.selectedCookies.splice(this.selectedCookies.findIndex(e => e.includes(cookie)), 1);

    } else {
      cookie === 'analytics' ? (cookie = 'analyticsConsentGranted') : (cookie = 'adConsentGranted')
      this.selectedCookies.push(cookie);
    }

    console.log(this.selectedCookies);
  }

  setCookies () {
    document.cookie = `consent1=${this.selectedCookies.join('&')}`;

    let testCookie = '{"nameOne":"one","nameTwo":"two"}'
    document.cookie = `consent=${decodeURIComponent(testCookie)}`
  }
  
}
export {Consent};