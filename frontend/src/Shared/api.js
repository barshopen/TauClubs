import { get, post } from './HTTP';

// const postApi = (route, data) =>
//   fetch(route, {
//     headers: {
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     method: 'POST',
//     body: JSON.stringify(data),
//   }).then(res => res.json());

// export const createClub = data => postApi('/db/create_club', data);
// export const joinClub = data => postApi('/db/join_club', data);
// export const leaveClub = data => postApi('/db/leave_club', data);

export const createClub = data => post('/db/create_club', data);

export const joinClub = data => post('/db/join_club', data);

export const leaveClub = data => post('/db/leave_club', data);

export const getDb = (subroute, id) =>
  id ? get(`/db/${subroute}/${id}`) : get(`/db/${subroute}`);

export const getAuth = subroute => get(`/auth/${subroute}`);

export const getMessages = (clubId = null) => getDb('messages', clubId);

// export const getMessage = (clubId = null, messageId = null) => getDb('messages', clubId);

export const getClub = clubId => getDb('club', clubId);

export const getClubs = () => getDb('clubs');

export const getMyClubs = () => getDb('my_clubs');

export const getUpcomingEvents = (eventId = null) =>
  getDb('upcoming_events', eventId);

export const whoami = () => getAuth('whoami');

export const getFeedData = (currentTab = 'all') => {
  if (currentTab === 'messages') {
    return getMessages();
  }
  if (currentTab === 'events') {
    return getUpcomingEvents();
  }
  return Promise.all([
    getUpcomingEvents(),
    getMessages(),
  ]).then(([upcomingEvents, messages]) => upcomingEvents.concat(messages));
};

export const logOut = () => get('/auth/logout');

export const createNewMessgae = ({ payload }) =>
  post(`/db/club/create_message`, payload);

export const createNewEvent = ({ payload }) =>
  post(`/db/club/create_event`, payload);
