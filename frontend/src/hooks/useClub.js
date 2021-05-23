import { useQuery } from 'react-query';
import { getClub } from '../Shared/api';

const fetchClub = async clubId => {
  const res = await getClub(clubId);
  return res;
};

const useClub = (clubId = null) => {
  const storeKey = ['club', clubId];

  const { loading: loadingClub, data: clubData } = useQuery(storeKey, () =>
    fetchClub(clubId)
  );

  return {
    loadingClub,
    clubData,
  };
};

export default useClub;
