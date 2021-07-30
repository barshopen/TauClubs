import { get, post, postClub } from './HTTP';

export const getDb = (subroute, id) =>
  id ? get(`/db/${subroute}/${id}`) : get(`/db/${subroute}`);

export const createClub = data => postClub('/db/create_club', data);
export const editClub = data => postClub(`/db/club/edit`, data);
export const joinClub = data => post('/db/join_club', data);

export const leaveClub = data => post('/db/leave_club', data);

export const interested = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/interested`);

export const attend = (clubId, eventId) =>
  getDb(`club/${clubId}/messages/${eventId}/attend`);

export const uninterested = (clubId, eventId) =>
  getDb(`club/${clubId}/events/${eventId}/uninterested`);

export const unattend = (clubId, eventId) =>
  getDb(`club/${clubId}/events/${eventId}/unattend`);

export const whoami = () => get(`/auth/whoami`);

export const getMessagesByClub = (clubId = null) =>
  getDb(`club/${clubId}/messages/get_messages`);

export const getMessages = () => getDb('messages');

export const getUpcomingEvents = () => getDb('upcoming_events');

export const getAll = () => getDb('default_clubs');

export const getUpcomingEventsByClub = (clubId = null) =>
  getDb(`club/${clubId}/events/get_events`);

// export const getMessage = (clubId = null, messageId = null) => getDb('messages', clubId);

export const getClub = clubId => getDb('club', clubId);

export const getClubs = ({ search }) => {
  if (search) {
    return getDb(`clubs?search=${search}`);
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

export const updateEvent = ({ payload }) =>
  post(`/db/club/event/update`, payload);

export const updateMessage = ({ payload }) =>
  post(`/db/club/message/update`, payload);

export const deleteMessage = ({ payload }) =>
  post(`/db/club/message/delete`, payload);

export const deleteEvent = ({ payload }) =>
  post(`/db/club/event/delete`, payload);

export const deleteClub = ({ payload }) => post(`/db/club/delete`, payload);

export const approveUserToClub = payload => post(`/db/approve_user`, payload);
export const approveUserUsers = payload => post(`/db/approve`, payload);
export const unapproveUserUsers = payload => post(`/db/unapprove`, payload);

export const createNewEvent = ({ payload }) =>
  post(`/db/club/create_event`, payload);

export const isUserManager = () => get('/dashboard/isManager');

export const addImage = data => postClub(`/db/club/add_image`, data);

export const getDashboardData = () => get('/dashboard/data');

export const updateUserData = data => post('/db/updateuser', data);

export const sendMailToClub = data => post('/db/contactus', data);
