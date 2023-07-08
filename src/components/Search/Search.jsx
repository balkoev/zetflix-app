// import React, { useState } from 'react';
// import { TextField, InputAdornment } from '@mui/material';
// import { Search as SearchIcon } from '@mui/icons-material';
// import { useDispatch } from 'react-redux';
// import { searchMovie } from '../../features/currentGenre';

// function Search() {
//   const [query, setQuery] = useState('');
//   const dispatch = useDispatch();

//   // const handleKeyPress = (e) => {
//   //   if (e.key === 'Enter') {
//   //     dispatch(searchMovie(query));
//   //   }
//   // };

//   return (
//     <div>
//       <TextField
//         // onKeyPress={handleKeyPress}
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         variant="standard"
//         InputProps={{

//           startAdornment: (
//             <InputAdornment position="start">
//               <SearchIcon />
//             </InputAdornment>
//           ),
//         }}
//       />
//     </div>
//   );
// }

// export default Search;
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    margin: '0 auto',
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
      '&:focus': {
        width: '34ch',
      },
    },
  },
}));

function Search() {
  return (
    <SearchWrapper>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Поиск…"
        inputProps={{ 'aria-label': 'search' }}
      />
    </SearchWrapper>
  );
}

export default Search;
