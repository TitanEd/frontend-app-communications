import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { Container, Card } from '@openedx/paragon';
import { FormattedMessage } from '@edx/frontend-platform/i18n';

import BulkEmailTaskManager from './bulk-email-task-manager/BulkEmailTaskManager';
import CustomNavigationTabs from '../navigation-tabs/CustomNavigationTabs';
import BulkEmailForm from './bulk-email-form';
import { CourseMetadataContext } from '../page-container/PageContainer';
import { BulkEmailProvider } from './bulk-email-context';
import BackToInstructor from '../navigation-tabs/BackToInstructor';


export default function BulkEmailTool() {
  const { courseId } = useParams();

  return (
    <CourseMetadataContext.Consumer>
      {(courseMetadata) =>
        courseMetadata?.originalUserIsStaff ? (
          <>
            <div className="course-tabs-navigation-wrapper">
              <CustomNavigationTabs
                courseId={courseId}
                tabData={courseMetadata.tabs}
              />
            </div>
            <div className="bulk-email-tool-wrapper">
              <div className="bulk-email-tool-content">
                <BulkEmailProvider>
                  {/* Back link + Title row */}
                  <div className="ca-breadcrumb-container mx-4">
                    <div className='mx-4'>
                    <BackToInstructor courseId={courseId} / >
                    </div>

                    <h1 className="ca-title mx-4">
                      <FormattedMessage
                        id="bulk.email.send.email.header"
                        defaultMessage="Send an email"
                        description="A label for email form"
                      />
                    </h1>
                  </div>

                  {/* Main card-like container - full width with nice rounding */}
                  <Card className="bulk-email-main-card raised-card border-0 shadow-sm">
                    <Card.Body className="p-4 p-lg-5">
                      {/* Form section */}
                      <div className="bulk-email-form-section mb-5">
                        <BulkEmailForm
                          courseId={courseId}
                          cohorts={courseMetadata.cohorts}
                          courseModes={courseMetadata.courseModes}
                        />
                      </div>

                      {/* Task manager section */}
                      <div className="bulk-email-tasks-section pt-5 border-top">
                        <h2 className="h4 mb-4 text-primary-500">
                          <FormattedMessage
                            id="bulk.email.task.manager.header"
                            defaultMessage="Email Task Status"
                            description="Header for bulk email task manager"
                          />
                        </h2>

                        <BulkEmailTaskManager courseId={courseId} />
                      </div>
                    </Card.Body>
                  </Card>
                </BulkEmailProvider>
              </div>
            </div>
          </>
        ) : (
          <ErrorPage />
        )
      }
    </CourseMetadataContext.Consumer>
  );
}