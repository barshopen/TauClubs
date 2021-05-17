import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getClubs } from '../Shared/api';

const fetchClubs = async clubId => {
  const res = await getClubs(clubId);
  return res;
};

const useClubs = (clubId = null) => {
  const storeKey = ['clubs', clubId];

  const { loading: loadingClubs, data: clubs } = useQuery(storeKey, () =>
    fetchClubs(clubId)
  );

  const getClubById = useMemo(() => clubs?.find(({ id }) => id === clubId), []);

  return {
    loadingClubs,
    clubs,
    getClubById,
  };
};

export default useClubs;
