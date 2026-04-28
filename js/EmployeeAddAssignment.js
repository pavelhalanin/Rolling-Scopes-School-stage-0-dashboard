class EmployeeAddAssignment {
  static id_modal = "employees_assignt_add_modal";

  static close() {
    try {
      const DIALOG = document.getElementById(this.id_modal);
      if (!DIALOG) {
        alert(`Узел не найден #${this.id_modal}`);
        return;
      }

      DIALOG.close();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static open_byEmployeeId(employeeId) {
    try {
      document.querySelectorAll(`#${this.id_modal}`).forEach((e) => e.remove());
      const DIALOG = document.createElement("dialog");
      DIALOG.setAttribute("id", `${this.id_modal}`);
      DIALOG.classList.add("modal_wrapper");

      const EMPLOYEES = Storage.getEmployees();
      const PROJECTS = Storage.getProjects();

      DIALOG.innerHTML = /* html */ `
                <header class="bg-dark">
                    <h2>Assignments</h2>
                    <button class="btn btn-danger" onclick="${this.name}.close()">x</button>
                </header>
                <div>
                    <div class="alert bg-info">
                        Вы сейчас пытаетесь добавить к сотруднику проект.
                    </div>

                    <form action="">
                        <h2>Assignments</h2>
                        <div class="input__wrapper">
                            <label for="assignments_add_form__employee_id">Employee: *</label>
                            <select id="assignments_add_form__employee_id" name="employeeId" oninput="EmployeeAddAssignment.onChangeInput()" required>
                                <option value="">Select employee</option>
                                ${EMPLOYEES.map((e) => {
                                  const TITLE = [
                                    `ID: ${e.id}`,
                                    `Имя: ${e.name}`,
                                    `Фамилия: ${e.surname}`,
                                    `Должность: ${e.position}`,
                                    `Дата рождения: ${e.dob}`,
                                  ]
                                    .join("\n")
                                    .replace(/"/g, `'`);
                                  return `
                                            <option value="${e.id}" ${e.id == employeeId ? "selected" : ""} title="${TITLE}">
                                                ${e.position} ${e.name} ${e.surname}
                                            </option>
                                        `;
                                }).join("")}
                            </select>
                            <div class="input__error_message">
                                Employee is required
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <label for="assignments_add_form__project_id">Project: *</label>
                            <select id="assignments_add_form__project_id" name="projectId" oninput="EmployeeAddAssignment.onChangeInput()" required>
                                <option value="">Select project</option>
                                ${PROJECTS.map((e) => {
                                  const TITLE = [
                                    `ID: ${e.id}`,
                                    `Имя проекта: ${e.projectName}`,
                                    `Имя компании: ${e.companyName}`,
                                    `Бюджет: ${e.budget}`,
                                    `Количество ставок: ${e.employeeCapacity}`,
                                  ]
                                    .join("\n")
                                    .replace(/"/g, `'`);
                                  return /* html */ `
                                            <option value="${e.id}" title="${TITLE}">
                                                ${e.projectName}
                                            </option>
                                        `;
                                }).join("")}
                            </select>
                            <div class="input__error_message">
                                Project is required
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <label for="assignments_add_form__capacity">Capacity Allocation: *</label>

                            <input id="assignments_add_form__capacity" name="capacity" oninput="EmployeeAddAssignment.onChangeInput()"
                                type="number" min="0" max="1.5" step="0.1" title="Adjust capacity (0.0 - 1.5)" required>

                            <div class="input__error_message">
                                Adjust capacity (0.0 - 1.5)
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <label for="assignments_add_form__fit">Project Fit: *</label>

                            <input id="assignments_add_form__fit" name="fit" oninput="EmployeeAddAssignment.onChangeInput()"
                                type="number" min="0" max="1" step="0.1" title="Project fit coefficient (0.0 - 1.0). Effective capacity = capacity × fit" required>

                            <div class="input__error_message">
                                Project fit coefficient (0.0 - 1.0). Effective capacity = capacity × fit
                            </div>
                        </div>
                        <button class="btn btn-success" type="submit" onclick="event.preventDefault(); ${this.name}.add()"
                            disabled>Add</button>
                        <button class="btn btn-secondary" onclick="event.preventDefault(); ${this.name}.close()">
                            Close
                        </button>
                    </form>
                </div>
            `;
      document.body.appendChild(DIALOG);

      DIALOG.showModal();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  //

  static onChangeInput() {
    const DIALOG = document.getElementById(this.id_modal);

    if (!DIALOG) {
      console.error(`Node not found #${this.id_modal}`);
      alert(`Node not found #${this.id_modal}`);
      return;
    }

    const FORM = DIALOG.querySelector("form");

    if (!FORM) {
      console.error(`Node not found #${this.id_modal} form`);
      alert(`Node not found #${this.id_modal} form`);
      return;
    }

    const BUTTON = FORM.querySelector(`button[type='submit']`);
    if (!BUTTON) {
      console.error(
        `Node not found #${this.id_modal} form button[type='submit']`,
      );
      alert(`Node not found #${this.id_modal} form button[type='submit']`);
      return;
    }

    if (!FORM.checkValidity()) {
      BUTTON.setAttribute("disabled", "");
      return;
    }

    BUTTON.removeAttribute("disabled");
  }

  static add() {
    try {
      const DIALOG = document.getElementById(this.id_modal);

      if (!DIALOG) {
        console.error(`Node not found #${this.id_modal}`);
        alert(`Node not found #${this.id_modal}`);
      }

      const FORM = DIALOG.querySelector("form");

      if (!FORM) {
        console.error(`Node not found #${this.id_modal} form`);
        alert(`Node not found #${this.id_modal} form`);
      }

      const FORM_DATA = new FormData(FORM);

      const OBJECT = {};
      for (let [name, value] of FORM_DATA.entries()) {
        OBJECT[name] = value;
      }

      OBJECT.projectId = +OBJECT.projectId;

      const EMPLOYEE_ID = +OBJECT.employeeId;
      delete OBJECT.employeeId;

      Storage.addAssignment_byDataAndEmployeeId(OBJECT, EMPLOYEE_ID);
      this.close();
      Employee.renderContent();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }
}
