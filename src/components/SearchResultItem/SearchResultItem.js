import { forwardRef, memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material';
import { FavoriteAction } from '../index';
import isEqual from 'lodash/isEqual';
import { SearchResultItemInfo } from './SearchResultItem.styled';
import { changeStatus } from '../../store';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const SearchResultItem = (props) => {
  const { movie } = props;
  const dispatch = useDispatch();
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
  const ListItemSecondaryAction = (
    <FavoriteAction
      isFavorite={movie.isFavorite}
      onClick={() => dispatch(changeStatus(movie.id))}
    />
  );

  return (
    <ListItem secondaryAction={ListItemSecondaryAction} disablePadding>
      <SearchResultItemInfo component={CustomLinkItem} movie={movie}>
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
        <ListItemText className="SearchResultItem-info" disableTypography>
          <Tooltip title={movie.title}>
            <Typography
              className="SearchResultItem-infoPrimary"
              component="span"
              noWrap
            >
              {movie.title}
            </Typography>
          </Tooltip>
          <span className="SearchResultItem-infoSecondary">
            <Typography
              className="SearchResultItem-infoSecondaryVoteBadge"
              component="span"
              variant="body2"
              align="center"
              noWrap
            >
              {movie.vote_average}
            </Typography>
            {!!movie.genres.length && (
              <Typography
                className="SearchResultItem-infoSecondaryGenre"
                component="span"
                variant="body2"
              >
                {movie.genres[0].name}
              </Typography>
            )}
          </span>
        </ListItemText>
      </SearchResultItemInfo>
    </ListItem>
  );
};

SearchResultItem.propTypes = {
  movie: PropTypes.object.isRequired,
};

const SearchResultItemMemo = memo(SearchResultItem, (pr, cr) =>
  isEqual(pr.movie, cr.movie),
);
export default SearchResultItemMemo;
