const managmentReducers = (state = { tasks: [] }, action) => {
  if (action.type === "SELECT_PROJECT") {
    return {
      ...state,
      selectedProject: action.payload,
    };
  } else if (action.type === "LOAD_CREATED_TASKS") {
    return {
      ...state,
      tasks: action.payload.tasks,
      itemsFromBackend: action.payload.itemsFromBackend,
    };
  } else if (action.type === "STARTED_SPRINT") {
    return {
      ...state,
      sprint: action.payload,
    };
  } else if (action.type === "LOAD_SPRINT") {
    return {
      ...state,
      sprint: action.payload,
    };
  } else if (action.type === "FETCH_PROJECT") {
    return {
      ...state,
      projectData: action.payload,
    };
  } else {
    return state;
  }
};

export default managmentReducers;
