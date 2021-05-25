import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DashboardSidebar from '../../../../GeneralSideBar/DashboardSidebar';

const DashboardLayout = ({ children }) => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      {children}
    </>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardLayout;
