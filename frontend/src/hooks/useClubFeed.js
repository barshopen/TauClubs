import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getMessagesByClub,
  getUpcomingEventsByClub,
  createNewMessgae,
  createNewEvent,
} from '../Shared/api';

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
  const queryClient = useQueryClient();

  const { loading: loadingMessages, data: messagesData } = useQuery(
    storeKeyMessages,
    () => fetchMessages(clubId),
    {
      staleTime: 60000,
      refetchOnMount: false,
    }
  );

  const {
    loading: loadingEvents,
    data: upcomingEvents,
  } = useQuery(storeKeyEvents, () => fetchEvents(clubId));

  const { mutate: addMessage } = useMutation(
    ({ data }) => createNewMessgae({ payload: { clubId, data } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(storeKeyMessages);
      },
    }
  );

  const { mutate: addEvent } = useMutation(
    ({ data }) => createNewEvent({ payload: { clubId, data } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(storeKeyEvents);
      },
    }
  );

  return {
    loadingMessages,
    messagesData,
    loadingEvents,
    upcomingEvents,
    addMessage,
    addEvent,
  };
};

export default useClubFeed;
