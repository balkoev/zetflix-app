import React from 'react';
import { Pagination as PaginationMUI, Stack } from '@mui/material';

function Pagination({ currentPage, setPage, totalPages }) {
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <Stack spacing={2} alignItems="center">
      <PaginationMUI count={totalPages} variant="outlined" shape="rounded" size="large" page={currentPage} onChange={handleChange} />
    </Stack>
  );
}

export default Pagination;
