import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 1 && ( // Only show pagination if more than one page
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword // If keyword is present, the pagination links include both the keyword and the page number in the URL (/search/:keyword/page/:pageNumber).
                  ? `/search/${keyword}/page/${x + 1}` // For users
                  : `/page/${x + 1}` // For users
                : `/admin/productlist/${x + 1}` // For admin
            }
          >
            <Pagination.Item active={x + 1 === Number(page)}>
              {x + 1}
              {/*  Display page number */}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
