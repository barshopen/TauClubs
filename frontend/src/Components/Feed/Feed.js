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
      {/* <FeedNavBar setCurrentTab='all' /> */}
      <Container>
        {data?.map(
          ({
            id,
            type,
            title,
            profileImage,
            description,
            lastUpdateTime,
            clubName,
            location,
            startTime,
            duration,
          }) => (
            <FeedCard
              id={id}
              type={type}
              title={title}
              profileImage={profileImage}
              description={description}
              date={lastUpdateTime}
              clubName={clubName}
              location={location}
              startTime={startTime}
              duration={duration}
            />
          )
        )}
      </Container>
    </Container>
  );
};
export default Feed;
