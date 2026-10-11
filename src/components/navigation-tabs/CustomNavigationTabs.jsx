import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useIntl } from '@edx/frontend-platform/i18n';

import Tabs from './Tabs';
import messages from '../../messages';

export default function NavigationTabs(props) {
  const { tabData } = props;
  const intl = useIntl();

  const isActiveTab = (tab) => {
    const id = (tab.tab_id || '').toLowerCase();
    const title = (tab.title || '').toLowerCase();
    return id === 'instructor' || title === 'instructor';
  };

  return (
    <div id="courseTabsNavigation" className="mb-3 course-tabs-navigation">
      <div className="container-xl">
        <div className="nav-bar">
          <div className="nav-menu">
            <Tabs
              className="nav-underline-tabs"
              aria-label={intl.formatMessage(messages.courseMaterialNav)}
            >
              {tabData && tabData.map(tab => (
                <a
                  key={tab.tab_id}
                  href={tab.url}
                  className={classNames('nav-item flex-shrink-0 nav-link', {
                    active: isActiveTab(tab),
                  })}
                >
                  {tab.title}
                </a>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
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
