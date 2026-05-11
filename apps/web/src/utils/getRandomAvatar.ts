/**
 * 아바타 이미지 경로를 랜덤 반환
 * @returns {string} 랜덤 아바타 이미지 경로
 */
export const getRandomAvatar = () => {
  const AVATAR_COUNT = 10;
  const randomNumber = Math.floor(Math.random() * AVATAR_COUNT) + 1;

  return `/assets/avatar/${randomNumber}.png`;
};
