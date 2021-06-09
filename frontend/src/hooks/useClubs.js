import { useQuery } from 'react-query';
import { getClubs, getMyClubs } from '../Shared/api';

const fetchClubs = async filterByValue => {
  const res = await getClubs({ name: filterByValue });
  return res;
};

const fetchMyClubs = async () => {
  const res = await getMyClubs();
  return res;
};

const useClubs = filterByValue => {
  const storeKeyClubs = ['clubs', filterByValue || ''];
  const storeKeyMyClubs = ['myClubs'];

  const { loading: loadingClubs, data: clubs } = useQuery(storeKeyClubs, () => {
    console.log({ storeKeyClubs });
    return fetchClubs(filterByValue);
  });

  const { data: myClubs, refetch } = useQuery(storeKeyMyClubs, () => {
    console.log({ storeKeyMyClubs });
    return fetchMyClubs();
  });

  return {
    loadingClubs,
    clubs,
    myClubs,
    refetchMyClubs: refetch,
  };
};

export default useClubs;
