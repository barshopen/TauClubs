import { useQuery } from 'react-query';
import { getClubs } from '../Shared/api';

const fetchClubs = async filterByValue => {
  const res = await getClubs({ name: filterByValue });
  return res;
};

const useClubs = filterByValue => {
  const storeKey = ['clubs', filterByValue];

  const { loading: loadingClubs, data: clubs } = useQuery(storeKey, () =>
    fetchClubs(filterByValue)
  );

  return {
    loadingClubs,
    clubs,
  };
};

export default useClubs;
