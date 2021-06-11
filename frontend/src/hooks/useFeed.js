import { useQuery } from 'react-query';
import { getFeedData } from '../Shared/api';

const fetchFeed = async () => {
  const res = await getFeedData();
  return res;
};

const useFeed = () => {
  const storeKeyMyClubs = ['feed'];

  const { data: feed, refetch } = useQuery(storeKeyMyClubs, fetchFeed);

  return {
    feed,
    refetchFeed: refetch,
  };
};

export default useFeed;
