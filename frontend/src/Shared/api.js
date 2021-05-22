import { get, post } from './HTTP';

export const getDb = (subroute, id) =>
  id ? get(`/db/${subroute}/${id}`) : get(`/db/${subroute}`);

export const createClub = data => post('/db/create_club', data);

export const joinClub = data => post('/db/join_club', data);

export const leaveClub = data => post('/db/leave_club', data);

export const whoami = () => get(`/auth/whoami`);

export const getMessages = (clubId = null) => getDb('messages', clubId);

// export const getMessage = (clubId = null, messageId = null) => getDb('messages', clubId);

export const getClub = clubId => getDb('club', clubId);

export const getClubs = ({ name, tag }) => {
  if (name && tag) {
    return getDb(`/clubs?name=${name}&tag=${tag}`);
  }
  if (name) {
    return getDb(`/clubs?name=${name}`);
  }
  if (tag) {
    return getDb(`/clubs?tag=${tag}`);
  }
  return getDb(`/clubs`);
};

export const getMyClubs = () => getDb('my_clubs');

export const getUpcomingEvents = (eventId = null) =>
  getDb('upcoming_events', eventId);

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

export const isUserManager = () => get('/isManager');

export const getDashboardData = () => get('dashboard/data');

// example queries:
// * {mainroute}/clubs -> returns all clubs
// * {mainroute}/clubs?tag=Math -> returns all clubs that have a 'Math' tag
// * {mainroute}/clubs?name=Foodies -> returns all club that their name containes
//     foodies
// * {mainroute}/clubs?name=Foodies&tag=Math -> returns all club that their name
//     containes foodies OR have a 'Math' tag
// """

// export const searchClubs = (name = null, tag = null) =>
//   get('/clubs', { name, tag });
