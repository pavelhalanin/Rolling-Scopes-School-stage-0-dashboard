class Assigments {
  static id_form_wrapper = "right_form__assigments";
  static class_close = "assigments_add_form--close";

  static cancel() {
    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    DIV.classList.add(this.class_close);
  }

  static open() {
    Assigments.cancel();
    Project.cancel();
    Employee.cancel();

    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    DIV.classList.remove(this.class_close);
  }

  static onChangeInput() {
    const DIV = document.getElementById(this.id_form_wrapper);

    if (!DIV) {
      console.error(`Node not found #${this.id_form_wrapper}`);
      alert(`Node not found #${this.id_form_wrapper}`);
    }

    const FORM = DIV.querySelector("form");

    if (!FORM) {
      console.error(`Node not found #${this.id_form_wrapper} form`);
      alert(`Node not found #${this.id_form_wrapper} form`);
    }

    const BUTTON = FORM.querySelector(`button[type='submit']`);
    if (!BUTTON) {
      console.error(
        `Node not found #${this.id_form_wrapper} form button[type='submit']`,
      );
      alert(
        `Node not found #${this.id_form_wrapper} form button[type='submit']`,
      );
    }

    if (!FORM.checkValidity()) {
      BUTTON.setAttribute("disabled", "");
      return;
    }

    BUTTON.removeAttribute("disabled");
  }

  static add() {
    try {
      const DIV = document.getElementById(this.id_form_wrapper);

      if (!DIV) {
        console.error(`Node not found #${this.id_form_wrapper}`);
        alert(`Node not found #${this.id_form_wrapper}`);
      }

      const FORM = DIV.querySelector("form");

      if (!FORM) {
        console.error(`Node not found #${this.id_form_wrapper} form`);
        alert(`Node not found #${this.id_form_wrapper} form`);
      }

      const FORM_DATA = new FormData(FORM);

      const OBJECT = {};
      for (let [name, value] of FORM_DATA.entries()) {
        OBJECT[name] = value;
      }

      OBJECT.projectId = +OBJECT.projectId;

      const EMPLOYEE_ID = +OBJECT.employeeId;
      delete OBJECT.employeeId;

      Storage.addAssigment_byDataAndEmployeeId(OBJECT, EMPLOYEE_ID);
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static setProjectOnAddForm() {
    try {
      const DIV = document.getElementById(this.id_form_wrapper);

      if (!DIV) {
        console.error(`Node not found #${this.id_form_wrapper}`);
        alert(`Node not found #${this.id_form_wrapper}`);
        return;
      }

      const FORM = DIV.querySelector("form");

      if (!FORM) {
        console.error(`Node not found #${this.id_form_wrapper} form`);
        alert(`Node not found #${this.id_form_wrapper} form`);
        return;
      }

      const PROJECTS_SELECT = FORM.querySelector(`select[name='projectId']`);

      if (!PROJECTS_SELECT) {
        console.error(
          `Node not found #${this.id_form_wrapper} form select[name='projectId']`,
        );
        alert(
          `Node not found #${this.id_form_wrapper} form select[name='projectId']`,
        );
        return;
      }

      const PROJECTS = Storage.getProjects();

      PROJECTS_SELECT.innerHTML =
        `<option value="">Select project</option>` +
        PROJECTS.map((e) => {
          return /* html */ `
          <option value="${e.id}">
            ${e.projectName}
          </option>
        `;
        }).join("");
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static setEmployeeOnAddForm() {
    try {
      const DIV = document.getElementById(this.id_form_wrapper);

      if (!DIV) {
        console.error(`Node not found #${this.id_form_wrapper}`);
        alert(`Node not found #${this.id_form_wrapper}`);
        return;
      }

      const FORM = DIV.querySelector("form");

      if (!FORM) {
        console.error(`Node not found #${this.id_form_wrapper} form`);
        alert(`Node not found #${this.id_form_wrapper} form`);
        return;
      }

      const EMPLOYEE_SELECT = FORM.querySelector(`select[name='employeeId']`);

      if (!EMPLOYEE_SELECT) {
        console.error(
          `Node not found #${this.id_form_wrapper} form select[name='employeeId']`,
        );
        alert(
          `Node not found #${this.id_form_wrapper} form select[name='employeeId']`,
        );
        return;
      }

      const EMPLOYEES = Storage.getEmployees();

      EMPLOYEE_SELECT.innerHTML =
        `<option value="">Select employee</option>` +
        EMPLOYEES.map((e) => {
          return /* html */ `
          <option value="${e.id}">
            ${e.position} ${e.name} ${e.surname}
          </option>
        `;
        }).join("");
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static setEmployeeOnAddForm_byEmployeeId(employeeId) {
    try {
      const DIV = document.getElementById(this.id_form_wrapper);

      if (!DIV) {
        console.error(`Node not found #${this.id_form_wrapper}`);
        alert(`Node not found #${this.id_form_wrapper}`);
        return;
      }

      const FORM = DIV.querySelector("form");

      if (!FORM) {
        console.error(`Node not found #${this.id_form_wrapper} form`);
        alert(`Node not found #${this.id_form_wrapper} form`);
        return;
      }

      const EMPLOYEE_SELECT = FORM.querySelector(`select[name='employeeId']`);

      if (!EMPLOYEE_SELECT) {
        console.error(
          `Node not found #${this.id_form_wrapper} form select[name='employeeId']`,
        );
        alert(
          `Node not found #${this.id_form_wrapper} form select[name='employeeId']`,
        );
        return;
      }

      const EMPLOYEES = Storage.getEmployees();

      EMPLOYEE_SELECT.innerHTML =
        `<option value="">Select employee</option>` +
        EMPLOYEES.map((e) => {
          return /* html */ `
          <option value="${e.id}">
            ${e.position} ${e.name} ${e.surname}
          </option>
        `;
        }).join("");
      EMPLOYEE_SELECT.value = employeeId;
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static setFormAdd_byEmployeeId(employeeId) {
    try {
      this.setProjectOnAddForm();
      this.setEmployeeOnAddForm_byEmployeeId(employeeId);
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }
}
