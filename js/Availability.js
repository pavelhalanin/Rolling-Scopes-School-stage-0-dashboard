class Availability {
  static id_modal = "availability_modal";

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

      const ARR = this.getArray();
      const VACATION_DAYS = Storage.getVacationDays_byEmployeeId(employeeId);

      DIALOG.innerHTML = /* html */ `
        <header>
          <h2>Availability</h2>
          <button class="btn btn-danger" onclick="${this.name}.close()">x</button>
        </header>
        <div>
          <div class="alert alert-info">
            <p>Тут можно выбрать отпуск сотруднику (id = ${employeeId})</p>
            <p>Шесть дней трудись и делай всю свою работу, но седьмой день - это суббота Господу, твоему Богу (Исход 20:11)</p>
            <p>Заниматься делами следует шесть дней, а седьмой - это суббота покоя, святыня Господня (Исход 31:5)</p>
          </div>
          <form class="availability_month_days">
            <input type="hidden" name="employeeId" value="${employeeId}" >
            <div class="availability_month_days__item">SUN</div>
            <div class="availability_month_days__item">MON</div>
            <div class="availability_month_days__item">TUE</div>
            <div class="availability_month_days__item">WED</div>
            <div class="availability_month_days__item">THU</div>
            <div class="availability_month_days__item">FRI</div>
            <div class="availability_month_days__item">SAT</div>
            ${ARR.map((e) => {
              const TITLE = [
                `Год: ${e.year}`,
                `Месяц: ${e.month}`,
                `День: ${e.date}`,
                `День недели: ${e.day}`,
              ]
                .join("\n")
                .replace(/"/g, `'`);

              const ID_CHECKBOX = `${this.id_modal}_checkbox_${e.year}_${e.month}_${e.date}`;
              let isCheked =
                e.isCurrentPeriod && VACATION_DAYS.includes(e.date);

              return `
                <div
                  title="${TITLE}"
                  class="availability_month_days__item"
                  data-day-index="${e.day_index}"
                  data-is-current-period="${e.isCurrentPeriod ? "true" : "false"}"
                >
                  <input
                    type="checkbox"
                    name="vacationDays[${e.date}]"
                    value="${e.date}"
                    id="${ID_CHECKBOX}"
                    onchange="Availability.changeWorkingDays_byEmployeeId('${employeeId}')"
                    ${isCheked ? "checked" : ""}
                  >
                  <label ${e.isCurrentPeriod ? `for="${ID_CHECKBOX}"` : ""}>${e.date}</label>
                </div>
              `;
            }).join("")}
          </form>
          <div align="right">
            <button class="btn btn-success" onclick="${this.name}.addVacationDays()">Set vacation</button>
          </div>
          <div id="working_days" class="alert alert-success" align="center">
            
          </div>
        </div>
      `;
      document.body.appendChild(DIALOG);

      this.changeWorkingDays_byEmployeeId(employeeId);

      DIALOG.showModal();
    } catch (exception) {
      console.error(exception);
      alert(exception);
    }
  }

  static changeWorkingDays_byEmployeeId(employeeId) {
    try {
      console.log(`changeWorkingDays_byEmployeeId(${employeeId})`);
      const workingDays = VacationCoefficient.getWorkingDays();
      const vacationWorkingDays =
        VacationCoefficient.getVacationWorkingDays_byEmployeeId(employeeId);

      const DIV = document.getElementById("working_days");
      if (!DIV) {
        console.error(`Не найден узел: #working_days`);
        return;
      }

      const RESULT = `${workingDays - vacationWorkingDays}/${workingDays}`;
      console.log(`changeWorkingDays_byEmployeeId(${employeeId}) => ${RESULT}`);

      DIV.innerHTML = `Working Days: ${workingDays - vacationWorkingDays}/${workingDays} days`;
    } catch (exception) {
      console.error(exception);
    }
  }

  static getArray() {
    const PERIOD = Period.getPeriod();
    const PERIOD_ARR = `${PERIOD}`.split("-");
    const YEAR = PERIOD_ARR[0];
    const MONTH_INDEX = PERIOD_ARR[1];

    const DATE = new Date(YEAR, MONTH_INDEX, 1);

    const DAYS_ARRAY = [];

    while (DATE.getMonth() == MONTH_INDEX) {
      DAYS_ARRAY.push({
        year: DATE.getFullYear(),
        month_index: DATE.getMonth(),
        month: DATE.getMonth() + 1, // 1-12
        date: DATE.getDate(),
        day_index: DATE.getDay(),
        day: DATE.toLocaleDateString("en-US", {
          weekday: "short",
        }).toUpperCase(),
        isCurrentPeriod: true,
      });
      DATE.setDate(DATE.getDate() + 1);
    }

    while (DATE.getDay() !== 0) {
      DAYS_ARRAY.push({
        year: DATE.getFullYear(),
        month_index: DATE.getMonth(),
        month: DATE.getMonth() + 1, // 1-12
        date: DATE.getDate(),
        day_index: DATE.getDay(),
        day: DATE.toLocaleDateString("en-US", {
          weekday: "short",
        }).toUpperCase(),
        isCurrentPeriod: false,
      });
      DATE.setDate(DATE.getDate() + 1);
    }

    const DATE2 = new Date(YEAR, MONTH_INDEX, 1);

    while (DATE2.getDay() !== 0) {
      DATE2.setDate(DATE2.getDate() - 1);

      DAYS_ARRAY.unshift({
        year: DATE2.getFullYear(),
        month_index: DATE2.getMonth(),
        month: DATE2.getMonth() + 1, // 1-12
        date: DATE2.getDate(),
        day_index: DATE2.getDay(),
        day: DATE2.toLocaleDateString("en-US", {
          weekday: "short",
        }).toUpperCase(),
        isCurrentPeriod: false,
      });
    }

    return DAYS_ARRAY;
  }

  static addVacationDays() {
    try {
      const DIV = document.getElementById(Availability.id_modal);
      if (!DIV) {
        console.error(`Node is not found: #${Availability.id_modal}`);
        return;
      }

      const FORM = DIV.querySelector("form");
      if (!FORM) {
        console.error(`Node is not found: #${Availability.id_modal} form`);
        return;
      }

      const FORM_DATA = new FormData(FORM);

      const OBJECT = {};
      for (let [name, value] of FORM_DATA.entries()) {
        OBJECT[name] = value;
      }

      const KEYS = Object.keys(OBJECT);
      const VACATION_DAYS = [];
      for (let i = 0; i < KEYS.length; i += 1) {
        if (`${KEYS[i]}`.startsWith("vacationDays")) {
          VACATION_DAYS.push(Number(OBJECT[KEYS[i]]));
        }
      }

      Storage.addVacationDays_byEmployeeIdAndVacationDays(
        OBJECT.employeeId,
        VACATION_DAYS,
      );
      Availability.changeWorkingDays_byEmployeeId(OBJECT.employeeId);
    } catch (exception) {
      alert(exception);
    }
  }
}
