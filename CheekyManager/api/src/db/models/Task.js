const crypto = require("crypto");

module.exports = class Task {
  id = null;
  user_id = null;
  name = null;
  due = null;
  status = null;
  priority = null;

  constructor(data) {
    this.id = data.task_id;
    this.user_id = data.usr_id;
    this.name = data.task_name;
    this.due = data.task_due;
    this.status = data.task_status;
    this.priority = data.task_priority;
  }

  toJSON() {
    return {
      id: this.id,
      user_id: this.user_id,
      name: this.name,
      due: this.due,
      status: this.status,
      priority: this.priority,
    };
  }
};
