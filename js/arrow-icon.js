class ArrowIcon extends HTMLElement {
  constructor() {
    super()
  }
  connectedCallback() {
    this.innerHTML = `
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-move-up-right"
      >
        <path d="M13 5H19V11" />
        <path d="M19 5L5 19" />
      </svg>
    `
  }
}

customElements.define('arrow-icon', ArrowIcon)
