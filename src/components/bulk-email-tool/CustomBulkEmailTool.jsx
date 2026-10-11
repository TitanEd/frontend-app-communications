import React from 'react';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '@edx/frontend-platform/react';
import { Card } from '@openedx/paragon';
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
      {(courseMetadata) => (courseMetadata?.originalUserIsStaff ? (
        <>
          <CustomNavigationTabs tabData={courseMetadata.tabs} />
          <div className="bulk-email-tool-wrapper">
            <div className="bulk-email-tool-content">
              <BulkEmailProvider>
                {/* Back link + title — flush to content column (no mx-* second gutter). */}
                <div className="bulk-email-tool-heading">
                  <BackToInstructor courseId={courseId} />
                  <h1 className="ca-title">
                    <FormattedMessage
                      id="bulk.email.send.email.header"
                      defaultMessage="Send an email"
                      description="A label for email form"
                    />
                  </h1>
                </div>

                <Card className="bulk-email-main-card raised-card border-0 shadow-sm">
                  <Card.Body className="p-3 p-md-4">
                    <div className="bulk-email-form-section mb-5">
                      <BulkEmailForm
                        courseId={courseId}
                        cohorts={courseMetadata.cohorts}
                        courseModes={courseMetadata.courseModes}
                      />
                    </div>

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
      ))}
    </CourseMetadataContext.Consumer>
  );
}
