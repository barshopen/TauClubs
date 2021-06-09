import React from 'react';
import EmptyState from '@pluralsight/ps-design-system-emptystate';
import PropTypes from 'prop-types';

const EmptyStateErorSearch = ({ search }) => (
  <EmptyState
    style={{ color: 'black' }}
    heading={<EmptyState.Heading>Oops, We didn’t find it</EmptyState.Heading>}
    caption={
      <>
        <EmptyState.Caption style={{ color: 'black' }}>
          We have searched hard for a club with the name <b>{search}</b> but to
          no results :/
        </EmptyState.Caption>
        <EmptyState.Caption style={{ color: 'black' }}>
          Try something else...
        </EmptyState.Caption>
      </>
    }
    illustration={
      <EmptyState.Illustration name={EmptyState.Illustration.names.error} />
    }
  />
);

export default EmptyStateErorSearch;

EmptyStateErorSearch.propTypes = {
  search: PropTypes.string,
};

EmptyStateErorSearch.defaultProps = {
  search: '',
};
