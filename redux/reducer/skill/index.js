const initialState = {
  skills: [],
};

export const skillsReducer = (state = initialState, action) => {
  if (action.type === "GET_SKILL_BY_USER") {
    return {
      ...state,
      skills: action.payload,
      isLoading: false,
    };
  } else if (action.type === "CREATE_SKILL") {
    return state;
  } else {
    return state;
  }
};
