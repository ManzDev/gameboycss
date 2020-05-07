import { LitElement, html, css } from "lit-element";

export default class GameboyControlsButtons extends LitElement {
  static get styles() {
    // prettier-ignore
    return css`
      :host {
        background-color: var(--gameboy-bgcolor);
        background-image:
          linear-gradient(
            rgba(0, 0, 0, 0.1) -10%,
            rgba(0, 0, 0, 0.005) 130%
          );
        border-radius: 40px;
        padding: 5px;
        height: 60px;
        display: flex;
        align-items: center;
        margin: 50px 30px 0 0;
        transform: rotate(-30deg);
      }

      .button {
        width: 50px;
        height: 50px;
        box-shadow:
          -2px 3px 5px rgba(0, 0, 0, 1),
          -3px 4px 3px rgba(255, 255, 255, 0.25) inset;
        margin: 0 6px;
        border-radius: 50%;
        background: #6f001a;

        &:active {
          box-shadow:
            -3px 4px 3px rgba(0, 0, 0, 0.25) inset,
            2px -2px 3px rgba(0, 0, 0, 0.25) inset;
        }
      }

      .button::after {
        font-family: Pretendo, sans-serif;
        font-size: 16px;
        color: #302058;
        content: attr(data-button);
        position: relative;
        right: -15px;
        bottom: -65px;
      }
`;
  }

  render() {
    return html`
      <div class="button B" data-button="B"></div>
      <div class="button A" data-button="A"></div>
    `;
  }
}

customElements.define("gameboy-controls-buttons", GameboyControlsButtons);
