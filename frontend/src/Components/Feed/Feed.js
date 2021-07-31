/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import useFeed from '../../hooks/useFeed';

const Feed = () => {
  const { feed } = useFeed();

  useEffect(() =>
    feed
      ?.sort(
        (a, b) =>
          new Date(...a.lastUpdateTime.split('/').reverse()) -
          new Date(...b.lastUpdateTime.split('/').reverse())
      )
      .reverse()
  );

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
