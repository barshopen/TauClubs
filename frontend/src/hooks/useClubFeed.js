import { useQuery } from 'react-query';
import { getMessagesByClub, getUpcomingEventsByClub } from '../Shared/api';

const fetchMessages = async clubId => {
  const res = await getMessagesByClub(clubId);
  return res;
};

const fetchEvents = async clubId => {
  const res = await getUpcomingEventsByClub(clubId);
  return res;
};

const useClubFeed = ({ clubId }) => {
  const storeKeyMessages = ['messages', clubId];
  const storeKeyEvents = ['events', clubId];

  const {
    loading: loadingMessages,
    data: messagesData,
  } = useQuery(storeKeyMessages, () => fetchMessages(clubId));

  const {
    loading: loadingEvents,
    data: upcomingEvents,
  } = useQuery(storeKeyEvents, () => fetchEvents(clubId));

  return {
    loadingMessages,
    messagesData,
    loadingEvents,
    upcomingEvents,
  };
};

export default useClubFeed;
