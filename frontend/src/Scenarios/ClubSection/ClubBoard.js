import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { GoPlus } from 'react-icons/go';
import { useRouteMatch } from 'react-router-dom';
import Messages from '../../Components/Messages';
import UpcomingEvents from '../../Components/UpcomingEvents';
import NewMessage from '../NewMessage';
import NewEvent from '../NewEvent';

const Container = styled.div`
  display:grid;
  grid-template-columns:10fr 1fr 20fr 1fr;
  width:100%;
  grid-gap:10px;
`;

const IconContainer = styled.div`
  & div{ /* TODO change this. find a better way to do it. */
    position: relative;
    top:30px;
    right:90px;
    cursor: pointer;
  }
  visibility: ${({ show }) => (show ? 'visible' : 'hidden')}
`;

const ComponentContainer = styled.div`
`;

function ClubBoard() {
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [messagesData, setMessagesData] = useState();
  const [upcomingEvents, setUpcomingEvents] = useState();
  const { params: { clubId } } = useRouteMatch('/club/*/:clubId');
  const [isAdmin, setIsAdmin] = useState();

  useEffect(() => {
    fetch(`http://localhost:5000/clubs/${clubId}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setIsAdmin(mydata.admin));
  }, [clubId]);

  useEffect(() => {
    fetch('http://localhost:5000/messages', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setMessagesData(mydata.slice(0, 7)));

    fetch('http://localhost:5000/upcoming_events', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then((res) => res.json())
      .then((mydata) => setUpcomingEvents(mydata.slice(0, 7)));
  }, []);
  return (
    <>
      <Container>
        <NewMessage showMessageModal={showMessageModal} setShowMessageModal={setShowMessageModal} />
        <NewEvent showEventModal={showEventModal} setShowEventModal={setShowEventModal} />
        <ComponentContainer>
          <Messages data={messagesData} />
        </ComponentContainer>
        <IconContainer show={isAdmin}>
          <div>
            <IconContext.Provider value={{ size: '23px' }}>
              <GoPlus
                onClick={(e) => {
                  e.preventDefault();
                  setShowMessageModal(!showMessageModal);
                }}
              />
            </IconContext.Provider>
          </div>
        </IconContainer>
        <ComponentContainer>
          <UpcomingEvents data={upcomingEvents} />
        </ComponentContainer>
        <IconContainer>
          <div>
            <IconContext.Provider value={{ size: '23px' }}>
              <GoPlus
                onClick={(e) => {
                  e.preventDefault();
                  setShowEventModal(!showEventModal);
                }}
              />
            </IconContext.Provider>
          </div>
        </IconContainer>
      </Container>
    </>
  );
}

export default ClubBoard;
