import React from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import useFeed from '../../hooks/useFeed';

const Feed = () => {
  const { feed } = useFeed();

  return (
    <Container>
      {/* <FeedNavBar setCurrentTab='all' /> */}
      <Container>
        {feed?.map(feedItem => (
          <FeedCard feedItem={feedItem} />
        ))}
      </Container>
    </Container>
  );
};
export default Feed;
