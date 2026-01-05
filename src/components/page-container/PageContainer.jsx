import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { LearningHeader as Header } from '@edx/frontend-component-header';
import FooterSlot from '@openedx/frontend-slot-footer';
import { Spinner } from '@openedx/paragon';

import { getCohorts, getCourseHomeCourseMetadata } from './data/api';

import './PageContainer.scss';
import { PluginSlot } from '@openedx/frontend-plugin-framework';

export const CourseMetadataContext = React.createContext();

export default function PageContainer(props) {
  const { children } = props;
  const { courseId } = useParams();

  const [courseMetadata, setCourseMetadata] = useState();

  useEffect(() => {
    async function fetchCourseMetadata() {
      let metadataResponse;
      let cohortsResponse;

      try {
        metadataResponse = await getCourseHomeCourseMetadata(courseId);
        cohortsResponse = await getCohorts(courseId);
      } catch (e) {
        setCourseMetadata({
          org: '',
          number: '',
          title: '',
          originalUserIsStaff: false,
          tabs: [],
          cohorts: [],
        });
        return;
      }

      const {
        org, number, title, tabs, originalUserIsStaff, courseModes,
      } = metadataResponse;
      const { cohorts } = cohortsResponse;

      setCourseMetadata({
        org,
        number,
        title,
        originalUserIsStaff,
        courseModes,
        tabs: [...tabs],
        cohorts: cohorts.map(({ name }) => name),
      });
    }
    fetchCourseMetadata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  if (courseMetadata) {
    const courseTitle =courseMetadata.title;
    return (
      <CourseMetadataContext.Provider value={courseMetadata}>
        <>
          <PluginSlot
            id="learning_header_plugin_slot"
            pluginProps={{
              courseTitle,
            }}
          >
            <Header
              className="learning-header"
              courseOrg={courseMetadata.org}
              courseNumber={courseMetadata.number}
              courseTitle={courseMetadata.title}
            />
          </PluginSlot>
          <div className="pb-3 container">
            <main id="main-content">
              {children}
            </main>
          </div>
          <PluginSlot
            id="learning_footer_plugin_slot"
            pluginProps={{
              courseTitle,
            }}
          >
            <FooterSlot />
          </PluginSlot>
        </>
      </CourseMetadataContext.Provider>
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <Spinner
        animation="border"
        variant="primary"
        role="status"
        screenreadertext="loading"
        className="spinner-border spinner-border-lg text-primary p-5 m-5"
      />
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
