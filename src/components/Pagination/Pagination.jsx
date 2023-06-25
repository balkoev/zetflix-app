import React from 'react';
import { Typography, Button } from '@mui/material';

// import useStyles from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
  // const classes = useStyles();

  const handlePrev = () => {
    if (currentPage !== 1) { setPage((prevPage) => prevPage - 1); }
  };
  const handleNext = () => {
    if (currentPage !== totalPages) { setPage((prevPage) => prevPage + 1); }
  };

  if (totalPages === 0) return null;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      {currentPage > 1 && (
      <Button
        onClick={handlePrev}
        variant="contained"
        sx={{
          margin: '30px 2px',
        }}
        color="primary"
        type="button"
      >Назад
      </Button>
      )}
      <Typography
        variant="h4"
        sx={{
          margin: '0 20px !important',
          color: '#000000',
        }}
      >{currentPage}
      </Typography>
      {currentPage !== totalPages && (
      <Button
        onClick={handleNext}
        variant="contained"
        sx={{
          margin: '30px 2px',
        }}
        color="primary"
        type="button"
      >Вперед
      </Button>
      )}
    </div>
  );
}

export default Pagination;
