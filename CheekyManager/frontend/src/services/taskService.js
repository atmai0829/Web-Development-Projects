export const getTasks = async () => {
  const response = await fetch(`/api/users/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status != 200) {
    throw new Error("Failed to get tasks");
  }
  return await response.json();
};

export const getCompletedTasks = async (id) => {
  const response = await fetch(`/api/users/${id}/tasks/completed`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if(response.status != 200) {
    throw new Error("Failed to get tasks");
  }
  return await response.json();
}

export const createTasks = async (taskData) => {
  const response = await fetch(`/api/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
};

export const deleteTask = async (id) => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return response.json;
};

export const editTask = async (task) => {
  const response = await fetch(`/api/tasks/${task.task_id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to edit task");
  }
  return response.json;
};
