export default class UI {
  static createArrowControls(containerId) {
    const container = document.getElementById(containerId);

    const directions = ["up", "down", "left", "right"];
    const arrowsHTML = directions
      .map(
        (dir) => `
        <button class="arrow-btn" data-direction="${dir}">
          ${
            dir === "up"
              ? "↑"
              : dir === "down"
              ? "↓"
              : dir === "left"
              ? "←"
              : "→"
          }
        </button>
      `
      )
      .join("");

    container.innerHTML = `
        <div class="controls-grid">
          ${arrowsHTML}
        </div>
      `;
  }
}
