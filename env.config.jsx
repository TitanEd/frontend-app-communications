import React from 'react';


import {
  DIRECT_PLUGIN,
  PLUGIN_OPERATIONS,
} from '@openedx/frontend-plugin-framework';

import CustomBulkEmailTool from './src/components/bulk-email-tool/CustomBulkEmailTool';
import CustomCourseHeader from './src/components/CustomCourseHeader';


const getPluginSlots = () => {
  if (typeof window !== 'undefined' && localStorage.getItem('oldUI') === 'true') {
    return {};
  }

  return {
    communications_home_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'communications_home_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomBulkEmailTool />,
          },
        },
      ],
    },
    learning_header_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'learning_header_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <CustomCourseHeader {...props} />,
          },
        },
      ],
    },
    learning_footer_plugin_slot: {
      plugins: [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'learning_footer_plugin_slot',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: (props) => <></> ,
          },
        },
      ],
    },
  };
}

// Load environment variables from .env file
const config = {
  ...process.env,
  get pluginSlots() {
    return getPluginSlots();
  },
};

export default config;