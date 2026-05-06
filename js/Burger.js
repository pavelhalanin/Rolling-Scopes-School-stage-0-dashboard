class Burger {
  static id_form_wrapper = "burger_menu";
  static class_close = "burger_menu--close";

  static cancel() {
    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    DIV.classList.add(this.class_close);
  }

  static open() {
    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
      return;
    }

    DIV.classList.remove(this.class_close);
  }

  static selectButton_byId(id) {
    const DIV = document.getElementById("menu_buttons");
    if (!DIV) {
      console.error(`Node not found #menu_buttons`);
      alert(`Node not found #menu_buttons`);
      return;
    }

    const BUTTONS = DIV.querySelectorAll("button");

    for (let i = 0; i < BUTTONS.length; i++) {
      BUTTONS[i].classList.remove("selected");
      if (BUTTONS[i].getAttribute("data-id") == id) {
        BUTTONS[i].classList.add("selected");
      }
    }
  }
}
