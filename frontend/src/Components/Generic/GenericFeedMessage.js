import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function formatDate(dateString) {
  return (new Date((dateString))).toLocaleDateString('en-GB');
}

function GenericFeedMessage({ title, date, children }) {
  return (
    <SingleMessageContainer>
      <TextContainer>
        <Title>{title}</Title>
        {children}
      </TextContainer>

      { date ? (
        <DateContainerOuter>
          <div>
            {formatDate(date)}
          </div>
        </DateContainerOuter>
      ) : null}
    </SingleMessageContainer>
  );
}

GenericFeedMessage.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element,
  date: PropTypes.string,
};

GenericFeedMessage.defaultProps = {
  children: [],
  date: '',
  title: '',
};

const SingleMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`;
const TextContainer = styled.div`
    margin-right: 45px;
    display: inline-block;
`;

const Title = styled.h3`
    margin: 10px 0px;
    font-size: 25rem;
    text-align: left;
`;

const DateContainerOuter = styled.div`
    display: inline-block;
    position: relative;

    font-size:15rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

`;
export default GenericFeedMessage;
