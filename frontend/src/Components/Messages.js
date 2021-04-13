import React from 'react';
import styled from 'styled-components';

const MessagesData = [
  {
    title: 'Chess',
    date: '25/7/2021',
    Content: 'The new meeting location is tel aviv',

  },
  {
    title: 'new opening',
    date: '12/18/2020',
    Content: 'we will open another tour in April',

  },
  {
    title: 'royal',
    date: '2/16/2021',
    Content: 'an evening of physics, including a talk from a theoretical particle physicist',

  },
  {
    title: 'Veritatis Dolores Adipisci Minus',
    date: '25/7/91',
    Content: 'an evening of physics, including a talk from a theoretical particle physicist',

  },
];
function Messages() {
  return (
    <>
      <MainTitle>
        Messages
      </MainTitle>
      <Messages1>
        {MessagesData.map((d) => (
          <Message1>
            <ItemTitle>{d.title}</ItemTitle>
            <Date>{d.date}</Date>
            <Content>{d.Content}</Content>
          </Message1>
        ))}
        <Messages1 />
      </Messages1>
    </>
  );
}

export default Messages;

const MainTitle = styled.h1`
    font-family: 'Roboto Condensed';
    font-size:35px;
    font-weight: normal;
`;
const Messages1 = styled.div`
    display: flex;
    flex-direction: column;
    max-width:350px;
`;
const Message1 = styled.div`
     
`;
const ItemTitle = styled.div`
    font-size:25px;
    font-weight: bold;
    text-transform: capitalize;
    text-align:left;
`;
const Date = styled.div`
    text-align:right;
    font-size:15px;
`;
const Content = styled.div`
    font-size:15px;
    text-align:left;

`;
