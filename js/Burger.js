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
    }

    DIV.classList.remove(this.class_close);
  }
}
