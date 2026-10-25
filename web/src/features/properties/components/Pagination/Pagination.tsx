
"use client";

import styles from "./Pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPages = () => {
    return Array.from(
      { length: totalPages },
      (_, index) => index + 1
    );
  };

  return (
    <nav
      className={styles.pagination}
      aria-label="Property pagination"
    >
      <button
        type="button"
        className={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </button>

      <div className={styles.pageNumbers}>
        {getPages().map((page) => (
          <button
            key={page}
            type="button"
            className={`${styles.pageButton} ${
              currentPage === page ? styles.active : ""
            }`}
            aria-current={
              currentPage === page ? "page" : undefined
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;