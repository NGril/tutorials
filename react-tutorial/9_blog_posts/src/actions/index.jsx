import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

// instead of making an API call for each user we are first filtering the unique users
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  // we need to make sure to dispatch the result of fetchPosts (action creator nesting), also await is needed
  await dispatch(fetchPosts());

  // lodash version of the array .map function and the uniq
  const userIds = _.uniq(_.map(getState().posts, "userId"));
  userIds.forEach((id) => dispatch(fetchUser(id)));

  // ALTERNATIVE LODASH SYNTAX FOR THE 2 LINES OF CODE ABOVE - FUNCTIONAL PROGRAMMING
  // _.chain(getState().posts)
  //   .map("userId")
  //   .uniq()
  //   .forEach((id) => dispatch(fetchUser(id)))
  //   .value();
};

export const fetchPosts = () => async (dispatch) => {
  // BAD APPROACH is to fetch data from this function directly - the error with actions having to return simple objects and using middleware, README.md #16, we need to return a function instaed
  //   const response = await jsonPlaceholder.get("/posts");

  const response = await jsonPlaceholder.get("/posts");
  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`users/${id}`);
  dispatch({ type: "FETCH_USER", payload: response.data });
};

// // MEMOIZE EXAMPLE
// export const fetchUser = (id) => (dispatch) => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`users/${id}`);
//   dispatch({ type: "FETCH_USER", payload: response.data });
// });
