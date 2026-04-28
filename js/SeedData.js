class SeedData {
  static id_modal = "seed_modal";

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

  static open() {
    try {
      document.querySelectorAll(`#${this.id_modal}`).forEach((e) => e.remove());
      const DIALOG = document.createElement("dialog");
      DIALOG.setAttribute("id", `${this.id_modal}`);
      DIALOG.classList.add("modal_wrapper");

      const SEED_DATA_ARRAY = Storage.getSeedData();

      DIALOG.innerHTML = /* html */ `
        <header class="bg-dark">
          <h2>Seed</h2>
          <button class="btn btn-danger" onclick="${this.name}.close()">x</button>
        </header>
        <div>
          <div class="alert bg-info">
            Тут можно скопировать данные определного месяца в выбранный период
          </div>

          <table class="table bordered">
            <thead class="bg-dark">
              <tr>
                  <th>Year</th>
                  <th>Month</th>
                  <th>Projects</th>
                  <th>Employees</th>
                  <th>Total Est. Income</th>
                  <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${SEED_DATA_ARRAY.map((e) => {
                return `
                    <tr>
                      <td>${e.year}</td>
                      <td>${e.MONTH_TEXT}</td>
                      <td>${e.projects_count}</td>
                      <td>${e.employees_count}</td>
                      <td>${e.total}</td>
                      <td>
                        <button class="btn btn-success" onclick="alert('nothing')">Seed</button>
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
}
