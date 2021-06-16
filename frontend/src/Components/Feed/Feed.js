/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import useFeed from '../../hooks/useFeed';

const SORT_BY_DATE = (a, b) => {
  const { creationTime: creationTimea } = a;
  const { creationTime: creationTimeb } = b;

  return creationTimea < creationTimeb
    ? -1
    : creationTimea > creationTimeb
    ? 1
    : 0;
};

const Feed = () => {
  const { feed } = useFeed();

  useEffect(() => feed?.sort(SORT_BY_DATE), [feed]);

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
