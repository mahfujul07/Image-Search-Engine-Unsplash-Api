const INITIAL_STATE = {
  images: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SEARCH":
      return {
        images: [...state.images, ...action.payload],
      };
    case "RESET":
      return { images: [] };
    default:
      return state;
  }
};

export default searchReducer;
