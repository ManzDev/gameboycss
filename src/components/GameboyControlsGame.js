import { LitElement, html, css } from "lit-element";

export default class GameboyControlsGame extends LitElement {
  pressSelect() {
    this.dispatchEvent(new CustomEvent("GAMEBOY_SELECT_PRESSED", { composed: true, bubbles: true }));
  }

  pressStart() {
    this.dispatchEvent(new CustomEvent("GAMEBOY_START_PRESSED", { composed: true, bubbles: true }));
  }

  static get styles() {
    // prettier-ignore
    return css`
      .gamecontrols {
        display: flex;
        justify-content: center;
        margin-bottom: 50px;

        & .gap {
          background-color: var(--gameboy-bgcolor);
          background-image:
            linear-gradient(
              rgba(0, 0, 0, 0.1) -10%,
              rgba(0, 0, 0, 0.005) 130%
            );
          transform: rotate(-28deg);
          margin: 0 5px;
          border-radius: 15px;
        }

        & .button {
          background: #9e9baf;
          border-radius: 10px;
          box-shadow:
            -2px -2px 5px rgba(0, 0, 0, 0.4) inset,
            2px 2px 5px rgba(255, 255, 255, 0.7) inset,
            2px 2px 6px rgba(0, 0, 0, 0.8);
          width: 50px;
          height: 12px;
          margin: 6px 8px;

          &:active {
            box-shadow:
              -2px -2px 5px rgba(0, 0, 0, 0.4) inset,
              2px 2px 5px rgba(0, 0, 0, 0.7) inset;
          }
        }

        & .button::after {
          font-family: Pretendo, sans-serif;
          font-size: 12px;
          color: #302058;
          content: attr(data-button);
          position: relative;
          right: 0;
          bottom: -20px;
        }
      }
`;
  }

  render() {
    return html`<div class="gamecontrols">
      <div class="gap"><div class="button select" data-button="SELECT" @click=${this.pressSelect}></div></div>
      <div class="gap"><div class="button start" data-button="START" @click=${this.pressStart}></div></div>
    </div>`;
  }
}

customElements.define("gameboy-controls-game", GameboyControlsGame);
