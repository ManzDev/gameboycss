import "./GameboyControlsCross.js";
import "./GameboyControlsButtons.js";
import "./GameboyControlsGame.js";
import "./GameboyScreen.js";

import { LitElement, html, css } from "lit-element";
import { classMap } from "lit-html/directives/class-map";
import { Howler } from "howler";

export default class GameboyConsole extends LitElement {
  static get properties() {
    return {
      isOn: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.isOn = false;
    this.width = 380;
    this.height = 625;
    this.batteryLevel = 1;

    this.addEventListener("GAMEBOY_SELECT_PRESSED", () => this.nextSongTheme());
  }

  setBackgroundColor(col) {
    this.style.setProperty("--gameboy-bgcolor", col);
    console.log(col);
  }

  setBatteryLevel(level) {
    this.batteryLevel = level;
    this.style.setProperty("--gameboy-battery-level", Math.min(1, level * 1.5));
    this.style.setProperty("--gameboy-overlay-level", level * 1.5);
  }

  setVolumeLevel(level) {
    Howler.volume(level);
  }

  nextSongTheme() {
    this.shadowRoot.querySelector("gameboy-screen").nextSongTheme();
  }

  static get styles() {
    // prettier-ignore
    return css`
      :host {
        --gameboy-bgcolor: #d3ccd3;
        --gameboy-battery-level: 1;
        --gameboy-overlay-level: 1.5;

        width: var(--gameboy-width);
        height: var(--gameboy-height);
        position: relative;
      }

      /* GameBoy console body */
      .gameboy {
        background-color: var(--gameboy-bgcolor);
        background-image: linear-gradient(transparent 95%, rgba(0, 0, 0, 0.5) 98%, rgba(0, 0, 0, 0.4) 99%);
        overflow: hidden;
        border-radius: 12px 12px 75px 12px;
        box-shadow:
          0 0 10px rgba(0, 0, 0, 0.5),
          0 0 25px rgba(0, 0, 0, 0.25) inset,
          -2px -2px 10px rgba(0, 0, 0, 0.8) inset,
          0 0 15px rgba(0, 0, 0, 0.75) inset;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
      }

      .power {
        width: 30px;
        height: 15px;
        border-radius: 50%;
        background-color: var(--gameboy-bgcolor);
        background-image: linear-gradient(to right, rgba(0, 0, 0, 0.05) 10%, rgba(0, 0, 0, 0.1) 30% 70%, rgba(0, 0, 0, 0.05) 90%);
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.5) inset;
        position: absolute;
        top: -7px;
        left: 50px;
        cursor: pointer;

        &.on {
          left: 75px;
        }
      }

      .gbtop {
        display: flex;
        padding-bottom: 5px;
        margin-bottom: 5px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);

        & .corner {
          width: 25px;
          height: 20px;
        }

        & .corner.left {
          margin-right: 5px;
        }

        & .corner.right {
          margin-left: 5px;
        }

        & .top {
          width: 100%;

          & span {
            font-family: Arial, sans-serif;
            font-size: 12px;
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5) inset;
            text-shadow: 2px 1px 2px rgba(0, 0, 0, 1);
            color: #eee;
            border-radius: 15px;
            margin: 0 6px;
            padding: 2px 5px;
            opacity: 0.25;
          }
        }

        & .left,
        & .top,
        & .right {
          border-radius: 0 0 2px 2px;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
        }
      }

      /* GameBoy complete screen (gray + green) */
      .screen {
        background: #767189;
        width: calc(var(--gameboy-height) / 1.9);
        box-shadow: 0 0 2px #514c65;
        border-radius: 10px 10px 35px 10px;
        border: 1px solid #666;
        border-width: 0 1px 0 1px;
        height: 250px;
        margin: 0.1em auto;

        & .minitext {
          font-family: Arial, sans-serif;
          font-size: 10px;
          color: #fff;
        }

        & .top {
          margin: 0 15px;
          height: 30px;
          background:
            linear-gradient(
              transparent 10px,
              #7d1a4a 10px 12px,
              transparent 12px 16px,
              #35224e 16px 18px,
              transparent 18px
            );
          position: relative;

          & span {
            padding: 0 8px;
            background: #767189;
            position: absolute;
            right: 30px;
            top: 8px;
          }
        }

        & .bottom {
          display: flex;

          & .led {
            width: 10px;
            height: 10px;
            background: #4a4748;
            border-radius: 50%;
            margin: 6px;

            &.on {
              background: rgba(216, 30, 7, var(--gameboy-battery-level));
              box-shadow: 0 0 5px #d81e07;
            }
          }

          & .battery {
            padding: 0 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;

            & .minitext {
              font-size: 9px;
            }
          }
        }
      }

      /* Brand Nintendo GameBoy text */
      .brand {
        margin: 5px 30px;

        & .company,
        & .type {
          font-family: Pretendo, sans-serif;
          font-size: 14px;
          color: #302058;
        }

        & .type {
          font-family: Lato, sans-serif;
          font-weight: bold;
          font-style: italic;
          font-size: 22px;
        }
      }

      /* Main controls: Cross and A/B buttons */
      .controls {
        display: flex;
        justify-content: space-between;
      }

      /* Gameboy bottom body part */
      .gameboy > .bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        left: -20px;
      }

      .speaker {
        display: flex;
        width: 120px;
        justify-content: space-around;
        position: absolute;
        right: 10px;
        bottom: 35px;
        transform: rotate(-30deg);

        &::after {
          content: "";
          width: 200px;
          height: 60px;
          position: absolute;
          background: rgba(0, 0, 0, 0.1);
          top: 50px;
        }

        & .band {
          width: 8px;
          height: 60px;
          border-radius: 8px;
          box-shadow: 3px 6px 1px rgba(0, 0, 0, 0.6) inset;
          background: rgba(0, 0, 0, 0.35);
        }
      }

      .gbbottom {
        transform: translateX(6px);
      }

      .phones {
        font-family: Arial, sans-serif;
        font-size: 10px;
        opacity: 0.5;
        text-align: center;
        border: 1px solid #aaa;
        border-radius: 40px;
        padding: 2px 6px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) inset;
      }

      .slot {
        margin: auto;
      }

      .slot,
      .slot::before,
      .slot::after {
        width: 5px;
        height: 10px;
        background-color: var(--gameboy-bgcolor);
        background-image:
          linear-gradient(
            to left,
            rgba(0, 0, 0, 0.65) 1px,
            rgba(0, 0, 0, 0.6) 2px,
            rgba(0, 0, 0, 0.65) 4px
          );
      }

      .slot::before,
      .slot::after {
        content: "";
        display: block;
        width: 5px;
        height: 10px;
        position: absolute;
      }

      .slot::before {
        transform: translateX(-8px);
      }

      .slot::after {
        transform: translateX(8px);
      }
`;
  }

  clickPower() {
    this.isOn = !this.isOn;
  }

  render() {
    return html`
      <style>
        :host {
          --gameboy-width: ${this.width}px;
          --gameboy-height: ${this.height}px;
        }
      </style>
      <div class="power ${classMap({ on: this.isOn })}" @click="${this.clickPower}"></div>
      <div class="gameboy">
        <div class="gbtop">
          <div class="corner left"></div>
          <div class="top">
            <span>◁ OFF·ON ▷</span>
          </div>
          <div class="corner right"></div>
        </div>
        <div class="screen">
          <div class="top">
            <span class="minitext">DOT MATRIX WITH STEREO SOUND</span>
          </div>
          <div class="bottom">
            <div class="battery">
              <div class="led ${classMap({ on: this.isOn })}"></div>
              <span class="minitext">BATTERY</span>
            </div>
            <gameboy-screen .start=${this.isOn}></gameboy-screen>
          </div>
        </div>
        <div class="brand">
          <span class="company">Nintendo</span>
          <span class="type">GAME BOY</span>
          <sub>™</sub>
        </div>

        <div class="controls">
          <gameboy-controls-cross></gameboy-controls-cross>
          <gameboy-controls-buttons></gameboy-controls-buttons>
        </div>

        <div class="speaker">
          <div class="band"></div>
          <div class="band"></div>
          <div class="band"></div>
          <div class="band"></div>
          <div class="band"></div>
          <div class="band"></div>
        </div>

        <div class="bottom">
          <gameboy-controls-game></gameboy-controls-game>
          <div class="gbbottom">
            <div class="phones">🎧PHONES</div>
            <div class="slot"></div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("gameboy-console", GameboyConsole);
