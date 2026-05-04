class EmployeeGetAssignments {
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

      const EMPLOYEE = Storage.getEmployee_byId(employeeId);

      const EMPLOYEE_ASSIGMENTS = EMPLOYEE.assignments || [];

      DIALOG.innerHTML = /* html */ `
                <header>
                    <h2>Assignments</h2>
                    <button class="btn btn-danger" onclick="${this.name}.close()">x</button>
                </header>
                <div>
                    <div class="alert alert-info">
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
                              const PROJECT_NAME =
                                Storage.getProjectName_byProjectId(e.projectId);
                              const CAPACITY = Number(e.capacity).toFixed(2);
                              const FIT = Number(e.fit).toFixed(2);

                              const workingDays =
                                VacationCoefficient.getWorkingDays();
                              const vacationWorkingDays =
                                VacationCoefficient.getVacationWorkingDays_byEmployeeId(
                                  employeeId,
                                );
                              const vacationCoefficient =
                                (workingDays - vacationWorkingDays) /
                                workingDays;

                              const EFFECTIVE = Number(
                                e.capacity * e.fit * vacationCoefficient,
                              ).toFixed(3);
                              const VACATION_DAYS =
                                Storage.getVacationDays_byEmployeeId(
                                  employeeId,
                                );

                              const TITLE_VACATION = [
                                VACATION_DAYS.join(", "),
                                `workingDays = count of weekdays in month`,
                                `vacationWorkingDays = count of vacation days that are weekdays`,
                                `vacationCoefficient = (workingDays - vacationWorkingDays) / workingDays`,
                                ``,
                                `workingDays = ${workingDays}`,
                                `vacationWorkingDays = ${vacationWorkingDays}`,
                                `vacationCoefficient = (${workingDays} - ${vacationWorkingDays}) / ${workingDays} =`,
                                ` = ${vacationCoefficient}`,
                              ]
                                .join("\n")
                                .replace(/"/g, `'`);

                              const TITLE_EFFECTIVE = [
                                "EFFECTIVE = CAPACITY * FIT * vacationCoefficient",
                                `EFFECTIVE = ${e.capacity} * ${e.fit} * ${vacationCoefficient} =`,
                                `= ${EFFECTIVE}`,
                              ]
                                .join("\n")
                                .replace(/"/g, `'`);

                              const EMPLOYEE_COST = Number(
                                EMPLOYEE.salary * Math.max(0.5, e.capacity),
                              ).toFixed(2);

                              const TITLE_EMPLOYEE_COST = [
                                "employeeCost = salary × max(0.5, assignedCapacity)",
                                `employeeCost = ${EMPLOYEE.salary} * max(0.5 ; ${e.capacity}) =`,
                                `= ${EMPLOYEE_COST}`,
                              ]
                                .join("\n")
                                .replace(/"/g, `'`);

                              const usedEffectiveCapacity =
                                Storage.getSumUsedEffectiveCapacity_forProjectId(
                                  e.projectId,
                                );
                              const PROJECT = Storage.getProject_byId(
                                e.projectId,
                              );
                              const capacityForRevenue = Math.max(
                                PROJECT.employeeCapacity,
                                usedEffectiveCapacity,
                              );

                              const budget = PROJECT.budget;

                              const revenuePerEffectiveCapacity =
                                budget / capacityForRevenue;

                              const revenue = Number(
                                revenuePerEffectiveCapacity,
                              ).toFixed(2);

                              const employeeRevenue = Number(
                                revenuePerEffectiveCapacity * EFFECTIVE,
                              ).toFixed(2);

                              const profit = revenue - EMPLOYEE_COST;
                              const PROFIT = Number(profit).toFixed(2);

                              const TITLE_REVUNUE = [
                                `usedEffectiveCapacity = sum of all employees' effective capacities`,
                                `usedEffectiveCapacity = ${usedEffectiveCapacity}`,
                                ``,
                                `capacityForRevenue = max(projectCapacity, usedEffectiveCapacity)`,
                                `capacityForRevenue = max(${e.capacity}, ${usedEffectiveCapacity})`,
                                `capacityForRevenue = ${capacityForRevenue}`,
                                ``,
                                `revenuePerEffectiveCapacity = budget / capacityForRevenue`,
                                `revenuePerEffectiveCapacity = ${budget} / ${capacityForRevenue}`,
                                ``,
                                `employeeRevenue = revenuePerEffectiveCapacity × employeeEffectiveCapacity`,
                                `employeeRevenue = ${revenuePerEffectiveCapacity} × ${EFFECTIVE}`,
                                ``,
                                `profit = revenue - cost`,
                                `profit = ${revenue} - ${EMPLOYEE_COST}`,
                              ]
                                .join("\n")
                                .replace(/"/g, `'`);

                              return `
                                    <tr>
                                        <td>${PROJECT_NAME}</td>
                                        <td>${CAPACITY}</td>
                                        <td>${FIT}</td>
                                        <td title="${TITLE_VACATION}">${VACATION_DAYS.length} days</td>
                                        <td title="${TITLE_EFFECTIVE}">${EFFECTIVE}</td>
                                        <td title="${TITLE_REVUNUE}">${revenue}</td>
                                        <td title="${TITLE_EMPLOYEE_COST}">${EMPLOYEE_COST}</td>
                                        <td title="${TITLE_REVUNUE}">${PROFIT}</td>
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
