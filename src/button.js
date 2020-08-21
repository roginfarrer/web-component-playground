class MyInput extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `<button><slot></slot></button>`;
    this.button = shadowRoot.querySelector('button');
  }

  static get observedAttributes() {
    return ['type', 'disabled'];
  }

  connectedCallback() {
    this.button.addEventListener('click', this.onClick);
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.onClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'type':
      case 'disabled':
        this.button[name] = this[name];
      default:
    }
  }

  get type() {
    return this.getAttribute('type');
  }

  set type(type) {
    this.setAttribute('type', type);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    const isDisabled = Boolean(disabled);
    if (isDisabled) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  onClick = (e) => {
    e.stopPropagation();
    const event = new CustomEvent('click', {
      detail: e,
      composed: true,
      bubbles: true,
      cancelable: false,
    });
    this.dispatchEvent(event);
  };
}

customElements.define('my-button', MyInput);
