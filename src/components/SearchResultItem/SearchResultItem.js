import { forwardRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Tooltip,
} from '@mui/material';
import './SearchResultItem.css';
import { FavoriteAction } from '../index';

export default function SearchResultItem(props) {
  const CustomLinkItem = useMemo(
    () =>
      forwardRef((listItemProps, ref) => (
        <Link
          ref={ref}
          {...listItemProps}
          to={`/movies/${props.movie.id}`}
          role={undefined}
        />
      )),
    [props.movie.id],
  );

  return (
    <ListItem
      secondaryAction={
        <FavoriteAction
          movie={props.movie}
          isFavorite={props.movie.isFavorite}
          onFavoriteStatusChange={() =>
            props.onFavoriteStatusChange(props.movie.id)
          }
        />
      }
      disablePadding
    >
      <ListItemButton className="SearchResultItem" component={CustomLinkItem}>
        <ListItemAvatar>
          {props.movie.poster_path && (
            <img
              height="53px"
              width="40px"
              src={`https://image.tmdb.org/t/p/original${props.movie.poster_path}`}
              alt={props.movie.original_title}
            />
          )}
        </ListItemAvatar>
        <Tooltip title={props.movie.title}>
          <ListItemText
            className="SearchResultItem-title"
            primary={props.movie.title}
            primaryTypographyProps={{ noWrap: true }}
          />
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
}
