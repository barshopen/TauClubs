const getApi = route =>
  fetch(route, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());

export const getDb = (subroute, id) =>
  id ? getApi(`/db/${subroute}/${id}`) : getApi(`/db/${subroute}`);

export const getMessages = (messageId = null) => getDb('messages', messageId);

export const getClubs = (clubId = null) => getDb('clubs', clubId);

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
