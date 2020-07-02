/* eslint-disable no-case-declarations */
/* eslint-disable no-plusplus */
const findPostIndex = (state, id) => {
  let i = 0;
  while (i < state.length) {
    if (state[i].id === id) {
      return i;
    }
    i++;
  }
  return -1;
};
const updatePostWhenLiked = (posts, id, liked) => {
  const postIndex = findPostIndex(posts, id);
  const post = posts[postIndex];
  console.log('before update like post', post);

  const prevUserLikedPost = post.userLikedPost;
  post.userLikedPost = liked;

  // user cannot like and dislike at the same time, and adjustment needed if that's the case
  if (post.userLikedPost) {
    const prevUserDislikedPost = post.userDislikedPost;
    post.userDislikedPost = false;
    if (prevUserDislikedPost && !post.userDislikedPost) {
      post.dislikes--;
    }
    if (!prevUserDislikedPost && post.userDislikedPost) {
      post.dislikes++;
    }
  }
  // to keep the counter accurate, need to account for previous action from user
  // case 1: user liked (true) then to neutral (false), then need to decrease likes by 1 to match neutral status
  if (prevUserLikedPost && !post.userLikedPost) {
    post.likes--;
  }
  // case 2: user neutral(false) then to liked (true), then need to increase likes by 1
  if (!prevUserLikedPost && post.userLikedPost) {
    post.likes++;
  }
  console.log('after update like post', post);

  posts.splice(postIndex, 1, post);
  return [...posts];
};

const updatePostWhenDisliked = (posts, id, disliked) => {
  const postIndex = findPostIndex(posts, id);
  const post = posts[postIndex];
  console.log('before update dislike post', post);
  const prevUserDislikedPost = post.userDislikedPost;
  post.userDislikedPost = disliked;

  // user cannot like and dislike at the same time, and adjustment needed if that's the case
  if (post.userDislikedPost) {
    const prevUserLikedPost = post.userLikedPost;
    post.userLikedPost = false;
    if (prevUserLikedPost && !post.userLikedPost) {
      post.likes--;
    }
    if (!prevUserLikedPost && post.userLikedPost) {
      post.likes++;
    }
  }
  // to keep the counter accurate, need to account for previous action from user
  // case 1: user disliked (true) then to neutral (false), then need to decrease dislikes by 1 to match neutral status (prev +1, now -1)
  if (prevUserDislikedPost && !post.userDislikedPost) {
    post.dislikes--;
  }
  // case 2: user neutral(false) then to liked (true), then need to increase dislikes by 1
  if (!prevUserDislikedPost && post.userDislikedPost) {
    post.dislikes++;
  }
  console.log('after update dislike post', post);

  posts.splice(postIndex, 1, post);
  return [...posts];
};
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return action.posts;
    case 'UPDATE_LIKE':
      return updatePostWhenLiked(state, action.id, action.liked);
    case 'UPDATE_DISLIKE':
      return updatePostWhenDisliked(state, action.id, action.disliked);
    default:
      throw new Error();
  }
};

export default reducer;
