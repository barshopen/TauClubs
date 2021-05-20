import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerOuter = styled.div`
  margin: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AboutUs = ({ description }) => (
  <ContainerOuter>{description}</ContainerOuter>
);

AboutUs.propTypes = { description: PropTypes.string };
AboutUs.defaultProps = { description: '' };

export default AboutUs;
