import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize, mergeConfig, getConfig,
} from '@edx/frontend-platform';
import { AppProvider, AuthenticatedPageRoute, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';

import { Helmet } from 'react-helmet';
import { Routes, Route } from 'react-router-dom';
import messages from './i18n';

import './index.scss';
import BulkEmailTool from './components/bulk-email-tool';
import PageContainer from './components/page-container/PageContainer';

import React, { useEffect, useState } from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getMessages, IntlProvider } from '@edx/frontend-platform/i18n';
import { dynamicTheme } from 'titaned-frontend-library';
import Layout from './Layout';


const loadStylesForNewUI = (isOldUI) => {
  document.body.className = isOldUI ? 'old-ui' : 'new-ui';
  document.documentElement.className = isOldUI ? 'old-ui' : 'new-ui';

  if (!isOldUI) {
    import('titaned-frontend-library/dist/index.css');
    import('./styles/styles-overrides.scss');
  } else {
    import('./styles/old-ui.scss');
  }
};

const MainApp = () => {
  const [oldUI, setOldUI] = useState(null);
  const [loading, setLoading] = useState(true);
  const [menuConfig, setMenuConfig] = useState(null);

  // Load UI preference and menu config in one API call to avoid race conditions
  useEffect(() => {
    const loadUIPreferenceAndMenuConfig = async () => {
      try {
        // First, load from localStorage for immediate display
        const localStorageValue = localStorage.getItem('oldUI') || 'false';
        setOldUI(localStorageValue);
        setLoading(false);

        // Then, fetch both UI preference and menu config in one API call
        const response = await getAuthenticatedHttpClient().get(`${getConfig().STUDIO_BASE_URL}/titaned/api/v1/menu-config/`);

        if (response.status === 200 && response.data) {
          setMenuConfig(response.data);

          // Extract UI preference from the same response
          const useNewUI = response.data.use_new_ui === true;
          const apiOldUIValue = !useNewUI ? 'true' : 'false';

          // Check if API response matches localStorage
          if (localStorageValue !== apiOldUIValue) {
            localStorage.setItem('oldUI', apiOldUIValue);
            // Reload page to re-run build-time config with correct localStorage
            window.location.reload();
            return;
          }

          console.log('localStorage and API are in sync, no reload needed');
        } else {
          console.warn('API failed, using localStorage value and default menu config');
          setMenuConfig({}); // Set empty object as fallback
        }
      } catch (error) {
        console.error('API call failed, using localStorage value and default menu config:', error);
        setMenuConfig({}); // Set empty object as fallback
      }
    };

    loadUIPreferenceAndMenuConfig();
  }, []);

  // Apply theme from API
  useEffect(() => {
    if (oldUI === 'false') {
      (async () => {
        try {
          const response = await getAuthenticatedHttpClient().get(`${getConfig().LMS_BASE_URL}/titaned/api/v1/mfe_context/`);
          dynamicTheme(response);
        } catch (error) {
          console.error('Error fetching theme config:', error);
        }
      })();
    }
  }, [oldUI]);

  useEffect(() => {
    // Only load styles after we know the UI preference
    if (oldUI !== null) {
      loadStylesForNewUI(oldUI === 'true');
    }
  }, [oldUI]);

  // Show loading screen while UI preference is being fetched
  if (loading || menuConfig === null) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <div>Loading... Please wait...</div>
      </div>
    );
  }

  return (
    <AppProvider /* store={store} if exists */>
      <Helmet>
        <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
      </Helmet>
      {oldUI === 'true' ? (
        <Routes>
          <Route
            path="/courses/:courseId/bulk_email"
            element={(
              <AuthenticatedPageRoute>
                <PageContainer>
                  <BulkEmailTool />
                </PageContainer>
              </AuthenticatedPageRoute>
            )}
          />
        </Routes>
      ) : (
        <Routes>
          <Route
            path="/courses/:courseId/bulk_email"
            element={(
              <AuthenticatedPageRoute>
                {/* <PageContainer> */}
                  <Layout />
                {/* </PageContainer> */}
              </AuthenticatedPageRoute>
            )}
          />
        </Routes>
        // <Layout />
      )}
    </AppProvider>
  );
};

subscribe(APP_READY, () => {
  ReactDOM.render(
    <IntlProvider locale={getConfig().language || 'en'} messages={getMessages()}>
      <MainApp />
    </IntlProvider>,
    document.getElementById('root'),
  );
});

// subscribe(APP_READY, () => {
//   ReactDOM.render(
//     <AppProvider>
//       <Helmet>
//         <link rel="shortcut icon" href={getConfig().FAVICON_URL} type="image/x-icon" />
//       </Helmet>
//       <Routes>
//         <Route
//           path="/courses/:courseId/bulk_email"
//           element={(
//             <AuthenticatedPageRoute>
//               <PageContainer>
//                 <BulkEmailTool />
//               </PageContainer>
//             </AuthenticatedPageRoute>
//           )}
//         />
//       </Routes>
//     </AppProvider>,
//     document.getElementById('root'),
//   );
// });

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig(
        {
          // MICROBA-1505: Remove this when we remove the flag from config
          SCHEDULE_EMAIL_SECTION: process.env.SCHEDULE_EMAIL_SECTION || null,
        },
        'CommunicationsAppConfig',
      );
    },
  },
  messages,
});
