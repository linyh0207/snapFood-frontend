const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return [...action.posts];

    default:
      throw new Error();
  }
};

export default reducer;
