class Storage {
  static localStorageKey = "dashboard_json";

  static addProject_byData(data) {
    const PERIOD = Period.getPeriod();
    console.log("Project added", PERIOD, data);

    const STRING_JSON = localStorage.getItem(this.localStorageKey);
    let object = JSON.parse(STRING_JSON);
    if (object === null) {
      object = {};
    }

    if (!(PERIOD in object)) {
      object[PERIOD] = {};
    }

    if (!("projects" in object[PERIOD])) {
      object[PERIOD]["projects"] = [];
    }

    object[PERIOD]["projects"].push(data);

    localStorage.setItem(this.localStorageKey, JSON.stringify(object));
  }

  static addEmployee_byData(data) {
    const PERIOD = Period.getPeriod();
    console.log("Employee added", PERIOD, data);

    const STRING_JSON = localStorage.getItem(this.localStorageKey);
    let object = JSON.parse(STRING_JSON);
    if (object === null) {
      object = {};
    }

    if (!(PERIOD in object)) {
      object[PERIOD] = {};
    }

    if (!("employees" in object[PERIOD])) {
      object[PERIOD]["employees"] = [];
    }

    object[PERIOD]["employees"].push(data);

    localStorage.setItem(this.localStorageKey, JSON.stringify(object));
  }
}
