import View from "./view.js";
import Controller from "./controller.js";
import Model from "./model.js";

window.addEventListener("DOMContentLoaded", () => {
          let view = new View();
          let model = new Model();
          let controller = new Controller(view, model);
          controller.bindEvents()
})
