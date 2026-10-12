import React, { useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { DataTable, DataTableContext, Pagination } from '@openedx/paragon';
import { ArrowBackIos, ArrowForwardIos } from '@openedx/paragon/icons';
import messages from './messages';

/**
 * The parts of the Paragon DataTable whose default texts are English only (empty state,
 * page buttons), with texts in the language of the page. Same layout as the default one.
 */
export const useCustomPaginationTexts = () => {
  const intl = useIntl();
  return {
    paginationLabel: intl.formatMessage(messages.bulkEmailScheduledEmailsTablePaginationLabel),
    buttonLabels: {
      previous: intl.formatMessage(messages.bulkEmailScheduledEmailsTablePrevious),
      next: intl.formatMessage(messages.bulkEmailScheduledEmailsTableNext),
      page: intl.formatMessage(messages.bulkEmailScheduledEmailsTablePage),
      currentPage: intl.formatMessage(messages.bulkEmailScheduledEmailsTableCurrentPage),
      pageOfCount: intl.formatMessage(messages.bulkEmailScheduledEmailsTablePageOfCount),
    },
  };
};

const CustomTableFooter = () => {
  const texts = useCustomPaginationTexts();
  const {
    pageCount, gotoPage, nextPage, state,
  } = useContext(DataTableContext);
  const currentPage = (state?.pageIndex || 0) + 1;
  const onPageSelect = (pageNum) => gotoPage(pageNum - 1);
  return (
    <DataTable.TableFooter>
      <DataTable.RowStatus />
      {pageCount > 1 && (
        <Pagination
          variant="reduced"
          currentPage={currentPage}
          pageCount={pageCount}
          onPageSelect={onPageSelect}
          icons={{ leftIcon: null, rightIcon: null }}
          {...texts}
        />
      )}
      {nextPage && (
        <Pagination
          variant="minimal"
          currentPage={currentPage}
          pageCount={pageCount}
          onPageSelect={onPageSelect}
          icons={{ leftIcon: ArrowBackIos, rightIcon: ArrowForwardIos }}
          {...texts}
        />
      )}
    </DataTable.TableFooter>
  );
};

const CustomTableParts = () => {
  const intl = useIntl();
  return (
    <>
      <DataTable.TableControlBar />
      <DataTable.Table />
      <DataTable.EmptyTable content={intl.formatMessage(messages.bulkEmailScheduledEmailsTableEmpty)} />
      <CustomTableFooter />
    </>
  );
};

export default CustomTableParts;
