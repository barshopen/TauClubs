import { useQuery } from 'react-query';
import { getMessages, getUpcomingEvents } from '../Shared/api';

const fetchMessages = async () => {
  const res = await getMessages();
  return res;
};

const fetchEvents = async () => {
  const res = await getUpcomingEvents();
  return res;
};

const useClubFeed = ({ clubId }) => {
  const storeKeyMessages = ['messages', clubId];
  const storeKeyEvents = ['events', clubId];

  const { loading: loadingMessages, data: messagesData } = useQuery(
    storeKeyMessages,
    fetchMessages
    // () =>  fetchMessages(clubId) - backend resolve
  );

  const { loading: loadingEvents, data: upcomingEvents } = useQuery(
    storeKeyEvents,
    fetchEvents
    // () => fetchMessages(clubId) - backend resolve
  );

  return {
    loadingMessages,
    messagesData,
    loadingEvents,
    upcomingEvents,
  };
};

export default useClubFeed;
