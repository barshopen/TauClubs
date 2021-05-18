const getApi = route =>
  fetch(route, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());

const postApi = (route, data) =>
  fetch(route, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  }).then(res => res.json());

export const createClub = data => postApi('/db/create_club', data);
export const joinClub = data => postApi('/db/join_club', data);
export const leaveClub = data => postApi('/db/leave_club', data);

export const getDb = (subroute, id) =>
  id ? getApi(`/db/${subroute}/${id}`) : getApi(`/db/${subroute}`);

export const getAuth = subroute => getApi(`/auth/${subroute}`);

export const getMessages = (messageId = null) => getDb('messages', messageId);

export const getClub = (clubId = null) => getDb('club', clubId);

export const getClubs = (clubId = null) => getDb('clubs', clubId);

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

export const logOut = () => getApi('/auth/logout');
