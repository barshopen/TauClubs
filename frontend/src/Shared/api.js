import { get, post, postClub } from './HTTP';

export const getDb = (subroute, id) =>
  id ? get(`/db/${subroute}/${id}`) : get(`/db/${subroute}`);

export const createClub = data => postClub('/db/create_club', data);

export const addImage = (clubId, data) =>
  postClub(`db/club/add_image/${clubId}`, data);

export const joinClub = data => post('/db/join_club', data);

export const leaveClub = data => post('/db/leave_club', data);

export const interested = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/interested`);

export const attend = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/attend`);

export const uninterested = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/uninterested`);

export const unattend = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/unattend`);

export const whoami = () => get(`/auth/whoami`);

export const getMessagesByClub = (clubId = null) =>
  getDb(`club/${clubId}/messages/get_messages`);

export const getMessages = () => getDb('messages');

export const getUpcomingEvents = () => getDb('upcoming_events');

export const getUpcomingEventsByClub = (clubId = null) =>
  getDb(`club/${clubId}/events/get_events`);

// export const getMessage = (clubId = null, messageId = null) => getDb('messages', clubId);

export const getClub = clubId => getDb('club', clubId);

export const getClubs = ({ name, tag }) => {
  if (name && tag) {
    return getDb(`clubs?name=${name}&tag=${tag}`);
  }
  if (name) {
    return getDb(`clubs?name=${name}`);
  }
  if (tag) {
    return getDb(`/clubs?tag=${tag}`);
  }
  return getDb(`clubs`);
};

export const getMyClubs = () => getDb('my_clubs');

export const getFeedData = () =>
  Promise.all([
    getUpcomingEvents(),
    getMessages(),
  ]).then(([upcomingEvents, messages]) => upcomingEvents.concat(messages));

export const logOut = () => get('/auth/logout');

export const createNewMessgae = ({ payload }) =>
  post(`/db/club/create_message`, payload);

export const updateEvent = ({ payload }) => post(`/club/event/update`, payload);

export const createNewEvent = ({ payload }) =>
  post(`/db/club/create_event`, payload);

export const isUserManager = () => get('/isManager');

export const getDashboardData = () => get('dashboard/data');
