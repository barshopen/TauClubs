import React from 'react';
import EmptyState from '@pluralsight/ps-design-system-emptystate';

const EmptyStateSearching = () => (
  <EmptyState
    style={{ color: 'black' }}
    heading={<EmptyState.Heading>Searching...</EmptyState.Heading>}
    illustration={
      <EmptyState.Illustration name={EmptyState.Illustration.names.magnify} />
    }
  />
);

export default EmptyStateSearching;
