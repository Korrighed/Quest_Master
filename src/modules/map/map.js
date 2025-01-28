// src/modules/map/map.js
export default class Map {
    constructor() {
      this.mapElement = document.getElementById("map"); // Cible l'élément où la carte sera injectée
    }
  
    generateGrid() {
      const table = document.createElement("table");
      table.className = "table table-striped";
  
      // Création de l'en-tête de la table
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      ["#", "First", "Last", "Handle"].forEach(text => {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = text;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      // Création du corps de la table
      const tbody = document.createElement("tbody");
      const data = [
        { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
        { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
        { id: 3, first: "Larry the Bird", last: "", handle: "@twitter" }
      ];
  
      data.forEach(item => {
        const row = document.createElement("tr");
        const th = document.createElement("th");
        th.scope = "row";
        th.textContent = item.id;
        row.appendChild(th);
  
        [item.first, item.last, item.handle].forEach(text => {
          const td = document.createElement("td");
          td.textContent = text;
          if (item.id === 3 && text === item.last) {
            td.colSpan = 2; // Fusion des cellules pour la dernière ligne
          }
          row.appendChild(td);
        });
  
        tbody.appendChild(row);
      });
  
      table.appendChild(tbody);
      this.mapElement.appendChild(table); // Injecte la table dans le DOM
    }
  }