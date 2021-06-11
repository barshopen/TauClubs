import React from 'react';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import { useRecoilValue } from 'recoil';
import { mainSearch } from '../Shared/atoms';

const EmptyStateSearch = () => {
  const search = useRecoilValue(mainSearch);
  return (
    <EmptyState
      style={{ color: 'black' }}
      heading={<EmptyState.Heading>Oops, We didn’t find it</EmptyState.Heading>}
      caption={
        <>
          <EmptyState.Caption style={{ color: 'black' }}>
            We have searched hard for a club with the name <b>{search}</b> but
            no results :/
          </EmptyState.Caption>
          <EmptyState.Caption style={{ color: 'black' }}>
            Try something else...
          </EmptyState.Caption>
        </>
      }
      illustration={
        <EmptyState.Illustration name={EmptyState.Illustration.names.magnify} />
      }
    />
  );
};

export default EmptyStateSearch;
