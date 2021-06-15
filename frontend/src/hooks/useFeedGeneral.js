import { useQuery } from 'react-query';
import { getAll } from '../Shared/api';

const fetchFeed = async () => {
  const res = await getAll();
  return res;
};

const useFeed = () => {
  const storeKeyAll = ['feedAll'];

  const { data: feedAll, refetchAll } = useQuery(storeKeyAll, fetchFeed);

  return {
    feedAll,
    refetchFeed: refetchAll,
  };
};

export default useFeed;
