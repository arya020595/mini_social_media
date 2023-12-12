import React from "react";
import { Pagination } from "react-bootstrap";

interface PaginationComponentProps {
  totalPages: number;
  activePage: number;
  onPageChange: (pageNumber: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  totalPages,
  activePage,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null; // Don't render pagination if there's only one page
  }

  const items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => onPageChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination className="justify-content-center">{items}</Pagination>
    </div>
  );
};

export default PaginationComponent;
