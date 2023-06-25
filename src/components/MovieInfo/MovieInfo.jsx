import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import useStyles from './styles';
import { MovieList } from '../index';
import { useGetActorsByFilmQuery, useGetFilmQuery,
  // useGetRecommendationsQuery,
  // useGetListQuery
} from '../../services/kinopoiskApi';
import { selectGenre } from '../../features/currentGenre';
import genreIcons from '../../assets/genres';

function MovieInfo() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  const { data, error, isFetching } = useGetFilmQuery(id);
  const actorsByFilm = useGetActorsByFilmQuery(id);

  // const { data: favoriteMovies } = useGetListQuery({ listName: 'favorite/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  // const { data: watchlistMovies } = useGetListQuery({ listName: 'watchlist/movies', accountId: user.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  // const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  console.log('data', data);
  console.log('actorsByFilm', actorsByFilm);
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  // useEffect(() => {
  //   setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  // }, [favoriteMovies, data]);
  // useEffect(() => {
  //   setIsMovieWatchlisted(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  // }, [watchlistMovies, data]);

  // const addToFavorites = async () => {
  //   await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
  //     media_type: 'movie',
  //     media_id: id,
  //     favorite: !isMovieFavorited,
  //   });

  //   setIsMovieFavorited((prev) => !prev);
  // };

  // const addToWatchList = async () => {
  //   await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
  //     media_type: 'movie',
  //     media_id: id,
  //     watchlist: !isMovieWatchlisted,
  //   });

  //   setIsMovieWatchlisted((prev) => !prev);
  // };

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
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} align="center">
        <img
          src={data.posterUrlPreview}
          className={classes.poster}
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
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.ratingKinopoisk / 2} />
            <Typography gutterBottom variant="subtitle1" style={{ marginLeft: '10px' }}>
              {data?.ratingKinopoisk} / 10
            </Typography>
          </Box>
          <Typography gutterBottom variant="h6" align="center">{data?.filmLength}min</Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map(({ genre }) => (
            <div className={classes.links} key={genre}>
              <img src={genreIcons[genre.toLowerCase()]} className={classes.genreImage} height={30} />
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
                className={classes.castImage}
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
          <div className={classes.buttonContainer}>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.webUrl} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdbId}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.buttonContainer}>
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
            </Grid>
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
