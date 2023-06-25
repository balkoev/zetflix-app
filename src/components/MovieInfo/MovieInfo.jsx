import React from 'react';
import { Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Language } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useGetActorsByFilmQuery, useGetFilmQuery,
} from '../../services/kinopoiskApi';
import genreIcons from '../../assets/genres';

function MovieInfo() {
  const { id } = useParams();

  const { data, error, isFetching } = useGetFilmQuery(id);
  const actorsByFilm = useGetActorsByFilmQuery(id);

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
          sx={{
            borderRadius: '20px',
            boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
            width: '80%',
          }}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.nameRu ? data?.nameRu : data?.nameOriginal} ({data.year})
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
              {data?.ratingKinopoisk} / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">{data?.filmLength}min</Typography>
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
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textDecoration: 'none',
              }}
              key={genre}
            >
              <img
                src={genreIcons[genre.toLowerCase()]}
                sx={{
                  marginRight: '10px',
                }}
                height={30}
              />
              <Typography color="textPrimary" variant="subtitle1">{genre}</Typography>
            </div>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '20px' }}>Overview</Typography>
        <Typography style={{ marginBottom: '2rem' }}>{data?.description}</Typography>
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {actorsByFilm && actorsByFilm.data?.map((actor, i) => (

            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${actor.staffId}`} style={{ textDecoration: 'none' }}>
              <img
                sx={{
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
          <div sx={{
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
                {/* <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button> */}
              </ButtonGroup>
            </Grid>
            {/* <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button onClick={(() => {})} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button onClick={() => {}} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  Watchlist
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography variant="subtitle2" component={Link} to="/" color="inherit" sx={{ textDecoration: 'none' }}>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid> */}
          </div>
        </Grid>
      </Grid>
      <Box>
        <h1>Смотреть онлайн</h1>
        <div data-kinopoisk={id} id="kinobd" />
        <script src="https://kinobd.ru/js/player_.js" />
      </Box>
      {/* <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found.</Box>}
      </Box> */}
      {/* <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className={classes.video}
            frameBorder="0"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal> */}
    </Grid>
  );
}

export default MovieInfo;
