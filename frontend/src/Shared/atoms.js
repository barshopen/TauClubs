import { atom } from 'recoil';

const newUserData = atom({
  key: 'newUserData', // unique ID (with respect to other atoms/selectors)
  default: {}, // default value (aka initial value)
});

/* This atom will hold the current user data */
const currentUser = atom({ key: 'currentUser', default: null });

const showSideBarMobileState = atom({
  key: 'showSideBarMobileState', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

const selectedOptionState = atom({ key: 'selectedOptionState', default: '' });

export {
  newUserData,
  currentUser,
  selectedOptionState,
  showSideBarMobileState,
};
