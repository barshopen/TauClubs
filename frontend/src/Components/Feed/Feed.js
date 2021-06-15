import React from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import useFeed from '../../hooks/useFeed';

const Feed = () => {
  const { feed } = useFeed();

  return (
    <Container>
      <Container>
        {feed?.map(feedItem => (
          <FeedCard key={feedItem.id} feedItem={feedItem} />
        ))}
        {feed?.length === 0 && <FeedCard />}
      </Container>
    </Container>
  );
};
export default Feed;
