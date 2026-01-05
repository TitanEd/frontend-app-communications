from tutor import hooks

hooks.Filters.ENV_PATCHES.add_item(
    (
        "mfe-env-config-runtime-definitions-communications",
        """
// Runtime plugin configuration injected by Tutor
const { PLUGIN_OPERATIONS, DIRECT_PLUGIN } = await import('@openedx/frontend-plugin-framework');

const { default: CustomBulkEmailTool } = await import('./src/components/bulk-email-tool/CustomBulkEmailTool');
const { default: CustomCourseHeader } = await import('./src/components/CustomCourseHeader');

{% raw %}

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
            RenderWidget: () => <CustomBulkEmailTool />,
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
            RenderWidget: () => <></>,
          },
        },
      ],
    },
  }
};


// Load environment variables from .env file 
config.pluginSlots = getPluginSlots(); 
 
{% endraw %} 
""" 
    )) 
 
