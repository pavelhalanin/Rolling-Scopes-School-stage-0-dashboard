class Employee {
  static id_form_wrapper = "right_form__employee";
  static class_close = "employee_add_form--close";

  static id_content = "employee_section";

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

  static hideContent() {
    const DIV = document.getElementById(this.id_content);

    if (!DIV) {
      console.error(`Node not found #${this.id_content}`);
      alert(`Node not found #${this.id_content}`);
    }

    DIV.classList.add("d-none");
  }

  static renderContent() {
    Employee.hideContent();
    Project.hideContent();

    const DIV = document.getElementById(this.id_content);

    if (!DIV) {
      console.error(`Node not found #${this.id_content}`);
      alert(`Node not found #${this.id_content}`);
    }

    DIV.classList.remove("d-none");

    const ARRAY = Storage.getEmployees();

    DIV.innerHTML = /* html */ `
      <h2>Employees</h2>

      <button class="btn btn-success" onclick="Employee.open()">Add employee</button>

      <table class="table bordered">
        <thead>
          <tr>
              <th>Name</th>
              <th>Surname</th>
              <th>Age</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Estimated Payment</th>
              <th>Project</th>
              <th>Projected Income</th>
              <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          ${
            ARRAY.length !== 0
              ? ""
              : /* html */ `
                <tr>
                  <td colspan="9" align="center">No data on period</td>
                </tr>
                `
          }
          ${ARRAY.map((e) => {
            const BIRTHDAY = e.dob;
            const AGE = this.calculateAge(new Date(BIRTHDAY));
            const BIRTHDAY_TITLE = [`Дата рождения: ${BIRTHDAY}`]
              .join("")
              .replace(/"/g, `'`);

            return /* html */ `
              <tr>
                <td>${e.name}</td>
                <td>${e.surname}</td>
                <td title="${BIRTHDAY_TITLE}">${AGE}</td>
                <td>${e.position}</td>
                <td>${e.salary}</td>
                <td>?</td>
                <td>?</td>
                <td>?</td>
                <td>
                  <button class="btn btn-primary" onclick="Assigments.setFormAdd_byEmployeeId('${e.id}'); Assigments.open()">Assigments</button>
                  <button class="btn btn-danger" onclick="alert('nothing')">Delete</button>
                </td>
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    `;
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

      Storage.addEmployee_byData(OBJECT);
      this.renderContent();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  }

  static onChangeBirthDay() {
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

    const INPUT_BIRTHDAY = FORM.querySelector(`input[name='dob']`);
    if (!INPUT_BIRTHDAY) {
      console.error(
        `Node not found #${this.id_form_wrapper} form input[name='dob']`,
      );
      alert(`Node not found #${this.id_form_wrapper} form input[name='dob']`);
      return;
    }

    const DATE = new Date(`${INPUT_BIRTHDAY.value}`);
    const AGE = this.calculateAge(DATE);

    const INPUT_AGE = FORM.querySelector(`input[data-input-name='age']`);
    if (!INPUT_AGE) {
      console.error(
        `Node not found #${this.id_form_wrapper} form input[data-input-name='age']`,
      );
      alert(
        `Node not found #${this.id_form_wrapper} form input[data-input-name='age']`,
      );
      return;
    }

    INPUT_AGE.value = AGE;
  }
}
