import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
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
      {data?.map(
        ({ id, type, title, profileImage, description, lastUpdateTime }) => (
          <FeedCard
            id={id}
            type={type}
            title={title}
            profileImage={profileImage}
            description={description}
            date={lastUpdateTime}
          />
        )
      )}
    </Container>
  );
};
export default Feed;
