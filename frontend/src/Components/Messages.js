import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// const MessagesData = [
//   {
//     title: 'Chess',
//     date: '25/7/2021',
//     Content: 'The new meeting location is tel aviv',

//   },
//   {
//     title: 'new opening',
//     date: '12/18/2020',
//     Content: 'we will open another tour in April',

//   },
//   {
//     title: 'royal',
//     date: '2/16/2021',
//     Content: 'an evening of physics, including a talk from a theoretical particle physicist',

//   },
//   {
//     title: 'Veritatis Dolores Adipisci Minus',
//     date: '25/7/91',
//     Content: 'an evening of physics, including a talk from a theoretical particle physicist',

//   },
// ];

function formatDate(dateString) {
  return (new Date((dateString))).toLocaleDateString('en-GB');
}

function Messages({ data }) {
  return (
    <ComponentContainer>
      <MainHeader>
        Messages
      </MainHeader>
      <MessagesContainer>
        {data.map((d) => (
          <SingleMessageContainer>
            <TextContainer>
              <ItemHeader>{d.title}</ItemHeader>
              <Content>{d.text.repeat(3)}</Content>
            </TextContainer>
            <DateContainerOuter>
              <div>
                {formatDate(d.date)}
              </div>
            </DateContainerOuter>
          </SingleMessageContainer>
        ))}
      </MessagesContainer>
    </ComponentContainer>
  );
}
const ComponentContainer = styled.div`
      flex:${(props) => props.Flex};
      margin: 30px 0;
`;

Messages.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      date: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
};

Messages.defaultProps = {
  data: [],
};

// styled components
const MainHeader = styled.h2`
    font-family: 'Roboto Condensed', sans-serif;
    font-size:28rem;
    font-weight: normal;
`;

const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 15px

`;

const SingleMessageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const TextContainer = styled.div`
    margin-right: 45px;
    display: inline-block;
     
`;

const ItemHeader = styled.h3`
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

const Content = styled.div`
    font-size: 15rem;
    text-align: left;
`;

export default Messages;
