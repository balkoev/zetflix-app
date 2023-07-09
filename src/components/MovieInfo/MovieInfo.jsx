import React, { useRef } from 'react';
import {
  Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating,
} from '@mui/material';
import { Movie as MovieIcon, Language } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useGetActorsByFilmQuery, useGetFilmQuery } from '../../services/kinopoiskApi';
import genreIcons from '../../assets/genres';
import useIsIFrameLoaded from '../../hooks/useIsIFrameLoaded';

function MovieInfo() {
  const { id } = useParams();

  const { data, error, isFetching } = useGetFilmQuery(id);
  const actorsByFilm = useGetActorsByFilmQuery(id);
  const iframeRef = useRef(null);

  const isReady = useIsIFrameLoaded(iframeRef);

  if (isFetching) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Link to="/">Something went wrong - Go back.</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        margin: '10px 0 !important',
      }}
    >
      <Grid item sm={12} lg={4} align="center">
        <img
          src={data.posterUrlPreview}
          style={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
            width: '80%',
          }}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.nameRu ? data?.nameRu : data?.nameOriginal}
          {' '}
          (
          {data.year}
          )
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            margin: '10px 0 !important',
          }}
        >
          <Box display="flex" align="center">
            <Rating readOnly value={data.ratingKinopoisk / 2} />
            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
              {data?.ratingKinopoisk}
              {' '}
              / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">
            {data?.filmLength}
            min
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            margin: '10px 0 !imaportant',
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'wrap',
          }}
        >
          {data?.genres?.map(({ genre }) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              key={genre}
            >
              <img
                src={genreIcons[genre.toLowerCase()]}
                style={{
                  marginRight: '10px',
                }}
                height={30}
                alt=""
              />
              <Typography color="textPrimary" variant="subtitle1">{genre}</Typography>
            </div>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.description}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {actorsByFilm && actorsByFilm.data?.map((actor) => (

            <Grid key={actor.staffId} item xs={4} md={2} component={Link} to={`/actors/${actor.staffId}`} style={{ textDecoration: 'none' }}>
              <img
                style={{
                  width: '100%',
                  maxWidth: '7em',
                  height: '8em',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
                src={actor.posterUrl}
                alt={actor.nameRu}
              />
              <Typography color="textPrimary" align="center">{actor.nameRu}</Typography>
              <Typography color="textSecondary" align="center">
                {actor.professionText}
              </Typography>
            </Grid>

          )).slice(0, 6)}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
          >
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.webUrl} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdbId}`} endIcon={<MovieIcon />}>IMDB</Button>
                {/* <Button onClick={() => setOpen(true)} href="#"
                endIcon={<Theaters />}>Trailer</Button> */}
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <div style={{
        display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center',
      }}
      >
        <h1>Смотреть онлайн</h1>
        <p>
          Is ready:
          {' '}
          {String(isReady)}
        </p>
        <div ref={iframeRef} style={{ width: '600px' }} id="yohoho" data-kinopoisk={id} />
      </div>
    </Grid>
  );
}

export default MovieInfo;
