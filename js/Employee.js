class Employee {
  static id_form_wrapper = "right_form__employee";
  static class_close = "employee_add_form--close";

  static cancel() {
    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    DIV.classList.add(this.class_close);
  }

  static open() {
    Project.cancel();
    Employee.cancel();

    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    DIV.classList.remove(this.class_close);
  }
}
