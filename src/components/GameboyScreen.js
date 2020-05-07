import { LitElement, html, css, unsafeCSS } from "lit-element";
import { Howl } from "howler";
import mp3 from "../assets/*.mp3";
import png from "../assets/*.png";

const sound = {
  intro: new Howl({ src: [mp3.intro], volume: 0.75, onend: () => sound.level1.play() }),
  level1: new Howl({ src: [mp3.level1], volume: 0.75, loop: true }),
  level2: new Howl({ src: [mp3.level2], volume: 0.75, loop: true }),
  level3: new Howl({ src: [mp3.level3], volume: 0.75, loop: true }),
  hit: new Howl({ src: [mp3.hit], volume: 1.5 }),
  startup: new Howl({ src: [mp3.startup], volume: 1 }),
};

const SONGS = ["level1", "level2", "level3"];

export default class GameboyScreen extends LitElement {
  static get properties() {
    return {
      start: {
        type: Boolean,
      },
    };
  }

  constructor() {
    super();
    this.start = this.getAttribute("start") || false;
    this.currentSong = 0;
    this.timers = [];
  }

  off() {
    Object.keys(sound).forEach((key) => sound[key].stop());
    this.timers.forEach((timer) => clearTimeout(timer));
    this.turnoffScenes();
  }

  nextSongTheme() {
    const current = SONGS[this.currentSong];
    if (sound[current].playing()) {
      sound[current].pause();
      this.currentSong = (this.currentSong + 1) % 3;
      sound[SONGS[this.currentSong]].play();
    }
  }

  updated() {
    if (this.start === true) this.startIntro();
    else if (this.start === false) this.off();
  }

  turnoffScenes() {
    this.scenes.forEach((scene) => scene.classList.remove("current"));
  }

  setScene(name) {
    this.turnoffScenes();
    const [scene] = this.scenes.filter((element) => element.classList.contains(name));
    scene.classList.add("current");
    if (name === "t2" || name == "title") setTimeout(() => sound.hit.play(), 1000);
  }

  startGame() {
    this.setScene("ljn");
    this.timers.push(setTimeout(() => this.setScene("bits"), 7000));
    this.timers.push(setTimeout(() => this.setScene("t2"), 14000));
    this.timers.push(setTimeout(() => this.setScene("title"), 17000));
    this.timers.push(setTimeout(() => this.startGame(), 31000));
  }

  startIntro() {
    this.setScene("intro");
    this.timers.push(
      setTimeout(() => {
        sound.startup.play();
        this.timers.push(setTimeout(() => this.setScene("credits"), 3400));
        this.timers.push(
          setTimeout(() => {
            sound.intro.play();
            this.startGame();
          }, 8400)
        );
      }, 2100)
    );
  }

  static get styles() {
    // prettier-ignore
    return css`
      :host {
        --scene-width: 230px;
        --scene-height: 200px;

        background: #9ca04c;
        width: var(--scene-width);
        height: var(--scene-height);
        box-shadow:
          5px 5px 10px rgba(0, 0, 0, 0.5) inset,
          -2px -2px 10px rgba(0, 0, 0, 0.25) inset;
        display: flex;
        justify-content: center;
        align-items: flex-start;
        overflow: hidden;
        position: relative;

        & span {
          font-family: "Press Start 2P", sans-serif;
          font-weight: bold;
          font-size: 18px;
          letter-spacing: -1px;
          color: #0f380f;

          & sup {
            font-weight: normal;
            font-size: 12px;
          }
        }
      }

      .scene {
        &.center {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
        }

        & img {
          transform: scale(0.65);
          image-rendering: pixelated;
        }

        &.credits {
          font-family: "Terminator 2", monospace;
          letter-spacing: -1px;
          font-size: 8px;
          text-align: center;
        }
      }

      :host .scene {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .scene.current {
        display: flex;
        opacity: 1;
        transition: opacity 1s;
        width: var(--scene-width);
        height: var(--scene-height);
        mix-blend-mode: overlay;
        filter: contrast(var(--gameboy-overlay-level));
      }

      .scene.intro.current span {
        animation: startup 2s linear forwards;
        transform: translate(0, -25px);
      }

      @keyframes startup {
        0% {
          transform: translate(0, -135px);
        }

        100% {
          transform: translate(0, 0);
        }
      }

      .t2 {
        display: flex;
        flex-direction: row !important;
        overflow: hidden;

        & .part1,
        & .part2 {
          width: 45%;
          height: 100%;
          background: url(${unsafeCSS(png.t2)});
          background-size: 205px 120px;
          background-repeat: no-repeat;
          transition: transform 1s;
        }

        & .part1 {
          transform: translateX(-180px);
          background-position: left;
        }

        & .part2 {
          transform: translateX(180px);
          background-position: right;
        }

        &.current > div {
          transform: translateX(0);
        }
      }

      .title {
        display: flex;
        flex-direction: column !important;
        overflow: hidden;

        & .part1,
        & .part2 {
          width: 90%;
          height: 50px;
          background: url(${unsafeCSS(png.title)});
          background-repeat: no-repeat;
          background-size: 205px 100px;
          transition: transform 1s;
        }

        & .part1 {
          transform: translateY(-180px);
          background-position: top;
        }

        & .part2 {
          transform: translateY(180px);
          background-position: bottom;
        }

        &.current > div {
          transform: translateY(0);
        }
      }

      .scene.title.current span {
        font-family: "Press Start 2P", monospace;
        font-size: 13px;
        transform: translate(0, 80px);
        animation:
          moveText 2s linear 0.5s forwards,
          blink 1s linear 3s infinite;
      }

      @keyframes moveText {
        0% { transform: translate(0, 80px); }
        100% { transform: translate(0, 20px); }
      }

      @keyframes blink {
        0%,
        50% { opacity: 1; }

        51%,
        100% { opacity: 0; }
      }
`;
  }

  render() {
    const template = html`
      <div class="scene intro center">
        <span>Nintendo<sup>®</sup></span>
      </div>
      <div class="scene credits center">
        <p>Terminator 2<br />Judgment Day</p>
        <p>© 1991 CAROLCO<br />© 1991 LJN LTD.</p>
        <p>Programming<br />Copyright B.I.T.S.</p>
        <p>LICENSED BY NINTENDO</p>
      </div>
      <div class="scene ljn center">
        <img src="${png.ljn}" alt="LJN" />
      </div>
      <div class="scene bits center">
        <img src="${png.bits}" alt="LJN" />
      </div>
      <div class="scene t2 center himpact">
        <div class="part1"></div>
        <div class="part2"></div>
      </div>
      <div class="scene title center vimpact">
        <div class="part1"></div>
        <div class="part2"></div>
        <span>PUSH START</span>
      </div>
    `;
    this.scenes = Array.from(this.shadowRoot.querySelectorAll(".scene"));
    return template;
  }
}

customElements.define("gameboy-screen", GameboyScreen);
