/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import styled from 'styled-components';

function Signin() {
  return (
    <form>
      <FillContainer>
        <SingleRow>
          <TextContainer>
            <label> User Name:</label>
          </TextContainer>
          <Inputbox1>
            <input
              type='email'
              name='Email'
              style={{ width: '190px', height: '20px' }}
              placeholder='...@mail.tau.ac.il'
            />
          </Inputbox1>
          <HebrewContainer>
            <label>:שם משתמש </label>
          </HebrewContainer>
        </SingleRow>
        <SingleRow>
          <TextContainer>
            <label>Id:</label>
          </TextContainer>
          <Inputbox2>
            <input
              type='number'
              name='id'
              placeholder='123456789'
              style={{ width: '190px', height: '20px' }}
            />
          </Inputbox2>
          <HebrewContainer>
            <label>:תעודת זהות </label>
          </HebrewContainer>
        </SingleRow>
        <SingleRow>
          <TextContainer>
            <label>Password:</label>
          </TextContainer>
          <Inputbox3>
            <input
              type='text'
              name='password'
              style={{ width: '190px', height: '20px' }}
            />
          </Inputbox3>
          <HebrewContainer>
            <label>:סיסמה </label>
          </HebrewContainer>
        </SingleRow>
      </FillContainer>
      <input
        type='submit'
        value='Sign In'
        style={{
          fontSize: '20px',
          width: '150px',
          height: '80px',
          borderColor: 'azure',
          backgroundColor: 'dimgray',
          color: 'darksalmon',
          outlineColor: 'darkcyan',
        }}
      />
    </form>
  );
}

export default Signin;

const SingleRow = styled.div`
  flex-direction: row;
`;
const TextContainer = styled.div`
  display: inline-block;
  flex-direction: column;
  float: left;
  font-size: 1rem;
`;

const Inputbox1 = styled.div`
  float: center;
  display: inline-block;
  flex-direction: column;
  padding-right: 10px;
  height: 80px;
`;
const Inputbox2 = styled.div`
  float: center;
  display: inline-block;
  flex-direction: column;
  padding-right: 10px;
  padding-left: 103px;
  height: 80px;
`;
const Inputbox3 = styled.div`
  float: center;
  display: inline-block;
  flex-direction: column;
  padding-right: 40px;
  height: 80px;
`;

const HebrewContainer = styled.div`
  float: right;
  flex-direction: center;
  padding-right: 240px;
`;

const FillContainer = styled.div`
  padding-top: 50px;
  padding-left: 350px;
  display: flex;
  flex-direction: column;
`;
