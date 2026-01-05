import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from '@openedx/paragon';
import Tabs from './Tabs';

export default function NavigationTabs(props) {
  const { tabData } = props;

  return (
    <div className="custom-nav-menu">
      <Nav variant="tabs" defaultActiveKey="Instructor">
        <Tabs>
        {tabData && tabData.map(tab => (
          <Nav.Item key={tab.tab_id}>
            <Nav.Link eventKey={tab.title} href={tab.url}>
              {tab.title}
            </Nav.Link>
          </Nav.Item>
        ))}
        </Tabs>
      </Nav>
    </div>
  );
}

NavigationTabs.propTypes = {
  tabData: PropTypes.arrayOf(PropTypes.shape({
    tab_id: PropTypes.string,
    title: PropTypes.string,
    url: PropTypes.string,
  })),
};

NavigationTabs.defaultProps = {
  tabData: [],
};
