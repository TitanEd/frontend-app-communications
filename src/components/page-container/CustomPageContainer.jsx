import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import { Spinner } from '@openedx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';

import { getCohorts, getCourseHomeCourseMetadata } from './data/api';
import { CourseMetadataContext } from './PageContainer';
import CustomCourseHeader from '../CustomCourseHeader';
import messages from '../../messages';

import './PageContainer.scss';

export default function PageContainer(props) {
  const { children } = props;
  const { courseId } = useParams();
  const intl = useIntl();

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
    return (
      <CourseMetadataContext.Provider value={courseMetadata}>
        <>
          <CustomCourseHeader courseTitle={courseMetadata.title} />
          <main id="main" className="container-xl container-fluid d-flex flex-column w-100">
            {children}
          </main>
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
        screenReaderText={intl.formatMessage(messages.loadingScreenReader)}
        className="spinner-border spinner-border-lg text-primary p-5 m-5"
      />
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
