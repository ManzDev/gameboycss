import "./components/GameboyConsole.js";
import dat from "dat.gui";

const gb = document.querySelector("gameboy-console");

class Options {
  constructor() {
    this.bgColor = "#d3ccd3";
    this.batteryLevel = 1;
    this.volumeLevel = 1;
  }
}

const gui = new dat.GUI();
const options = new Options();

gui.addColor(options, "bgColor").onChange((v) => gb.setBackgroundColor(v));
gui.add(options, "batteryLevel", 0.25, 1, 0.25).onChange((v) => gb.setBatteryLevel(v));
gui.add(options, "volumeLevel", 0, 1, 0.1).onChange((v) => gb.setVolumeLevel(v));
