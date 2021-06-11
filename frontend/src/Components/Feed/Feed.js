import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import { getFeedData } from '../../Shared/api';

const Feed = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getFeedData().then(d => {
      setData(d);
    });
  }, []);

  return (
    <Container>
      {/* <FeedNavBar setCurrentTab='all' /> */}
      <Container>
        {data?.map(feedItem => (
          <FeedCard key={feedItem.id} feedItem={feedItem} />
        ))}
      </Container>
    </Container>
  );
};
export default Feed;
