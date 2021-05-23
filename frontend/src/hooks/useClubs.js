import { useQuery } from 'react-query';
import { getClubs } from '../Shared/api';

const fetchClubs = async () => {
  const res = await getClubs();
  return res;
};

const useClubs = () => {
  const storeKey = ['clubs'];

  const { loading: loadingClubs, data: clubs } = useQuery(storeKey, fetchClubs);

  return {
    loadingClubs,
    clubs,
  };
};

export default useClubs;
