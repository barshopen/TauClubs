import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FeedCardEvent from './GenericFeedCard';
import { getFeedData } from '../../Shared/api';

const Feed = () => {
  const [data, setData] = useState();
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
          <FeedCardEvent feedItem={feedItem} />
        ))}
        {/* here check if message or event and add the right one */}
      </Container>
    </Container>
  );
};
export default Feed;
