const { NativeModules } = require('react-native');

const deconstructLike = (liked) => {
  const desconstructedObj = { liked: false, notLiked: false };
  if (liked === null) return desconstructedObj;
  if (liked) {
    desconstructedObj.liked = true;
  } else {
    desconstructedObj.notLiked = true;
  }
  return desconstructedObj;
};

module.exports = deconstructLike;
