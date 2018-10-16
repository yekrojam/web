/**
 * Basic session reducer.
 * Not used on client since data always comes from the server.
 */
export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
