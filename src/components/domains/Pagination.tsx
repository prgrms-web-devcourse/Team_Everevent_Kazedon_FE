import React from 'react';
import styled from '@emotion/styled';
import Common from '@styles/index';

const PaginationContainer = styled.ul`
  padding: 1px;
  color: ${Common.colors.background};
  text-align: center;
  list-style: none;
`;

const PaginationItem = styled.li`
  display: inline-block;
  width: 24px;
  padding: 4px;
  margin-right: 4px;
  font-size: ${Common.fontSize.medium};
  color: ${Common.colors.point};
  border: 1px solid ${Common.colors.point};
  border-radius: 4px;
`;

const SelectedPageItem = styled(PaginationItem)`
  color: ${Common.colors.background};
  background-color: ${Common.colors.point};
`;

interface PaginationProps {
  eventCount: number;
  totalEventCount: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination = ({
  eventCount,
  totalEventCount,
  currentPage,
  paginate,
}: PaginationProps) => {
  const pageNumbers = [];
  const totalPageCount = Math.ceil(totalEventCount / eventCount);

  for (let i = 1; i <= totalPageCount; i += 1) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      {pageNumbers.map((pageNumber) =>
        currentPage !== pageNumber ? (
          <PaginationItem key={pageNumber} onClick={() => paginate(pageNumber)}>
            {pageNumber}
          </PaginationItem>
        ) : (
          <SelectedPageItem
            key={pageNumber}
            onClick={() => paginate(pageNumber)}
          >
            {pageNumber}
          </SelectedPageItem>
        )
      )}
    </PaginationContainer>
  );
};

export default Pagination;
