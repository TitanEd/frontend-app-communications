import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  /* BulkEmailScheduledEmailsTable.jsx Messages */
  bulkEmailScheduledEmailsTableErrorHeader: {
    id: 'bulk.email.scheduled.emails.table.error.header',
    defaultMessage: 'Error',
  },

  bulkEmailScheduledEmailsTableError: {
    id: 'bulk.email.scheduled.emails.table.error',
    defaultMessage: 'An error occured while retrieving scheduled email information. Please try again later.',
    description: 'An error message that shows if the app is unable to display scheduled emails in the table',
  },
  bulkEmailScheduledEmailsTableSendDate: {
    id: 'bulk.email.scheduled.emails.table.sendDate',
    defaultMessage: 'Send date',
  },
  bulkEmailScheduledEmailsTableSendTo: {
    id: 'bulk.email.scheduled.emails.table.sendTo',
    defaultMessage: 'Send to',
  },
  bulkEmailScheduledEmailsTableSubject: {
    id: 'bulk.email.scheduled.emails.table.subject',
    defaultMessage: 'Subject',
  },
  bulkEmailScheduledEmailsTableAuthor: {
    id: 'bulk.email.scheduled.emails.table.Author',
    defaultMessage: 'Author',
  },
  bulkEmailScheduledEmailsTableAction: {
    id: 'bulk.email.scheduled.emails.table.action',
    defaultMessage: 'Action',
    description: 'Header of the column with the view, delete and edit buttons of a scheduled email',
  },
  bulkEmailScheduledEmailsTableView: {
    id: 'bulk.email.scheduled.emails.table.action.view',
    defaultMessage: 'View',
    description: 'Label of the button that shows a scheduled email',
  },
  bulkEmailScheduledEmailsTableDelete: {
    id: 'bulk.email.scheduled.emails.table.action.delete',
    defaultMessage: 'Delete',
    description: 'Label of the button that deletes a scheduled email',
  },
  bulkEmailScheduledEmailsTableEdit: {
    id: 'bulk.email.scheduled.emails.table.action.edit',
    defaultMessage: 'Edit',
    description: 'Label of the button that opens a scheduled email in the editor',
  },
  bulkEmailScheduledEmailsTableEmpty: {
    id: 'bulk.email.scheduled.emails.table.empty',
    defaultMessage: 'No results found',
    description: 'Text of the scheduled emails table when there is no scheduled email',
  },
  bulkEmailScheduledEmailsTablePaginationLabel: {
    id: 'bulk.email.scheduled.emails.table.pagination.label',
    defaultMessage: 'Table pagination',
    description: 'Accessible name of the page buttons of the scheduled emails table',
  },
  bulkEmailScheduledEmailsTablePrevious: {
    id: 'bulk.email.scheduled.emails.table.pagination.previous',
    defaultMessage: 'Previous',
    description: 'Label of the button that opens the previous page of the scheduled emails table',
  },
  bulkEmailScheduledEmailsTableNext: {
    id: 'bulk.email.scheduled.emails.table.pagination.next',
    defaultMessage: 'Next',
    description: 'Label of the button that opens the next page of the scheduled emails table',
  },
  bulkEmailScheduledEmailsTablePage: {
    id: 'bulk.email.scheduled.emails.table.pagination.page',
    defaultMessage: 'Page',
    description: 'Word before a page number, as in "Page 2"',
  },
  bulkEmailScheduledEmailsTableCurrentPage: {
    id: 'bulk.email.scheduled.emails.table.pagination.currentPage',
    defaultMessage: 'Current Page',
    description: 'Screen reader text that marks the page being shown, as in "Page 2, Current Page, of 5"',
  },
  bulkEmailScheduledEmailsTablePageOfCount: {
    id: 'bulk.email.scheduled.emails.table.pagination.pageOfCount',
    defaultMessage: 'of',
    description: 'Word between the current page and the number of pages, as in "2 of 5"',
  },
  bulkEmailScheduledEmailsTableConfirmDelete: {
    id: 'bulk.email.scheduled.emails.table.confirm.delete',
    defaultMessage: 'You are deleting an email scheduled to be sent on {date}. The email will not be sent and the scheduling canceled. Are you sure?',
  },
});

export default messages;
