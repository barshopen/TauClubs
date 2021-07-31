import { useQuery } from 'react-query';
import { getClub } from '../Shared/api';

const fetchClub = async clubId => {
  const res = await getClub(clubId);
  return res;
};

const useClub = clubId => {
  const storeKey = ['club', clubId];

  const { isLoading: loadingClub, refetch, data: clubData } = useQuery(
    storeKey,
    () => fetchClub(clubId),
    { staleTime: Infinity, refetchOnMount: false }
  );

  return {
    loadingClub,
    clubData,
    refetchUseClub: refetch,
  };
};

export default useClub;
