import { get, post } from './HTTP';

export const getDb = (subroute, id) =>
  id ? get(`/db/${subroute}/${id}`) : get(`/db/${subroute}`);

export const getAuth = subroute => get(`/auth/${subroute}`);

export const getMessages = (clubId = null) => getDb('messages', clubId);

// export const getMessage = (clubId = null, messageId = null) => getDb('messages', clubId);

export const getClubs = (clubId = null) => getDb('clubs', clubId);

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
  post(`/clubs/create_message`, payload);
