class EmployeeGetAssigments {
  static id_modal = "employees_assignts_table_on_modal";

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

      const EMPLOYEE_ASSIGMENTS =
        Storage.getEmployeesAssigments_byEmployeeId(employeeId);

      DIALOG.innerHTML = /* html */ `
                <header class="bg-dark">
                    <h2>Assigments</h2>
                    <button class="btn btn-danger" onclick="${this.name}.close()">x</button>
                </header>
                <div>
                    <div class="alert bg-info">
                        Вы сейчас пытаетесь посмотреть с какими проектами связан сотрудник.
                    </div>

                    <table class="table bordered">
                        <thead class="bg-dark">
                            <tr>
                                <th>Project</th>
                                <th>Capacity</th>
                                <th>Fit</th>
                                <th>Vacation</th>
                                <th>Effective</th>
                                <th>Revenue</th>
                                <th>Cost</th>
                                <th>Profit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${EMPLOYEE_ASSIGMENTS.map((e) => {
                              const CAPACITY = Number(e.capacity).toFixed(2);
                              const FIT = Number(e.fit).toFixed(2);
                              const EFFECTIVE = Number(
                                e.capacity * e.fit,
                              ).toFixed(3);
                              return `
                                    <tr>
                                        <td></td>
                                        <td>${CAPACITY}</td>
                                        <td>${FIT}</td>
                                        <td>?</td>
                                        <td>${EFFECTIVE}</td>
                                        <td>?</td>
                                        <td>?</td>
                                        <td>?</td>
                                        <td>
                                          <button class="btn btn-danger" onclick="${this.name}.removeAssignment_byEmployeeId_byProjectId('${employeeId}', '${e.projectId}')">Unassign</button>
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                        </tbody>
                    </table>
                </div>
            `;
      document.body.appendChild(DIALOG);

      DIALOG.showModal();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static removeAssignment_byEmployeeId_byProjectId(employeeId, projectId) {
    if (
      !confirm(
        `Вы уверены, что ходите удалить связь сотрудник-продукт id = ${employeeId}-${projectId}`,
      )
    ) {
      return;
    }

    Storage.removeAssignment_byEmployeeId_byProjectId(employeeId, projectId);
    Employee.renderContent();
  }
}
