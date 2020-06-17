import deconstructLike from './deconstructLike';

test('null returns liked false and notLiked false', () => {
  expect(deconstructLike(null)).toEqual({ liked: false, notLiked: false });
});

test('liked returns liked true and notLiked false', () => {
  expect(deconstructLike(true)).toEqual({ liked: true, notLiked: false });
});

test('not liked returns liked false and notLiked true', () => {
  expect(deconstructLike(false)).toEqual({ liked: false, notLiked: true });
});
