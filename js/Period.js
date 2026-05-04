class Period {
  static id_input = "period";

  static setCurrentPeriod() {
    const NOW = new Date();
    const YYYY = NOW.getFullYear();
    const MM = `${NOW.getMonth() + 1}`.padStart(2, "0");

    const INPUT = document.getElementById(this.id_input);
    if (!INPUT) {
      console.error(`Node is not found: #${this.id_input}`);
      alert(`Node is not found: #${this.id_input}`);
      return;
    }

    INPUT.value = `${YYYY}-${MM}`;
    Employee.renderContent();
  }

  static getPeriod() {
    const INPUT = document.getElementById(this.id_input);
    if (!INPUT) {
      console.error(`Node is not found: #${this.id_input}`);
      alert(`Node is not found: #${this.id_input}`);
      throw new Error(`Node is not found: #${this.id_input}`);
    }

    if (`${INPUT.value}`.length < 7) {
      throw new Error(`Period is not valid`);
    }

    const ARR = `${INPUT.value}`.split("-");
    const YYYY = ARR[0];
    const M = ARR[1] - 1;

    return `${YYYY}-${M}`;
  }
}
