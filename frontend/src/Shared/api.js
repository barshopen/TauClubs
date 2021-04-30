function getApi(route) {
  return fetch(route, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  }).then(res => res.json());
}

function getDb(subroute, id) {
  if (id) return getApi(`/db/${subroute}/${id}`);
  return getApi(`/db/${subroute}`);
}

export function getMessages(messageId = null) {
  return getDb('messages', messageId);
}
export function getClubs(clubId = null) {
  return getDb('clubs', clubId);
}
export function getUpcomingEvents(eventId = null) {
  return getDb('upcoming_events', eventId);
}
