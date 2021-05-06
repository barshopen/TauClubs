import React, { useMemo, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';
import Container from '@material-ui/core/Container';
import FeedCard from './GenericFeedCard';
import FeedNavBar from './FeedNavBar';
import { getFeedData } from '../../api';

const Feed = () => {
  // const [currentTab, setCurrentTab] = useState('all');
  // const storeKey = ['data', currentTab];
  // const { data } = useQuery(storeKey, () => getFeedData(currentTab));
  const [data, setData] = useState();
  useEffect(() => {
    getFeedData().then(d => {
      setData(d);
      console.log({ d });
    });
  }, []);

  return (
    <Container>
      {/* <FeedNavBar setCurrentTab='all' /> */}
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
    </Container>
  );
};
export default Feed;
