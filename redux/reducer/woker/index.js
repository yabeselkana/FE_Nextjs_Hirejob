const initialState = {
  worker: [],
  detailWorker: [],
};

export const workerReducer = (state = initialState, action) => {
  if (action.type === "GET_ALL_WORKERS") {
    return {
      ...state,
      worker: action.payload,
      isLoading: false,
    };
  } else if (action.type === "UPDATE_WORKER") {
    return state;
  } else if (action.type === "GET_DETAIL_WORKER") {
    return {
      ...state,
      detailWorker: action.payload,
      isLoading: false,
    };
  } else {
    return state;
  }
};
