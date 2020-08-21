class MyInput extends HTMLElement {
  static get observedAttributes() {
    return ['label', 'value', 'disabled'];
  }

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
      <label><span>${this.getAttribute('label') || ''}</span>
      <input 
        type"text" 
        value="${this.getAttribute('value') || ''}" 
        ${this.hasAttribute('disabled') ? 'disabled' : ''}
      />
      </label>
    `;
    this.input = this.shadowRoot.querySelector('input');
  }

  connectedCallback() {
    this.input.addEventListener('input', this.onInput);
  }

  disconnectedCallback() {
    this.input.removeEventListener('input', this.onInput);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'label':
        this.shadowRoot.querySelector('label span').textContent = newValue;
      case 'disabled':
      case 'value':
        this.input[name] = this[name];
      default:
    }
  }

  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(disabled) {
    const isDisabled = Boolean(disabled);
    if (isDisabled) {
      this.setAttribute('disabled', 'true');
    } else {
      this.removeAttribute('disabled');
    }
  }

  onInput = (e) => {
    e.stopPropagation();
    const event = new CustomEvent('input', {
      detail: e.target.value,
      bubbles: false,
      composed: true,
    });
    this.dispatchEvent(event);
  };
}

customElements.define('my-input', MyInput);
