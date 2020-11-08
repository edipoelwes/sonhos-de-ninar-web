import React from 'react'
import { Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap'

interface PaginateProps {
  totalPages: number
  currentPage: number
  setCurrentPage(param: number): void
}

const Paginate: React.FC<PaginateProps> = ({
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const pageNumbers = []

  const pages = totalPages < 5 ? totalPages : 5

  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i)
  }
  return (
    <nav aria-label="Page navigation example" className="mt-3">
      <Pagination
        className="pagination justify-content-end"
        listClassName="pagination-primary"
      >
        <PaginationItem className={currentPage < 3 ? 'disabled' : ''}>
          <PaginationLink onClick={() => setCurrentPage(1)}>
            &laquo;
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={currentPage === 1 ? 'disabled' : ''}>
          <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
            anterior
          </PaginationLink>
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem
            className={currentPage === pageNumber ? 'active' : ''}
            key={pageNumber}
          >
            <PaginationLink onClick={() => setCurrentPage(pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage > 5 && (
          <PaginationItem className="active">
            <PaginationLink >{currentPage}</PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
            proxima
          </PaginationLink>
        </PaginationItem>

        <PaginationItem
          className={currentPage === totalPages ? 'disabled' : ''}
        >
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            &raquo;
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  )
}

export default Paginate
