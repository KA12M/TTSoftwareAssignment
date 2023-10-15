import React from "react";
import { Dropdown, Pagination } from "react-bootstrap";

export default function MyPagination({ pagination, setPage, page, limit }) {
  if (!pagination) return;

  let items = [];
  for (let number = 1; number <= pagination.totalPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === page}
        onClick={() => setPage({ page: number, limit })}
      >
        {number}
      </Pagination.Item>
    );
  }

  let MenuLimit = [5, 10, 30, 50, 100];
  let dropdownMenu = [
    ...MenuLimit.map((res) => (
      <Dropdown.Item
        key={res}
        onClick={() => {
          setPage({ page: 1, limit: res });
        }}
      >
        {res}
      </Dropdown.Item>
    )),
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "1rem 0px",
      }}
    >
      <div>
        Page {pagination.page} of {pagination.totalPage}{" "}
        {`(${pagination.total}) items`}
      </div>
      <Pagination>{items}</Pagination>

      <Dropdown>
        <Dropdown.Toggle>{limit}</Dropdown.Toggle>

        <Dropdown.Menu>{dropdownMenu}</Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
