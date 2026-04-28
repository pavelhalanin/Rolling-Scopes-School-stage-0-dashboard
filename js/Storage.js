class Storage {
  static localStorageKey = "dashboard_json";

  static getId() {
    return new Date().getTime();
  }

  static addProject_byData(data) {
    const PERIOD = Period.getPeriod();

    data.id = this.getId();

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

  static getProjects() {
    const PERIOD = Period.getPeriod();

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

    return object[PERIOD]["projects"];
  }

  static addEmployee_byData(data) {
    const PERIOD = Period.getPeriod();

    data.id = this.getId();

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

  static getEmployees() {
    const PERIOD = Period.getPeriod();

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

    return object[PERIOD]["employees"];
  }

  static addAssigment_byDataAndEmployeeId(data, employeeId) {
    const PERIOD = Period.getPeriod();

    console.log("Assigment added", PERIOD, data, employeeId);

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

    for (let i = 0; i < object[PERIOD]["employees"].length; i++) {
      if (object[PERIOD]["employees"][i].id === employeeId) {
        if (!("assignments" in object[PERIOD]["employees"][i])) {
          object[PERIOD]["employees"][i]["assignments"] = [];
        }

        object[PERIOD]["employees"][i]["assignments"].push(data);
        localStorage.setItem(this.localStorageKey, JSON.stringify(object));
        return;
      }
    }
  }

  static getEmployeesAssigments_byEmployeeId(employeeId) {
    const PERIOD = Period.getPeriod();

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

    for (let i = 0; i < object[PERIOD]["employees"].length; i += 1) {
      if (object[PERIOD]["employees"][i].id == employeeId) {
        if (!("assignments" in object[PERIOD]["employees"][i])) {
          object[PERIOD]["employees"][i]["assignments"] = [];
        }

        return object[PERIOD]["employees"][i]["assignments"];
      }
    }

    return [];
  }
}
