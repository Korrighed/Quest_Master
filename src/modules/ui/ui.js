export default class UI {
  static createArrowControls(containerId) {
    const container = document.getElementById(containerId);

    const buttons = {
      up: "↑",
      left: "←",
      right: "→",
      down: "↓"
    };

    container.innerHTML = `
      <div class="controls-grid">
        <button class="arrow-btn" data-direction="up" style="grid-area: up">${buttons.up}</button>
        <button class="arrow-btn" data-direction="left" style="grid-area: left">${buttons.left}</button>
        <button class="arrow-btn" data-direction="right" style="grid-area: right">${buttons.right}</button>
        <button class="arrow-btn" data-direction="down" style="grid-area: down">${buttons.down}</button>
      </div>
    `;
  }
}
