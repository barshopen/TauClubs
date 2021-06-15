/* eslint-disable no-nested-ternary */
import { useQuery, useMemo } from 'react-query';
import { getFeedData } from '../Shared/api';

const fetchFeed = async () => {
  const res = await getFeedData();
  return res;
};

const SORT_BY_DATE = (a, b) => {
  const { creationTime: creationTimea } = a;
  const { creationTime: creationTimeb } = b;
  return creationTimea < creationTimeb
    ? -1
    : creationTimea > creationTimeb
    ? 1
    : 0;
};

const useFeed = () => {
  const storeKeyMyClubs = ['feed'];

  const { data: feed, refetch } = useQuery(storeKeyMyClubs, fetchFeed);

  feed?.sort(SORT_BY_DATE);
  console.log({ feed });

  return {
    feed,
    refetchFeed: refetch,
  };
};

export default useFeed;
