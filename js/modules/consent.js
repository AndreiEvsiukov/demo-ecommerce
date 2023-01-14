class Consent {
  constructor() {

    // view 
    this.$container;
  }

  createHtmlString() {
    return `<!-- Modal -->
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
        </div>
        <div class="modal-body">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>`;
  }

  render() {
    this.$container = document.createElement('div');
    this.$container.classList.add('modal', 'fade');
    this.$container.setAttribute('id', 'consentModal');
    this.$container.setAttribute('data-bs-backdrop', 'static');
    this.$container.setAttribute('data-bs-keyboard', 'false');
    this.$container.setAttribute('tabindex', '-1');
    this.$container.setAttribute('aria-labelledby', 'staticBackdropLabel');
    this.$container.setAttribute('aria-hidden', 'true');
    this.$container.innerHTML = this.createHtmlString();
  }
  
}

export {Consent};