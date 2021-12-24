import React from "react";
import Axios from "axios";
import { Label, Icon } from "semantic-ui-react";

export const saveToken = (adminToken, centralToken) => (dispatch) => {
  console.log("Saved token");

  dispatch({ type: "SAVE_TOKEN", payload: { adminToken, centralToken } });
};

export const login = (logged, user) => (dispatch) => {
  console.log("isLogged: ", user);

  dispatch({ type: "LOGGED_IN", payload: { logged, user } });
};

export const selectCurrentProject = (project) => (dispatch) => {
  console.log("Selected project is: ", project);

  dispatch({ type: "SELECT_PROJECT", payload: project });
};

export const fetchProjectData = (projectName, token) => (dispatch) => {
  Axios.get(
    `${window.ENVIRONMENT.AGILE_ADMINISTRATOR}/v1/projects/getProject`,
    {
      params: {
        projectName,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => dispatch({ type: "FETCH_PROJECT", payload: res.data }))
    .catch((err) => console.log(err));
};

export const loadCreatedTasks = (selectedProject, token) => (dispatch) => {
  const tasks = [];

  const itemsFromBackend = [];

  Axios.get(`${window.ENVIRONMENT.AGILE_CENTRAL}/v1/tasks/getTaskByProject`, {
    params: {
      projectName: selectedProject,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.data.map((task) => {
        tasks.push({ id: task.dndId, content: task });
        itemsFromBackend.push({
          id: task.dndId,
          content: (
            <div>
              <Label color="blue" basic style={{ marginRight: "1vw" }}>
                {task.keyword}
              </Label>
              {task.name}
              <Icon name="user" style={{ marginLeft: "1.5vw" }} />
            </div>
          ),
        });
      });
    })
    .catch((err) => console.log(err));

  dispatch({
    type: "LOAD_CREATED_TASKS",
    payload: { tasks, itemsFromBackend },
  });
};

export const loadStartedSprint = (projectName, token) => (dispatch) => {
  const sprintItems = [];

  Axios.get(`${window.ENVIRONMENT.AGILE_CENTRAL}/v1/sprints/getSprint`, {
    params: {
      projectName,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      res.data.tasks.map((task) => {
        console.log(task);
        sprintItems.push({
          metadata: task,
          id: task.dndId,
          content: (
            <div>
              <Label color="blue" basic style={{ marginRight: "1vw" }}>
                {task.keyword}
              </Label>
              {task.name}
              <Icon name="user" style={{ marginLeft: "1.5vw" }} />
            </div>
          ),
        });
      });

      dispatch({
        type: "LOAD_SPRINT",
        payload: {
          name: res.data.name,
          from: res.data.from,
          to: res.data.to,
          projectName: res.data.projectName,
          tasks: sprintItems,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOAD_SPRINT",
        payload: undefined,
      });
    });
};

export const setStartedSprint = (sprint) => (dispatch) => {
  dispatch({ type: "STARTED_SPRINT", payload: sprint });
};
