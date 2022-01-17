import { forwardRef, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import './SearchResultItem.css';
import { FavoriteAction } from '../index';
import { getVoteBadgeColor } from '../../utils';
import isEqual from 'lodash/isEqual';

function SearchResultItem(props) {
  const { movie, onFavoriteStatusChange } = props;
  const CustomLinkItem = useMemo(
    () =>
      forwardRef((listItemProps, ref) => (
        <Link
          ref={ref}
          {...listItemProps}
          to={`/movies/${movie.id}`}
          role={undefined}
        />
      )),
    [movie.id],
  );

  return (
    <ListItem
      secondaryAction={
        <FavoriteAction
          movie={movie}
          isFavorite={movie.isFavorite}
          onFavoriteStatusChange={() => onFavoriteStatusChange(movie.id)}
        />
      }
      disablePadding
    >
      <ListItemButton className="SearchResultItem" component={CustomLinkItem}>
        <ListItemAvatar>
          {movie.poster_path && (
            <img
              height="53px"
              width="40px"
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.original_title}
            />
          )}
        </ListItemAvatar>
        <ListItemText className="SearchResultItem-title" disableTypography>
          <Tooltip title={movie.title}>
            <Typography
              className="SearchResultItem-title-primary"
              component="span"
              noWrap
            >
              {movie.title}
            </Typography>
          </Tooltip>
          <span className="SearchResultItem-title-secondary">
            <Typography
              className="SearchResultItem-title-secondary-vote-badge"
              component="span"
              variant="body2"
              align="center"
              bgcolor={getVoteBadgeColor(movie.vote_average)}
              noWrap
            >
              {movie.vote_average}
            </Typography>
            {!!movie.genres.length && (
              <Typography
                className="SearchResultItem-title-secondary-genre"
                component="span"
                variant="body2"
                color="secondary"
              >
                {movie.genres[0].name}
              </Typography>
            )}
          </span>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}

const SearchResultItemMemo = memo(SearchResultItem, (pr, cr) =>
  isEqual(pr.movie, cr.movie),
);
export default SearchResultItemMemo;
