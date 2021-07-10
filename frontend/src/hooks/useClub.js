import { useQuery } from 'react-query';
// import { useReducer } from 'react';
import { getClub } from '../Shared/api';

const fetchClub = async clubId => {
  const res = await getClub(clubId);
  return res;
};

// function reducer(state, stateUpdate) {
//   return { ...state, ...stateUpdate };
// }

const useClub = clubId => {
  const storeKey = ['club', clubId];
  // const [clubData, dispatch] = useReducer(reducer, {});

  // const { loading: loadingClub, refetch } = useQuery(
  //   storeKey,
  //   () => fetchClub(clubId),
  //   {
  //     staleTime: 60000,
  //     refetchOnMount: false,
  //     onSuccess: data => {
  //       for (const [key, value] of Object.entries(data)) {
  //         if (data[key] !== clubData[key]) {
  //           dispatch({ [key]: value });
  //         }
  //       }
  //     },
  //   }
  // );

  const { isLoading: loadingClub, refetch, data: clubData } = useQuery(
    storeKey,
    () => fetchClub(clubId),
    { staleTime: 60000, refetchOnMount: false }
  );

  return {
    loadingClub,
    clubData,
    refetchUseClub: refetch,
  };
};

export default useClub;
