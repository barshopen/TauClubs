import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import { getClubs, getMyClubs } from '../Shared/api';
import { mainSearch } from '../Shared/atoms';

const fetchClubs = async search => {
  const res = await getClubs({ name: search });
  return res;
};

const fetchMyClubs = async () => {
  const res = await getMyClubs();
  return res;
};

const useClubs = () => {
  const search = useRecoilValue(mainSearch);
  const storeKeyClubs = ['clubs', search];
  const storeKeyMyClubs = ['myClubs'];

  const { isLoading: loadingClubs, data: clubs } = useQuery(storeKeyClubs, () =>
    fetchClubs(search)
  );

  const { data: myClubs, refetch } = useQuery(storeKeyMyClubs, fetchMyClubs, {
    staleTime: 60000,
    refetchOnMount: false,
  });

  return {
    loadingClubs,
    clubs,
    myClubs,
    refetchMyClubs: refetch,
  };
};

export default useClubs;
