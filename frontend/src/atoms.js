import { atom } from 'recoil';

const newUserData = atom({
  key: 'newUserData', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

const x = atom({
  key: 'userJoinState', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export { newUserData, x };
