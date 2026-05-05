class Project {
  static id_form_wrapper = "right_form__project";
  static class_close = "project_add_form--close";

  static id_content = "project_section";

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

    const ARRAY = Storage.getProjects();

    DIV.innerHTML = /* html */ `
      <header>
        <h2>Projects</h2>
        <div>
          <button class="btn btn-success" oninput="Project.open()">Add project</button>
          <button class="btn btn-success" oninput="SeedData.open()">Seed Data</button>
        </div>
      </header>

      <table class="table bordered">
        <thead class="bg-dark">
          <tr>
            <th>Company Name</th>
            <th>Project Name</th>
            <th rowspan="2">Budget</th>
            <th rowspan="2">Employee Capacity</th>
            <th rowspan="2">Employees</th>
            <th rowspan="2">Estimated Incode</th>
            <th rowspan="2">Actions</th>
          </tr>
          <tr>
            <th class="th_filter">
              <input type="search" data-col="0" oninput="Project.filter()">
            </th>
            <th class="th_filter">
              <input type="search" data-col="1" oninput="Project.filter()">
            </th>
          </tr>
        </thead>
        <tbody>
          ${
            ARRAY.length !== 0
              ? ""
              : /* html */ `
                <tr>
                  <td colspan="7" align="center">No data on period</td>
                </tr>
                `
          }
          ${ARRAY.map((e) => {
            const COUNT_EMPLOYEE = Storage.getCountEmployes_byProjectId(e.id);
            return /* html */ `
              <tr>
                <td>${e.companyName}</td>
                <td>${e.projectName}</td>
                <td>${e.budget}</td>
                <td>${e.employeeCapacity}</td>
                <td>(${COUNT_EMPLOYEE})</td>
                <td>?</td>
                <td>
                  <button class="btn btn-danger" onclick="${this.name}.removeProject_byId('${e.id}')">Delete</button>
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

      Storage.addProject_byData(OBJECT);
      this.renderContent();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static removeProject_byId(id) {
    if (!confirm(`Вы уверены, что ходите удалить продукт id = ${id}`)) {
      return;
    }

    Storage.removeProject_byId(id);
    this.renderContent();
  }

  static filter() {
    try {
      console.log("filter");
      const DIV = document.getElementById(this.id_content);
      if (!DIV) {
        alert(`Узел не найден: ${this.id_content}`);
        return;
      }

      const TABLE = DIV.querySelector("table");
      if (!TABLE) {
        alert(`Узел не найден: ${this.id_content} table`);
        return;
      }

      const THEAD = TABLE.querySelector("thead");
      if (!THEAD) {
        alert(`Узел не найден: ${this.id_content} table thead`);
        return;
      }

      const INPUT_ARRAY = THEAD.querySelectorAll("input");

      const TBODY = TABLE.querySelector("tbody");
      if (!TBODY) {
        alert(`Узел не найден: ${this.id_content} table tbody`);
        return;
      }

      const TR_ARRAY = TBODY.querySelectorAll("tr");
      for (let i = 0; i < TR_ARRAY.length; i++) {
        TR_ARRAY[i].style.display = "";
      }

      for (let i = 0; i < INPUT_ARRAY.length; i++) {
        const VALUE = `${INPUT_ARRAY[i].value}`.toLowerCase();
        const COLUMN_ID = INPUT_ARRAY[i].getAttribute("data-col");

        for (let j = 0; j < TR_ARRAY.length; j++) {
          const TD_ARRAY = TR_ARRAY[j].querySelectorAll("td");
          const TEXT = `${TD_ARRAY[COLUMN_ID].innerHTML}`.toLowerCase();
          if (!TEXT.includes(VALUE)) {
            TR_ARRAY[j].style.display = "none";
          }
        }
      }
    } catch (exception) {
      alert(exception);
    }
  }
}
