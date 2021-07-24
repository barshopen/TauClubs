import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  getMessagesByClub,
  getUpcomingEventsByClub,
  createNewMessgae,
  createNewEvent,
  updateEvent,
  updateMessage,
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

  const { isLoading: loadingMessages, data: messagesData } = useQuery(
    storeKeyMessages,
    () => fetchMessages(clubId),
    {
      staleTime: 60000,
      refetchOnMount: false,
    }
  );

  const {
    isLoading: loadingEvents,
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

  const { mutate: editEvent } = useMutation(
    ({ data }) => updateEvent({ payload: { clubId, data } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(storeKeyEvents);
      },
    }
  );

  const { mutate: editMessage } = useMutation(
    ({ data }) => updateMessage({ payload: { clubId, data } }),
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
    editEvent,
    editMessage,
  };
};

export default useClubFeed;
