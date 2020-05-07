import { LitElement, html, css } from "lit-element";

export default class GameboyControlsCross extends LitElement {
  static get styles() {
    // prettier-ignore
    return css`
      :host {
        background-color: var(--gameboy-bgcolor);
        background-image:
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) -10%,
            rgba(0, 0, 0, 0.005) 130%
          );
        border-radius: 50%;
        padding: 10px;
        width: 100px;
        height: 100px;
        margin: 30px;
        display: grid;
        grid-template-areas:
          ". up ."
          "left center right"
          ". down .";

        & .cursor {
          background: #040308;
          border: 3px solid #040308;
          box-shadow: 2px 4px 3px rgba(0, 0, 0, 0.6);
          display: flex;
        }

        & .cursor.up,
        & .cursor.left,
        & .cursor.right {
          border-top-color: #777;
        }

        & .cursor .circle {
          border: 1px solid #111;
          border-left: 0;
          border-bottom: 0;
          border-radius: 50%;
          width: 100%;
          height: 100%;
          background:
            conic-gradient(
              rgba(255, 255, 255, 0.01) 0 30%,
              rgba(255, 255, 255, 0.4) 40% 60%,
              rgba(255, 255, 255, 0.02) 70%
            );
        }

        & .cursor.up { grid-area: up; }
        & .cursor.left { grid-area: left; }
        & .cursor.center { grid-area: center; }
        & .cursor.right { grid-area: right; }
        & .cursor.down { grid-area: down; }

        & .cursor:active {
          box-shadow: none;
          border-color: #111;
        }

        & .cursor.center:active {
          border-color: #040308;
        }
      }
`;
  }

  render() {
    return html`
      <div class="cursor up"></div>
      <div class="cursor left"></div>
      <div class="cursor center">
        <div class="circle"></div>
      </div>
      <div class="cursor right"></div>
      <div class="cursor down"></div>
    `;
  }
}

customElements.define("gameboy-controls-cross", GameboyControlsCross);
